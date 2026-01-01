import { db } from './firebase'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore'
import { generateUniqueCode } from '@/utils/userCodeGenerator'

export interface LanguageProgress {
  difficulty: 'easy' | 'medium' | 'hard'
  tutorialProgress: {
    currentSection: number
    completedSections: number[]
    totalSections: number
    completed: boolean
  }
  gameProgress: {
    currentLevel: number
    completedLevels: number[]
    totalLevels: number
    completed: boolean
    // Game state for resume functionality
    lives?: number
    hints?: number
    score?: number
  }
  sandboxProgress?: {
    easy?: {
      currentExercise: number
      completedExercises: number[]
      completed: boolean
    }
    medium?: {
      currentExercise: number
      completedExercises: number[]
      completed: boolean
    }
    hard?: {
      currentExercise: number
      completedExercises: number[]
      completed: boolean
    }
  }
  completedDifficulties?: {
    tutorial?: ('easy' | 'medium' | 'hard')[]
    game?: ('easy' | 'medium' | 'hard')[]
    sandbox?: ('easy' | 'medium' | 'hard')[]
  }
  lastAccessed: Timestamp
}

export interface UserProfile {
  code: string
  name: string
  age: number
  // New fields for learning tree system
  learningGoal?: 'career' | 'hobby' | 'school'
  treeProgress?: {
    stage: 'seedling' | 'sapling' | 'growing' | 'mature' | 'flourishing'
    overallGrowth: number // 0-100
    lastCelebration?: Timestamp
  }
  // Legacy fields (keep for backward compatibility)
  drinkPreference?: 'beer' | 'coffee' | 'coke'
  glassProgress?: number // 0-100, represents how full the glass is
  // Common fields
  level: number
  totalXP: number
  streak: number
  achievements: string[]
  languageProgress?: { [key: string]: LanguageProgress } // key format: "moduleId-languageId"
  createdAt: Timestamp
  lastActive: Timestamp
}

const USERS_COLLECTION = 'users'

/**
 * Creates a new user profile with a unique code
 */
export async function createUserProfile(
  name: string,
  age: number
): Promise<string> {
  try {
    let code = generateUniqueCode()
    let attempts = 0
    const maxAttempts = 10

    // Ensure the code is unique
    while (attempts < maxAttempts) {
      const userRef = doc(db, USERS_COLLECTION, code)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        // Code is unique, create the user
        const newUser: UserProfile = {
          code,
          name,
          age,
          level: 1,
          totalXP: 0,
          streak: 0,
          achievements: [],
          // Initialize tree progress for new system
          treeProgress: {
            stage: 'seedling',
            overallGrowth: 0,
          },
          // Keep legacy field for backward compatibility
          glassProgress: 0,
          createdAt: Timestamp.now(),
          lastActive: Timestamp.now(),
        }

        await setDoc(userRef, newUser)
        return code
      }

      // Code exists, generate a new one
      code = generateUniqueCode()
      attempts++
    }

    throw new Error('Failed to generate a unique code. Please try again.')
  } catch (error) {
    console.error('Error creating user profile:', error)
    throw new Error('Failed to create user profile. Please check your connection and try again.')
  }
}

/**
 * Fetches user profile by code
 * @throws Error if database connection fails
 * @returns UserProfile if found, null if user doesn't exist
 */
export async function getUserProfile(code: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }
    // User not found - this is not an error, return null
    return null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    // This is a real error (network, permissions, etc.)
    throw new Error('Failed to fetch user profile. Please check your connection.')
  }
}

/**
 * Updates user's drink preference
 */
