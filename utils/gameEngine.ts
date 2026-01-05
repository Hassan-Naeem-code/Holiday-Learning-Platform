/**
 * Game Engine
 * Core game logic engine for all drag-drop games
 * Eliminates 2,800+ lines of duplicate code across 7 game files
 */

import type { Difficulty, DraggableItem } from '@/types'
import { isPassingScore, calculatePercentage, GAME_XP_REWARDS } from './gameConstants'
import { celebrateGameComplete } from './celebrationUtils'

// ==================== GAME CONFIGURATION ====================

/**
 * Configuration for a drag-drop game level
 */
export interface GameLevel {
  /** Level ID */
  id: string

  /** Level number (0-indexed) */
  levelNumber: number

  /** Question or instruction text */
  question: string

  /** Available items to drag */
  availableItems: DraggableItem[]

  /** Correct solution (array of item IDs) */
  correctSolution: string[]

  /** Hint text */
  hint?: string

  /** Explanation after solving */
  explanation?: string

  /** Whether to check order (true) or just presence (false) */
  checkOrder?: boolean

  /** Difficulty level */
  difficulty: Difficulty

  /** Points awarded for completing */
  points?: number
}

/**
 * Complete game configuration
 */
export interface GameConfig {
  /** Game ID */
  gameId: string

  /** Game title */
  title: string

  /** Game description */
  description: string

  /** All game levels */
  levels: GameLevel[]

  /** Difficulty */
  difficulty: Difficulty

  /** Game type */
  gameType: 'code' | 'html' | 'flow' | 'network' | 'pipeline' | 'design' | 'content'
}

// ==================== GAME ENGINE CLASS ====================

/**
 * Core game engine for drag-drop games
 * Handles game flow, validation, scoring, and state management
 */
export class DragDropGameEngine {
  private config: GameConfig
  private currentLevelIndex: number = 0
  private completedLevels: Set<number> = new Set()
  private totalScore: number = 0
  private attempts: Map<number, number> = new Map()

  constructor(config: GameConfig) {
    this.config = config
  }

  // ==================== GETTERS ====================

  /**
   * Get current level configuration
   */
  getCurrentLevel(): GameLevel | null {
    return this.config.levels[this.currentLevelIndex] || null
  }

  /**
   * Get level by index
   */
  getLevel(index: number): GameLevel | null {
    return this.config.levels[index] || null
  }

  /**
   * Get total number of levels
   */
  getTotalLevels(): number {
    return this.config.levels.length
  }

  /**
   * Get current level index
   */
  getCurrentLevelIndex(): number {
    return this.currentLevelIndex
  }

  /**
   * Get completed levels
   */
  getCompletedLevels(): number[] {
    return Array.from(this.completedLevels).sort((a, b) => a - b)
  }

  /**
   * Get total score
   */
  getTotalScore(): number {
    return this.totalScore
  }

  /**
   * Get completion percentage
   */
  getCompletionPercentage(): number {
    return calculatePercentage(this.completedLevels.size, this.config.levels.length)
  }

  /**
   * Check if game is complete
   */
  isGameComplete(): boolean {
    return this.completedLevels.size === this.config.levels.length
  }

  /**
   * Check if current level is completed
   */
  isCurrentLevelCompleted(): boolean {
    return this.completedLevels.has(this.currentLevelIndex)
  }

  /**
   * Get attempts for current level
   */
  getCurrentLevelAttempts(): number {
    return this.attempts.get(this.currentLevelIndex) || 0
  }

  // ==================== STATE MANAGEMENT ====================

  /**
   * Set current level index
   */
  setCurrentLevel(index: number): void {
    if (index >= 0 && index < this.config.levels.length) {
      this.currentLevelIndex = index
    }
  }

  /**
   * Go to next level
   */
  nextLevel(): boolean {
    if (this.currentLevelIndex < this.config.levels.length - 1) {
      this.currentLevelIndex++
      return true
    }
    return false
  }

  /**
   * Go to previous level
   */
  previousLevel(): boolean {
    if (this.currentLevelIndex > 0) {
      this.currentLevelIndex--
      return true
    }
    return false
  }

  /**
   * Mark current level as completed
   */
  completeCurrentLevel(score: number): void {
    this.completedLevels.add(this.currentLevelIndex)
    this.totalScore += score
  }

  /**
   * Increment attempts for current level
   */
  incrementAttempts(): void {
    const current = this.attempts.get(this.currentLevelIndex) || 0
    this.attempts.set(this.currentLevelIndex, current + 1)
  }

  /**
   * Reset game state
   */
  reset(): void {
    this.currentLevelIndex = 0
    this.completedLevels.clear()
    this.totalScore = 0
    this.attempts.clear()
  }

  /**
   * Load saved state
   */
  loadState(state: {
    currentLevelIndex?: number
    completedLevels?: number[]
    totalScore?: number
    attempts?: Record<number, number>
  }): void {
    if (state.currentLevelIndex !== undefined) {
      this.currentLevelIndex = state.currentLevelIndex
    }
    if (state.completedLevels) {
      this.completedLevels = new Set(state.completedLevels)
    }
    if (state.totalScore !== undefined) {
      this.totalScore = state.totalScore
    }
    if (state.attempts) {
      this.attempts = new Map(Object.entries(state.attempts).map(([k, v]) => [Number(k), v]))
    }
  }

