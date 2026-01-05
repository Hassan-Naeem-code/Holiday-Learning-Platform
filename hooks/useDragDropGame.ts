/**
 * Drag and Drop Game Hook
 * Centralized drag-drop logic for all drag-drop based games
 * Eliminates duplicate drag handlers across 7 game files
 */

import { useState, useCallback } from 'react'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { celebrateCorrectAnswer } from '@/utils/celebrationUtils'
import { GAME_XP_REWARDS } from '@/utils/gameConstants'
import type { DraggableItem } from '@/types'

// ==================== HOOK INTERFACE ====================

export interface UseDragDropGameOptions {
  /** Available items to drag */
  availableItems: DraggableItem[]

  /** Correct solution (array of item IDs in order) */
  correctSolution: string[]

  /** Callback when answer is correct */
  onCorrect?: (points: number) => void

  /** Callback when answer is incorrect */
  onIncorrect?: () => void

  /** Callback when item is placed */
  onItemPlaced?: (itemId: string) => void

  /** Callback when item is removed */
  onItemRemoved?: (itemId: string) => void

  /** Points for correct answer */
  correctPoints?: number

  /** Whether to check order (true) or just presence (false) */
  checkOrder?: boolean
}

export interface UseDragDropGameReturn {
  // State
  solution: string[]
  activeId: string | null
  isValidating: boolean

  // Actions
  handleDragStart: (event: DragStartEvent) => void
  handleDragEnd: (event: DragEndEvent) => void
  removeItem: (index: number) => void
  reorderItems: (oldIndex: number, newIndex: number) => void
  checkSolution: () => { isCorrect: boolean; message: string }
  resetSolution: () => void
  setSolution: (newSolution: string[]) => void

  // Computed
  isSolutionEmpty: boolean
  solutionLength: number
  remainingItems: DraggableItem[]
}

// ==================== HOOK IMPLEMENTATION ====================

/**
 * Custom hook for drag-and-drop game logic
 * Handles drag events, solution management, and validation
 */