export async function updateDrinkPreference(
  code: string,
  preference: 'beer' | 'coffee' | 'coke'
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    await updateDoc(userRef, {
      drinkPreference: preference,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating drink preference:', error)
    throw new Error('Failed to save drink preference. Please try again.')
  }
}

/**
 * Adds XP to user and updates both glass (legacy) and tree progress
 * @throws Error if update fails or user not found
 */
export async function addUserXP(code: string, xpAmount: number): Promise<void> {
  try {
    // Validate XP amount (max 100 per single update to prevent cheating)
    if (xpAmount < 0 || xpAmount > 100) {
      throw new Error('Invalid XP amount')
    }

    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile
    const newTotalXP = userData.totalXP + xpAmount
    const newLevel = Math.floor(newTotalXP / 1000) + 1

    // Update core XP and level
    const updates: any = {
      totalXP: newTotalXP,
      level: newLevel,
      lastActive: Timestamp.now(),
    }

    // Legacy: Update glass progress if it exists
    if (userData.glassProgress !== undefined) {
      let newGlassProgress = userData.glassProgress + (xpAmount / 10)
      if (newGlassProgress > 100) {
        newGlassProgress = 100
      }
      updates.glassProgress = newGlassProgress
    }

    await updateDoc(userRef, updates)

    // Update tree progress (new system)
    await updateTreeProgress(code, xpAmount)
  } catch (error) {
    console.error('Error adding XP:', error)
    throw new Error('Failed to update XP. Progress may not be saved.')
  }
}

/**
 * Empties the glass (called when Santa drinks it)
 */
export async function emptyGlass(code: string): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    await updateDoc(userRef, {
      glassProgress: 0,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error emptying glass:', error)
    throw new Error('Failed to empty glass. Please try again.')
  }
}

/**
 * Forces the glass to full for milestone rewards
 */
export async function fillGlass(code: string): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    await updateDoc(userRef, {
      glassProgress: 100,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error filling glass:', error)
    throw new Error('Failed to fill glass. Please try again.')
  }
}

/**
 * Unlocks an achievement
 */
export async function unlockAchievement(
  code: string,
  achievementId: string
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile
    if (!userData.achievements.includes(achievementId)) {
      await updateDoc(userRef, {
        achievements: [...userData.achievements, achievementId],
        lastActive: Timestamp.now(),
      })
    }
  } catch (error) {
    console.error('Error unlocking achievement:', error)
    throw new Error('Failed to unlock achievement. Please try again.')
  }
}

/**
 * Updates user's streak based on last active date
 * Returns the updated streak value and whether it increased
 */
export async function updateUserStreak(code: string): Promise<{ streak: number; increased: boolean; isNew: boolean }> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile
    const lastActive = userData.lastActive.toDate()
    const now = new Date()

    // Reset time to midnight for accurate day comparison
    const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate())
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const daysDiff = Math.floor((today.getTime() - lastActiveDay.getTime()) / (1000 * 60 * 60 * 24))

    let newStreak = userData.streak
    let increased = false
    let isNew = false

    if (daysDiff === 0) {
      // Same day - no change to streak
      return { streak: newStreak, increased: false, isNew: false }
    } else if (daysDiff === 1) {
      // Consecutive day - increment streak
      newStreak += 1
      increased = true
      if (newStreak === 1) {
        isNew = true
      }
    } else if (daysDiff > 1) {
      // Streak broken - reset to 1
      newStreak = 1
      isNew = true
    }

    await updateDoc(userRef, {
      streak: newStreak,
      lastActive: Timestamp.now(),
    })

    return { streak: newStreak, increased, isNew }
  } catch (error) {
    console.error('Error updating streak:', error)
    throw new Error('Failed to update streak. Please try again.')
  }
}

/**
 * Updates user's last active timestamp
 */
export async function updateLastActive(code: string): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    await updateDoc(userRef, {
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating last active:', error)
    // Don't throw - this is non-critical, allow silent fail
  }
}

/**
 * Updates user's learning goal
 */