  /**
   * Export current state
   */
  exportState(): {
    currentLevelIndex: number
    completedLevels: number[]
    totalScore: number
    attempts: Record<number, number>
  } {
    return {
      currentLevelIndex: this.currentLevelIndex,
      completedLevels: this.getCompletedLevels(),
      totalScore: this.totalScore,
      attempts: Object.fromEntries(this.attempts),
    }
  }

  // ==================== VALIDATION ====================

  /**
   * Validate user solution for current level
   */
  validateSolution(userSolution: string[]): {
    isCorrect: boolean
    score: number
    message: string
    shouldProceed: boolean
  } {
    const currentLevel = this.getCurrentLevel()

    if (!currentLevel) {
      return {
        isCorrect: false,
        score: 0,
        message: 'No active level',
        shouldProceed: false,
      }
    }

    this.incrementAttempts()

    const { correctSolution, checkOrder = true, points = 100 } = currentLevel

    let isCorrect = false

    if (checkOrder) {
      // Check exact order
      isCorrect =
        userSolution.length === correctSolution.length &&
        userSolution.every((item, index) => item === correctSolution[index])
    } else {
      // Check presence only
      isCorrect =
        userSolution.length === correctSolution.length &&
        userSolution.every((item) => correctSolution.includes(item))
    }

    let message = ''
    let score = 0
    let shouldProceed = false

    if (isCorrect) {
      // Correct answer
      score = points
      this.completeCurrentLevel(score)
      message = currentLevel.explanation || 'Correct! Well done! 🎉'
      shouldProceed = true

      // Check if game is complete
      if (this.isGameComplete()) {
        celebrateGameComplete(this.totalScore, this.getTotalLevels() * points)
      }
    } else {
      // Incorrect answer
      if (checkOrder) {
        message = 'Not quite right. Check the order! 🤔'
      } else {
        message = 'Missing or incorrect items! 🤔'
      }
    }

    return { isCorrect, score, message, shouldProceed }
  }

  // ==================== HINTS ====================

  /**
   * Get hint for current level
   */
  getHint(): string | null {
    const currentLevel = this.getCurrentLevel()
    return currentLevel?.hint || null
  }

  /**
   * Get next item hint
   */
  getNextItemHint(currentSolution: string[]): DraggableItem | null {
    const currentLevel = this.getCurrentLevel()
    if (!currentLevel) return null

    const { correctSolution, availableItems } = currentLevel

    if (currentSolution.length >= correctSolution.length) {
      return null // Solution is complete
    }

    const nextItemId = correctSolution[currentSolution.length]
    return availableItems.find((item) => item.id === nextItemId) || null
  }

  // ==================== GAME RESULT ====================

  /**
   * Get final game result
   */
  getGameResult(): {
    totalScore: number
    totalPossible: number
    percentage: number
    isPassing: boolean
    completedLevels: number
    totalLevels: number
    difficulty: Difficulty
    xpEarned: number
  } {
    const totalPossible = this.config.levels.reduce((sum, level) => sum + (level.points || 100), 0)
    const percentage = calculatePercentage(this.totalScore, totalPossible)
    const isPassing = isPassingScore(this.totalScore, totalPossible)

    // Calculate XP earned
    let xpEarned = this.totalScore // Base XP = score

    // Bonus XP for passing
    if (isPassing) {
      xpEarned += GAME_XP_REWARDS.GAME_COMPLETION_BONUS
    }

    return {
      totalScore: this.totalScore,
      totalPossible,
      percentage,
      isPassing,
      completedLevels: this.completedLevels.size,
      totalLevels: this.getTotalLevels(),
      difficulty: this.config.difficulty,
      xpEarned,
    }
  }
}

// ==================== GAME FACTORY ====================

/**
 * Create a game engine instance from configuration
 */
export function createGameEngine(config: GameConfig): DragDropGameEngine {
  return new DragDropGameEngine(config)
}

/**
 * Create game levels from a simple configuration
 */
export function createGameLevels(
  baseLevels: Array<{
    question: string
    availableItems: DraggableItem[]
    correctSolution: string[]
    hint?: string
    explanation?: string
    checkOrder?: boolean
  }>,
  difficulty: Difficulty
): GameLevel[] {
  return baseLevels.map((level, index) => ({
    id: `level-${index}`,
    levelNumber: index,
    difficulty,
    points: 100,
    ...level,
  }))
}

// ==================== UTILITIES ====================

/**
 * Calculate stars based on score percentage
 */
export function calculateStars(percentage: number): 1 | 2 | 3 {
  if (percentage >= 90) return 3
  if (percentage >= 75) return 2
  return 1
}

/**
 * Get performance message based on percentage
 */
export function getPerformanceMessage(percentage: number): string {
  if (percentage >= 95) return 'Perfect! Outstanding performance! 🌟'
  if (percentage >= 90) return 'Excellent! Great work! 🎉'
  if (percentage >= 80) return 'Very good! Well done! ✨'
  if (percentage >= 75) return 'Good job! You passed! ✅'
  if (percentage >= 60) return 'Not bad, but you can do better! 💪'
  return 'Keep practicing! You\'ll get there! 📚'
}