export function useDragDropGame(options: UseDragDropGameOptions): UseDragDropGameReturn {
  const {
    availableItems,
    correctSolution,
    onCorrect,
    onIncorrect,
    onItemPlaced,
    onItemRemoved,
    correctPoints = GAME_XP_REWARDS.CORRECT_ANSWER,
    checkOrder = true,
  } = options

  // State
  const [solution, setSolutionState] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  // ==================== DRAG HANDLERS ====================

  /**
   * Handle drag start event
   */
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])

  /**
   * Handle drag end event
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      setActiveId(null)

      if (!over) return

      // If dragging from available items to solution area
      if (over.id === 'solution-area' && active.id) {
        const itemId = active.id as string

        // Check if item is already in solution
        if (!solution.includes(itemId)) {
          setSolutionState((prev) => [...prev, itemId])
          onItemPlaced?.(itemId)
        }
      }

      // If reordering within solution
      if (over.id !== 'solution-area' && solution.includes(active.id as string)) {
        const oldIndex = solution.indexOf(active.id as string)
        const newIndex = solution.indexOf(over.id as string)

        if (oldIndex !== -1 && newIndex !== -1) {
          setSolutionState((prev) => arrayMove(prev, oldIndex, newIndex))
        }
      }
    },
    [solution, onItemPlaced]
  )

  /**
   * Remove item from solution by index
   */
  const removeItem = useCallback(
    (index: number) => {
      const removedItem = solution[index]
      setSolutionState((prev) => prev.filter((_, i) => i !== index))
      onItemRemoved?.(removedItem)
    },
    [solution, onItemRemoved]
  )

  /**
   * Reorder items in solution
   */
  const reorderItems = useCallback(
    (oldIndex: number, newIndex: number) => {
      setSolutionState((prev) => arrayMove(prev, oldIndex, newIndex))
    },
    []
  )

  /**
   * Check if current solution is correct
   */
  const checkSolution = useCallback((): { isCorrect: boolean; message: string } => {
    setIsValidating(true)

    let isCorrect = false
    let message = ''

    if (solution.length === 0) {
      message = 'Please add items to your solution! 📝'
      setIsValidating(false)
      return { isCorrect: false, message }
    }

    if (checkOrder) {
      // Check exact order
      isCorrect =
        solution.length === correctSolution.length &&
        solution.every((item, index) => item === correctSolution[index])

      if (isCorrect) {
        message = 'Perfect! Correct order! 🎉'
        celebrateCorrectAnswer()
        onCorrect?.(correctPoints)
      } else {
        message = 'Not quite right. Check the order! 🤔'
        onIncorrect?.()
      }
    } else {
      // Check presence only (not order)
      isCorrect =
        solution.length === correctSolution.length &&
        solution.every((item) => correctSolution.includes(item))

      if (isCorrect) {
        message = 'Correct! All items included! 🎉'
        celebrateCorrectAnswer()
        onCorrect?.(correctPoints)
      } else {
        message = 'Missing or extra items! 🤔'
        onIncorrect?.()
      }
    }

    setTimeout(() => setIsValidating(false), 500)

    return { isCorrect, message }
  }, [solution, correctSolution, checkOrder, correctPoints, onCorrect, onIncorrect])

  /**
   * Reset solution to empty
   */
  const resetSolution = useCallback(() => {
    setSolutionState([])
    setActiveId(null)
    setIsValidating(false)
  }, [])

  /**
   * Manually set solution (for hints or loading saved state)
   */
  const setSolution = useCallback((newSolution: string[]) => {
    setSolutionState(newSolution)
  }, [])

  // ==================== COMPUTED VALUES ====================

  const isSolutionEmpty = solution.length === 0
  const solutionLength = solution.length

  /**
   * Get items that haven't been placed in solution yet
   */
  const remainingItems = availableItems.filter((item) => !solution.includes(item.id))

  // ==================== RETURN ====================

  return {
    // State
    solution,
    activeId,
    isValidating,

    // Actions
    handleDragStart,
    handleDragEnd,
    removeItem,
    reorderItems,
    checkSolution,
    resetSolution,
    setSolution,

    // Computed
    isSolutionEmpty,
    solutionLength,
    remainingItems,
  }
}

// ==================== VALIDATION UTILITIES ====================

/**
 * Validate solution with partial credit
 * Returns score based on how many items are correct
 */
export function validateWithPartialCredit(
  userSolution: string[],
  correctSolution: string[],
  checkOrder: boolean = true
): { score: number; totalPossible: number; percentage: number } {
  let score = 0
  const totalPossible = correctSolution.length

  if (checkOrder) {
    // Award points for each correct position
    userSolution.forEach((item, index) => {
      if (index < correctSolution.length && item === correctSolution[index]) {
        score++
      }
    })
  } else {
    // Award points for each correct item (regardless of position)
    userSolution.forEach((item) => {
      if (correctSolution.includes(item)) {
        score++
      }
    })
  }

  const percentage = totalPossible > 0 ? (score / totalPossible) * 100 : 0

  return { score, totalPossible, percentage }
}

/**
 * Get hint for next item in solution
 */
export function getNextHint(
  currentSolution: string[],
  correctSolution: string[],
  allItems: DraggableItem[]
): DraggableItem | null {
  if (currentSolution.length >= correctSolution.length) {
    return null // Solution is complete
  }

  const nextItemId = correctSolution[currentSolution.length]
  return allItems.find((item) => item.id === nextItemId) || null
}

/**
 * Check if solution has any errors
 */
export function getSolutionErrors(
  userSolution: string[],
  correctSolution: string[],
  checkOrder: boolean = true
): number[] {
  const errorIndices: number[] = []

  userSolution.forEach((item, index) => {
    if (checkOrder) {
      // Check if item at this position is wrong
      if (index >= correctSolution.length || item !== correctSolution[index]) {
        errorIndices.push(index)
      }
    } else {
      // Check if item exists in correct solution
      if (!correctSolution.includes(item)) {
        errorIndices.push(index)
      }
    }
  })

  return errorIndices
}
