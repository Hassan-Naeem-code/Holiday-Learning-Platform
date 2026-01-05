/**
 * Centralized Type Definitions
 * All shared types and interfaces for the CodeLikeBasics platform
 * Eliminates duplicate type definitions and improves type safety
 */

// ==================== BASIC TYPES ====================

/**
 * Difficulty levels for games and sandboxes
 */
export type Difficulty = 'easy' | 'medium' | 'hard'

/**
 * Learning modes available
 */
export type GameMode = 'game' | 'sandbox' | 'tutorial'

/**
 * Learning goals for users
 */
export type LearningGoal = 'career' | 'hobby' | 'school'

/**
 * Tree growth stages
 */
export type TreeStage = 'seedling' | 'sapling' | 'growing' | 'mature' | 'flourishing'

/**
 * Celebration types
 */
export type CelebrationType = 'small' | 'medium' | 'large' | 'epic'

// ==================== GAME TYPES ====================

/**
 * Game state interface
 */
export interface GameState {
  /** Current level/question index */
  currentLevel: number

  /** Player's score */
  score: number

  /** Remaining lives */
  lives: number

  /** Remaining hints */
  hints: number

  /** Current combo count */
  combo: number

  /** Best combo achieved */
  bestCombo: number

  /** Whether game is started */
  started: boolean

  /** Whether game is won */
  gameWon: boolean

  /** Current difficulty */
  difficulty: Difficulty
}

/**
 * Question interface for quiz games
 */
export interface Question {
  /** Question ID */
  id: string

  /** Question text */
  question: string

  /** Available answer options */
  options: string[]

  /** Correct answer */
  correctAnswer: string

  /** Explanation of the answer */
  explanation: string

  /** Optional code snippet */
  code?: string

  /** Difficulty level */
  difficulty: Difficulty
}

/**
 * Game result after completion
 */
export interface GameResult {
  /** Final score */
  score: number

  /** Total questions */
  total: number

  /** Percentage score */
  percentage: number

  /** Whether passed (75%+) */
  passed: boolean

  /** Difficulty completed */
  difficulty: Difficulty

  /** XP earned */
  xpEarned: number

  /** Achievements unlocked */
  achievements: string[]
}

// ==================== SANDBOX TYPES ====================

/**
 * Sandbox exercise interface
 */
export interface SandboxExercise {
  /** Exercise ID */
  id: string

  /** Exercise title */
  title: string

  /** Exercise description/instructions */
  description: string

  /** Starting code template */
  starterCode: string

  /** Solution code */
  solution: string

  /** Expected output */
  expectedOutput: string

  /** Hints available */
  hints: string[]

  /** Difficulty level */
  difficulty: Difficulty

  /** Optional test cases */
  testCases?: TestCase[]
}

/**
 * Test case for code validation
 */
export interface TestCase {
  /** Test case ID */
  id: string

  /** Input for the test */
  input: string

  /** Expected output */
  expectedOutput: string

  /** Description of what's being tested */
  description: string
}

/**
 * Sandbox submission result
 */
export interface SandboxSubmission {
  /** User's code */
  code: string

  /** Actual output */
  output: string

  /** Whether submission is correct */
  isCorrect: boolean

  /** Similarity score (0-1) */
  similarity: number

  /** Execution time in ms */
  executionTime: number

  /** Any errors encountered */
  error?: string
}

// ==================== PROGRESS TYPES ====================

/**
 * Tutorial progress tracking
 */
export interface TutorialProgress {
  /** Whether tutorial is completed */
  completed: boolean

  /** Number of completed sections */
  completedSections: string[]

  /** Total number of sections */
  totalSections: number

  /** Current section index */
  currentSection: number

  /** Quiz scores for each section */
  quizScores: Record<string, number>

  /** Last updated timestamp */
  lastUpdated: Date
}

/**
 * Game progress tracking
 */
export interface GameProgressData {
  /** Highest level reached */
  highestLevel: number

  /** Completed difficulty levels */
  completedDifficulties: Difficulty[]

