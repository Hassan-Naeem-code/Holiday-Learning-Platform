/**
 * Game State Management Hook
 * Centralized state management for all game types
 * Eliminates duplicate state logic across 7 game files
 */

import { useState, useCallback } from 'react'
import { DEFAULT_LIVES, DEFAULT_HINTS, GAME_TIMINGS, getComboBonus } from '@/utils/gameConstants'
import type { Difficulty, GameState } from '@/types'

// ==================== HOOK INTERFACE ====================

export interface UseGameStateOptions {
  /** Initial lives (default: 3) */
  initialLives?: number

  /** Initial hints (default: 2) */
  initialHints?: number

  /** Game difficulty */
  difficulty: Difficulty

  /** Callback when game is won */
  onGameWon?: () => void

  /** Callback when game is lost */
  onGameLost?: () => void

  /** Callback when score changes */
  onScoreChange?: (newScore: number) => void
}

export interface UseGameStateReturn {
  // State
  score: number
  lives: number
  hints: number
  combo: number
  bestCombo: number
  started: boolean
  gameWon: boolean
  gameLost: boolean
  feedback: string

  // Actions
  startGame: () => void
  resetGame: () => void
  addScore: (points: number) => void
  loseLife: () => void
  useHint: () => boolean
  incrementCombo: () => number
  resetCombo: () => void
  setFeedback: (message: string, duration?: number) => void
  setGameWon: () => void

  // Computed
  hasLives: boolean
  hasHints: boolean
  canContinue: boolean
}

// ==================== HOOK IMPLEMENTATION ====================

/**
 * Custom hook for managing game state
 * Handles lives, hints, scoring, combo system, and feedback
 */
export function useGameState(options: UseGameStateOptions): UseGameStateReturn {
  const {
    initialLives = DEFAULT_LIVES,
    initialHints = DEFAULT_HINTS,
    difficulty,
    onGameWon,
    onGameLost,
    onScoreChange,
  } = options

  // Core game state
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(initialLives)
  const [hints, setHints] = useState(initialHints)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [started, setStarted] = useState(false)
  const [gameWon, setGameWonState] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [feedback, setFeedbackState] = useState('')

  // ==================== GAME ACTIONS ====================

  /**
   * Start the game
   */
  const startGame = useCallback(() => {
    setStarted(true)
    setGameWonState(false)
    setGameLost(false)
    setFeedbackState('')
  }, [])

  /**
   * Reset game to initial state
   */
  const resetGame = useCallback(() => {
    setScore(0)
    setLives(initialLives)
    setHints(initialHints)
    setCombo(0)
    setBestCombo(0)
    setStarted(false)
    setGameWonState(false)
    setGameLost(false)
    setFeedbackState('')
  }, [initialLives, initialHints])

  /**
   * Add points to score
   */
  const addScore = useCallback(
    (points: number) => {
      setScore((prev) => {
        const newScore = prev + points
        onScoreChange?.(newScore)
        return newScore
      })
    },
    [onScoreChange]
  )

  /**
   * Lose a life
   */
  const loseLife = useCallback(() => {
    setLives((prev) => {
      const newLives = Math.max(0, prev - 1)

      // Check if game is lost
      if (newLives === 0) {
        setGameLost(true)
        setStarted(false)
        onGameLost?.()
      }

      return newLives
    })
  }, [onGameLost])

  /**
   * Use a hint
   * @returns true if hint was used, false if no hints available
   */
  const useHint = useCallback((): boolean => {
    if (hints <= 0) {
      setFeedbackState('No hints remaining! 💡')
      setTimeout(() => setFeedbackState(''), GAME_TIMINGS.FEEDBACK_DURATION)
      return false
    }

    setHints((prev) => Math.max(0, prev - 1))
    return true
  }, [hints])

  /**
   * Increment combo and add bonus points
   * @returns new combo level
   */
  const incrementCombo = useCallback((): number => {
    const newCombo = combo + 1
    setCombo(newCombo)

    // Update best combo
    if (newCombo > bestCombo) {
      setBestCombo(newCombo)
    }

    // Add combo bonus
    const bonusPoints = getComboBonus(newCombo)
    if (bonusPoints > 0) {
      addScore(bonusPoints)
      setFeedbackState(`🔥 Combo x${newCombo}! +${bonusPoints} bonus points!`)
      setTimeout(() => setFeedbackState(''), GAME_TIMINGS.FEEDBACK_DURATION)
    }

    return newCombo
  }, [combo, bestCombo, addScore])

  /**
   * Reset combo to zero
   */
  const resetCombo = useCallback(() => {
    setCombo(0)
  }, [])

  /**
   * Set feedback message with auto-clear
   */
  const setFeedback = useCallback((message: string, duration: number = GAME_TIMINGS.FEEDBACK_DURATION) => {
    setFeedbackState(message)
    if (duration > 0) {
      setTimeout(() => setFeedbackState(''), duration)
    }
  }, [])

  /**
   * Mark game as won
   */
  const setGameWon = useCallback(() => {
    setGameWonState(true)
    setStarted(false)
    onGameWon?.()
  }, [onGameWon])

  // ==================== COMPUTED VALUES ====================

  const hasLives = lives > 0
  const hasHints = hints > 0
  const canContinue = hasLives && started && !gameWon && !gameLost

  // ==================== RETURN ====================

  return {
    // State
    score,
    lives,
    hints,
    combo,
    bestCombo,
    started,
    gameWon,
    gameLost,
    feedback,

    // Actions
    startGame,
    resetGame,
    addScore,
    loseLife,
    useHint,
    incrementCombo,
    resetCombo,
    setFeedback,
    setGameWon,

    // Computed
    hasLives,
    hasHints,
    canContinue,
  }
}

// ==================== ADDITIONAL HOOKS ====================

/**
 * Hook for managing feedback messages
 * Simpler version if you only need feedback
 */
export function useFeedback() {
  const [feedback, setFeedbackState] = useState('')

  const showFeedback = useCallback((message: string, duration: number = GAME_TIMINGS.FEEDBACK_DURATION) => {
    setFeedbackState(message)
    if (duration > 0) {
      setTimeout(() => setFeedbackState(''), duration)
    }
  }, [])

  const clearFeedback = useCallback(() => {
    setFeedbackState('')
  }, [])

  return {
    feedback,
    showFeedback,
    clearFeedback,
  }
}

/**
 * Hook for managing game timer
 */
export function useGameTimer(initialTime: number = 60) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  const startTimer = useCallback(() => {
    setIsRunning(true)
    setTimeRemaining(initialTime)
  }, [initialTime])

  const stopTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setTimeRemaining(initialTime)
    setIsRunning(false)
  }, [initialTime])

  // Timer logic would use useEffect here
  // Simplified for now

  return {
    timeRemaining,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  }
}