export async function updateLearningGoal(
  code: string,
  goal: 'career' | 'hobby' | 'school'
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    await updateDoc(userRef, {
      learningGoal: goal,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating learning goal:', error)
    throw new Error('Failed to update learning goal. Please try again.')
  }
}

/**
 * Updates tree progress when user gains XP
 */
export async function updateTreeProgress(
  code: string,
  xpGained: number
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile

    // Initialize tree progress if it doesn't exist
    if (!userData.treeProgress) {
      await updateDoc(userRef, {
        treeProgress: {
          stage: 'seedling',
          overallGrowth: 0,
        },
        lastActive: Timestamp.now(),
      })
      return
    }

    // Calculate new growth (10% per 100 XP, same as old glass system)
    const newGrowth = Math.min(100, userData.treeProgress.overallGrowth + (xpGained / 10))

    // Determine stage based on growth
    let stage: 'seedling' | 'sapling' | 'growing' | 'mature' | 'flourishing'
    if (newGrowth < 25) stage = 'seedling'
    else if (newGrowth < 50) stage = 'sapling'
    else if (newGrowth < 75) stage = 'growing'
    else if (newGrowth < 100) stage = 'mature'
    else stage = 'flourishing'

    await updateDoc(userRef, {
      'treeProgress.overallGrowth': newGrowth,
      'treeProgress.stage': stage,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating tree progress:', error)
    throw new Error('Failed to update tree progress. Please try again.')
  }
}

/**
 * Resets tree progress after celebration (back to 75% mature state)
 */
export async function resetTreeProgress(code: string): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    await updateDoc(userRef, {
      'treeProgress.overallGrowth': 75,
      'treeProgress.stage': 'mature',
      'treeProgress.lastCelebration': Timestamp.now(),
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error resetting tree progress:', error)
    throw new Error('Failed to reset tree progress. Please try again.')
  }
}

/**
 * Gets language progress for a specific language
 */
export async function getLanguageProgress(
  code: string,
  languageKey: string // format: "moduleId-languageId"
): Promise<LanguageProgress | null> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      const userData = userDoc.data() as UserProfile
      return userData.languageProgress?.[languageKey] || null
    }
    return null
  } catch (error) {
    console.error('Error getting language progress:', error)
    throw new Error('Failed to load progress. Please check your connection.')
  }
}

/**
 * Initializes language progress when user starts learning
 */
