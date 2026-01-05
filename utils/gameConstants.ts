/**
 * Shared Game Constants
 * Centralized game configuration to eliminate duplication across components
 */

// ==================== GAME THRESHOLDS ====================

/**
 * Minimum percentage required to pass a game/sandbox (75%)
 * Used for certificate eligibility and completion status
 */
export const PASS_THRESHOLD = 0.75

/**
 * Minimum code similarity threshold for sandbox validation (70%)
 * Used to check if user's code is similar enough to the solution
 */
export const CODE_SIMILARITY_THRESHOLD = 0.7

// ==================== GAME MECHANICS ====================

/**
 * Default number of lives for games
 */
export const DEFAULT_LIVES = 3

/**
 * Default number of hints available in games
 */
export const DEFAULT_HINTS = 3

/**
 * Maximum number of hints a player can have
 */
export const MAX_HINTS = 5

/**
 * Maximum combo multiplier
 */
export const MAX_COMBO = 10

// ==================== XP REWARDS ====================

/**
 * XP rewards for various game actions
 */
export const GAME_XP_REWARDS = {
  /** XP for correct answer in quiz game */
  CORRECT_ANSWER: 20,

  /** Bonus XP for completing game with 75%+ score */
  GAME_COMPLETION_BONUS: 300,

  /** Bonus XP for completing sandbox with 75%+ accuracy */
  SANDBOX_COMPLETION_BONUS: 500,

  /** XP for executing code in sandbox */
  CODE_EXECUTION: 10,

  /** XP for completing a sandbox exercise */
  EXERCISE_COMPLETION: 20,

  /** XP for completing a tutorial lesson */
  TUTORIAL_LESSON: 50,

  /** Bonus XP for maintaining daily streak */
  STREAK_BONUS: 50,
} as const

// ==================== GAME TIMING ====================

/**
 * Duration in milliseconds for various game events
 */
export const GAME_TIMINGS = {
  /** How long feedback messages are displayed (2 seconds) */
  FEEDBACK_DURATION: 2000,

  /** Celebration animation duration (4 seconds) */
  CELEBRATION_DURATION: 4000,

  /** Short notification duration (1.5 seconds) */
  SHORT_NOTIFICATION: 1500,

  /** Confetti animation duration (3 seconds) */
  CONFETTI_DURATION: 3000,

  /** Hint cooldown period (1 second) */
  HINT_COOLDOWN: 1000,
} as const

// ==================== DIFFICULTY SETTINGS ====================

/**
 * Settings per difficulty level
 */
export const DIFFICULTY_SETTINGS = {
  easy: {
    lives: 3,
    hints: 3,
    timeLimit: null, // No time limit
    scoreMultiplier: 1,
  },
  medium: {
    lives: 3,
    hints: 2,
    timeLimit: null,
    scoreMultiplier: 1.5,
  },
  hard: {
    lives: 3,
    hints: 1,
    timeLimit: null,
    scoreMultiplier: 2,
  },
} as const

// ==================== COMBO SYSTEM ====================

/**
 * Combo bonus points based on combo level
 */
export const COMBO_BONUS_POINTS = {
  2: 5,
  3: 10,
  4: 20,
  5: 30,
  6: 40,
  7: 50,
  8: 75,
  9: 100,
  10: 150,
} as const

/**
 * Calculate combo bonus for a given combo level
 */
export function getComboBonus(combo: number): number {
  if (combo < 2) return 0
  if (combo >= 10) return COMBO_BONUS_POINTS[10]
  return COMBO_BONUS_POINTS[combo as keyof typeof COMBO_BONUS_POINTS] || 0
}

// ==================== SCORE CALCULATIONS ====================

/**
 * Calculate if a score passes the threshold
 */
export function isPassingScore(score: number, total: number): boolean {
  if (total === 0) return false
  return (score / total) >= PASS_THRESHOLD
}

/**
 * Calculate percentage score
 */
export function calculatePercentage(score: number, total: number): number {
  if (total === 0) return 0
  return Math.round((score / total) * 100)
}

/**
 * Calculate final score with difficulty multiplier
 */
export function calculateFinalScore(
  baseScore: number,
  difficulty: 'easy' | 'medium' | 'hard'
): number {
  const multiplier = DIFFICULTY_SETTINGS[difficulty].scoreMultiplier
  return Math.round(baseScore * multiplier)
}

// ==================== STORAGE KEYS ====================

/**
 * LocalStorage keys for game state persistence
 */
export const STORAGE_KEYS = {
  /** User session code */
  USER_CODE: 'codelikebasics_user_code',

  /** Sandbox code drafts */
  SANDBOX_DRAFT: 'sandbox_draft',

  /** Game progress cache */
  GAME_PROGRESS: 'game_progress_cache',

  /** Sound preferences */
  SOUND_ENABLED: 'sound_enabled',

  /** Last active timestamp */
  LAST_ACTIVE: 'last_active',
} as const

// ==================== VALIDATION ====================

/**
 * Validate if a difficulty is valid
 */
export function isValidDifficulty(difficulty: string): difficulty is 'easy' | 'medium' | 'hard' {
  return ['easy', 'medium', 'hard'].includes(difficulty)
}

/**
 * Get default difficulty settings
 */
export function getDefaultDifficultySettings(difficulty: 'easy' | 'medium' | 'hard') {
  return DIFFICULTY_SETTINGS[difficulty]
}

// ==================== TYPE EXPORTS ====================

export type Difficulty = 'easy' | 'medium' | 'hard'
export type GameMode = 'game' | 'sandbox' | 'tutorial'