  /** Best scores per difficulty */
  bestScores: Record<Difficulty, number>

  /** Game state snapshot */
  gameState: Partial<GameState>

  /** Last played timestamp */
  lastPlayed: Date
}

/**
 * Sandbox progress tracking
 */
export interface SandboxProgressData {
  /** Completed exercises */
  completedExercises: string[]

  /** Current exercise index */
  currentExerciseIndex: number

  /** Completed difficulty levels */
  completedDifficulties: Difficulty[]

  /** Submissions per exercise */
  submissions: Record<string, number>

  /** Last worked timestamp */
  lastWorked: Date
}

/**
 * Language progress aggregation
 */
export interface LanguageProgress {
  /** Tutorial progress */
  tutorialProgress?: TutorialProgress

  /** Game progress */
  gameProgress?: GameProgressData

  /** Sandbox progress */
  sandboxProgress?: SandboxProgressData

  /** Overall completed difficulties */
  completedDifficulties?: {
    game?: Difficulty[]
    sandbox?: Difficulty[]
  }
}

// ==================== USER TYPES ====================

/**
 * User profile interface
 */
export interface UserProfile {
  /** Unique user code */
  code: string

  /** User's name */
  name: string

  /** User's age */
  age: number

  /** Current level */
  level: number

  /** Total XP earned */
  totalXP: number

  /** Current streak (days) */
  streak: number

  /** Learning goal */
  learningGoal?: LearningGoal

  /** Tree progress */
  treeProgress?: TreeProgress

  /** Unlocked achievements */
  achievements: string[]

  /** Progress per language */
  languageProgress?: Record<string, LanguageProgress>

  /** Account creation date */
  createdAt: Date

  /** Last active date */
  lastActive: Date

  /** Last streak update date */
  lastStreakUpdate?: Date

  // Legacy fields (for backward compatibility)
  drinkPreference?: 'beer' | 'coffee' | 'coke'
  glassProgress?: number
}

/**
 * Tree progress tracking
 */
export interface TreeProgress {
  /** Current growth stage */
  stage: TreeStage

  /** Overall growth percentage (0-100) */
  overallGrowth: number

  /** Last celebration timestamp */
  lastCelebration?: Date
}

// ==================== MODULE TYPES ====================

/**
 * Programming language/technology
 */
export interface Language {
  /** Language ID */
  id: string

  /** Display name */
  name: string

  /** Icon/emoji */
  icon: string

  /** Primary color */
  color: string

  /** Short description */
  description: string

  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

/**
 * Technology module
 */
export interface TechnologyModule {
  /** Module ID */
  id: string

  /** Module name */
  name: string

  /** Module description */
  description: string

  /** Module icon */
  icon: string

  /** Primary color */
  color: string

  /** Gradient classes */
  gradient: string

  /** Languages in this module */
  languages: Language[]
}

/**
 * Learning topic
 */
export interface LearningTopic {
  /** Topic ID */
  id: string

  /** Topic title */
  title: string

  /** Topic description */
  description: string

  /** Topic icon */
  icon: string

  /** Primary color */
  color: string

  /** Gradient classes */
  gradient: string

  /** Tutorial ID */
  tutorialId: string

  /** Game ID */
  gameId: string

  /** Sandbox ID */
  sandboxId: string
}

// ==================== ACHIEVEMENT TYPES ====================

/**
 * Achievement definition
 */
export interface Achievement {
  /** Achievement ID */
  id: string

  /** Achievement title */
  title: string

  /** Achievement description */
  description: string

  /** Achievement icon */
  icon: string

  /** Achievement color/rarity */
  color: string

  /** Condition to unlock */
  condition: (profile: UserProfile, progressMap: Map<string, LanguageProgress>) => boolean

  /** XP reward */
  xpReward?: number
}

// ==================== NOTIFICATION TYPES ====================

/**
 * Notification message
 */
export interface Notification {
  /** Notification ID */
  id: string