export async function initializeLanguageProgress(
  code: string,
  languageKey: string,
  difficulty: 'easy' | 'medium' | 'hard',
  totalTutorialSections: number,
  totalGameLevels: number
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile
    const languageProgress = userData.languageProgress || {}

    languageProgress[languageKey] = {
      difficulty,
      tutorialProgress: {
        currentSection: 0,
        completedSections: [],
        totalSections: totalTutorialSections,
        completed: false,
      },
      gameProgress: {
        currentLevel: 0,
        completedLevels: [],
        totalLevels: totalGameLevels,
        completed: false,
      },
      lastAccessed: Timestamp.now(),
    }

    await updateDoc(userRef, {
      languageProgress,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error initializing language progress:', error)
    throw new Error('Failed to initialize progress. Please try again.')
  }
}

/**
 * Updates tutorial progress for a language
 */
export async function updateTutorialProgress(
  code: string,
  languageKey: string,
  currentSection: number,
  completedSections: number[],
  completed: boolean
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile
    const languageProgress = userData.languageProgress || {}

    if (!languageProgress[languageKey]) {
      throw new Error('Language progress not initialized')
    }

    languageProgress[languageKey].tutorialProgress = {
      ...languageProgress[languageKey].tutorialProgress,
      currentSection,
      completedSections,
      completed,
    }
    languageProgress[languageKey].lastAccessed = Timestamp.now()

    await updateDoc(userRef, {
      languageProgress,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating tutorial progress:', error)
    throw new Error('Failed to save tutorial progress. Please try again.')
  }
}

/**
 * Updates game progress for a language
 */
export async function updateGameProgress(
  code: string,
  languageKey: string,
  currentLevel: number,
  completedLevels: number[],
  completed: boolean,
  gameState?: {
    lives?: number
    hints?: number
    score?: number
  },
  difficulty?: 'easy' | 'medium' | 'hard'
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile
    const languageProgress = userData.languageProgress || {}

    if (!languageProgress[languageKey]) {
      throw new Error('Language progress not initialized')
    }

    languageProgress[languageKey].gameProgress = {
      ...languageProgress[languageKey].gameProgress,
      currentLevel,
      completedLevels,
      completed,
      // Save game state for resume functionality
      lives: gameState?.lives,
      hints: gameState?.hints,
      score: gameState?.score,
    }
    
    // If game is completed and difficulty is provided, mark globally complete
    if (completed && difficulty) {
      markDifficultyCompleteGlobally(languageProgress[languageKey], difficulty)
    }
    
    languageProgress[languageKey].lastAccessed = Timestamp.now()

    await updateDoc(userRef, {
      languageProgress,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating game progress:', error)
    throw new Error('Failed to save game progress. Please try again.')
  }
}

/**
 * Updates sandbox progress for a language at a specific difficulty
 */
export async function updateSandboxProgress(
  code: string,
  languageKey: string,
  difficulty: 'easy' | 'medium' | 'hard',
  currentExercise: number,
  completedExercises: number[],
  totalExercises: number
): Promise<void> {
  try {
    const userRef = doc(db, USERS_COLLECTION, code)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      throw new Error('User not found')
    }

    const userData = userDoc.data() as UserProfile
    const languageProgress = userData.languageProgress || {}

    if (!languageProgress[languageKey]) {
      throw new Error('Language progress not initialized')
    }

    const isCompleted = completedExercises.length >= totalExercises

    // Initialize sandboxProgress if it doesn't exist
    if (!languageProgress[languageKey].sandboxProgress) {
      languageProgress[languageKey].sandboxProgress = {}
    }

    // Update progress for specific difficulty
    languageProgress[languageKey].sandboxProgress![difficulty] = {
      currentExercise,
      completedExercises,
      completed: isCompleted,
    }

    // If sandbox is completed, mark difficulty complete globally (for both game and sandbox)
    if (isCompleted) {
      markDifficultyCompleteGlobally(languageProgress[languageKey], difficulty)
    }

    languageProgress[languageKey].lastAccessed = Timestamp.now()

    await updateDoc(userRef, {
      languageProgress,
      lastActive: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating sandbox progress:', error)
    throw new Error('Failed to save sandbox progress. Please try again.')
  }
}

/**
 * Get all globally completed difficulties (merged from all modes)
 */
export function getGlobalCompletedDifficulties(
  completedDifficulties?: {
    tutorial?: ('easy' | 'medium' | 'hard')[]
    game?: ('easy' | 'medium' | 'hard')[]
    sandbox?: ('easy' | 'medium' | 'hard')[]
  }
): ('easy' | 'medium' | 'hard')[] {
  if (!completedDifficulties) return []

  const allCompleted = new Set<'easy' | 'medium' | 'hard'>()

  // For game and sandbox, they share completion (completing one completes both)
  // Merge game and sandbox difficulties
  if (completedDifficulties.game) {
    completedDifficulties.game.forEach(d => allCompleted.add(d))
  }
  if (completedDifficulties.sandbox) {
    completedDifficulties.sandbox.forEach(d => allCompleted.add(d))
  }

  return Array.from(allCompleted)
}

/**
 * Mark a difficulty as complete across Game and Sandbox modes
 * This ensures that once a difficulty is completed in either Game or Sandbox, it's marked complete for both
 */
function markDifficultyCompleteGlobally(
  languageProgress: LanguageProgress,
  difficulty: 'easy' | 'medium' | 'hard'
): void {
  if (!languageProgress.completedDifficulties) {
    languageProgress.completedDifficulties = {}
  }

  // Add to both game and sandbox arrays (they share completion)
  const modes: ('game' | 'sandbox')[] = ['game', 'sandbox']
  modes.forEach(mode => {
    if (!languageProgress.completedDifficulties![mode]) {
      languageProgress.completedDifficulties![mode] = []
    }
    if (!languageProgress.completedDifficulties![mode]!.includes(difficulty)) {
      languageProgress.completedDifficulties![mode]!.push(difficulty)
    }
  })
}

/**
 * Get the next available difficulty for a user in sandbox/game
 */
export function getNextDifficulty(
  completedDifficulties?: ('easy' | 'medium' | 'hard')[]
): 'easy' | 'medium' | 'hard' | null {
  if (!completedDifficulties || completedDifficulties.length === 0) {
    return 'easy'
  }
  if (!completedDifficulties.includes('easy')) {
    return 'easy'
  }
  if (!completedDifficulties.includes('medium')) {
    return 'medium'
  }
  if (!completedDifficulties.includes('hard')) {
    return 'hard'
  }
  return null // All difficulties completed
}