  /** Notification type */
  type: 'success' | 'error' | 'warning' | 'info'

  /** Notification message */
  message: string

  /** Duration in ms */
  duration?: number

  /** Auto-dismiss */
  autoDismiss?: boolean
}

// ==================== XP TYPES ====================

/**
 * XP reward configuration
 */
export interface XPReward {
  /** Amount of XP */
  amount: number

  /** Reason for XP */
  reason: string

  /** Multiplier (optional) */
  multiplier?: number

  /** Bonus flag */
  isBonus?: boolean
}

/**
 * Level up event
 */
export interface LevelUpEvent {
  /** Old level */
  oldLevel: number

  /** New level */
  newLevel: number

  /** Total XP */
  totalXP: number

  /** Rewards unlocked */
  rewards: string[]
}

// ==================== DRAG AND DROP TYPES ====================

/**
 * Draggable item
 */
export interface DraggableItem {
  /** Item ID */
  id: string

  /** Item content/label */
  content: string

  /** Item type */
  type: string

  /** Item icon (optional) */
  icon?: string

  /** Item color (optional) */
  color?: string
}

/**
 * Drop zone
 */
export interface DropZone {
  /** Zone ID */
  id: string

  /** Zone label */
  label: string

  /** Accepted item types */
  accepts: string[]

  /** Current items in zone */
  items: DraggableItem[]
}

// ==================== COMPONENT PROP TYPES ====================

/**
 * Common props for cards
 */
export interface CardProps {
  /** Card title */
  title: string

  /** Card description */
  description?: string

  /** Card icon */
  icon?: string

  /** Click handler */
  onClick?: () => void

  /** Whether card is disabled */
  disabled?: boolean

  /** Whether card is selected */
  selected?: boolean

  /** Custom className */
  className?: string
}

/**
 * Common props for modals
 */
export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean

  /** Close handler */
  onClose: () => void

  /** Modal title */
  title?: string

  /** Modal content */
  children: React.ReactNode

  /** Custom className */
  className?: string

  /** Whether to show close button */
  showCloseButton?: boolean
}

/**
 * Common props for buttons
 */
export interface ButtonProps {
  /** Button text */
  children: React.ReactNode

  /** Click handler */
  onClick?: () => void

  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'success'

  /** Button size */
  size?: 'small' | 'medium' | 'large'

  /** Whether button is disabled */
  disabled?: boolean

  /** Whether button is loading */
  loading?: boolean

  /** Custom className */
  className?: string

  /** Button type */
  type?: 'button' | 'submit' | 'reset'
}

// ==================== API RESPONSE TYPES ====================

/**
 * Generic API response
 */
export interface ApiResponse<T> {
  /** Whether request succeeded */
  success: boolean

  /** Response data */
  data?: T

  /** Error message */
  error?: string

  /** Response timestamp */
  timestamp: Date
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  /** Items in current page */
  items: T[]

  /** Total number of items */
  total: number

  /** Current page number */
  page: number

  /** Items per page */
  pageSize: number

  /** Whether there's a next page */
  hasMore: boolean
}

// ==================== UTILITY TYPES ====================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Make specific properties required
 */
export type RequireProps<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * Exclude null and undefined
 */
export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

/**
 * Extract promise type
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

/**
 * Function type with specific return
 */
export type AsyncFunction<T = void> = (...args: any[]) => Promise<T>

// ==================== TYPE GUARDS ====================

/**
 * Check if value is a valid difficulty
 */
export function isDifficulty(value: unknown): value is Difficulty {
  return typeof value === 'string' && ['easy', 'medium', 'hard'].includes(value)
}

/**
 * Check if value is a valid game mode
 */
export function isGameMode(value: unknown): value is GameMode {
  return typeof value === 'string' && ['game', 'sandbox', 'tutorial'].includes(value)
}

/**
 * Check if value is a valid learning goal
 */
export function isLearningGoal(value: unknown): value is LearningGoal {
  return typeof value === 'string' && ['career', 'hobby', 'school'].includes(value)
}
