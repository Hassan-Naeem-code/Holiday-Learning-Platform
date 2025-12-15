import { create } from 'zustand'
import { storage, STORAGE_KEYS } from '@/utils/storage'
import { storageIntegrity, antiCheat } from '@/utils/security'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
}

export interface UserData {
  level: number
  totalXP: number
  streak: number
  achievements: string[] // Achievement IDs
  lastActive: Date
}

interface UserStore {
  user: UserData
  addXP: (amount: number) => void
  unlockAchievement: (achievementId: string) => void
  updateStreak: () => void
  resetProgress: () => void
  loadFromStorage: () => void
  syncFromFirebase: (firebaseData: Partial<UserData>) => void
}

const DEFAULT_USER: UserData = {
  level: 1,
  totalXP: 0,
  streak: 0,
  achievements: [],
  lastActive: new Date(),
}

const calculateLevel = (xp: number): number => {
  // Level up every 1000 XP
  return Math.floor(xp / 1000) + 1
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: DEFAULT_USER,

  addXP: (amount: number) => {
    set((state) => {
      // Validate XP amount
      if (!storageIntegrity.validateXP(state.user.totalXP + amount)) {
        console.error('Invalid XP amount detected')
        return state
      }

      const newTotalXP = state.user.totalXP + amount
      const newLevel = calculateLevel(newTotalXP)
      const updatedUser = {
        ...state.user,
        totalXP: newTotalXP,
        level: newLevel,
        lastActive: new Date(),
      }

      // Store with checksum
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser)
      storage.set(`${STORAGE_KEYS.USER_DATA}_checksum`, storageIntegrity.generateChecksum(updatedUser))

      return { user: updatedUser }
    })
  },

  unlockAchievement: (achievementId: string) => {
    set((state) => {
      if (state.user.achievements.includes(achievementId)) {
        return state // Already unlocked
      }

      const newAchievements = [...state.user.achievements, achievementId]

      // Validate achievements
      if (!storageIntegrity.validateAchievements(newAchievements)) {
        console.error('Invalid achievement detected')
        return state
      }

      const updatedUser = {
        ...state.user,
        achievements: newAchievements,
        lastActive: new Date(),
      }

      storage.set(STORAGE_KEYS.USER_DATA, updatedUser)
      storage.set(`${STORAGE_KEYS.USER_DATA}_checksum`, storageIntegrity.generateChecksum(updatedUser))

      return { user: updatedUser }
    })
  },

  updateStreak: () => {
    set((state) => {
      const lastActive = new Date(state.user.lastActive)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))

      let newStreak = state.user.streak
      if (daysDiff === 1) {
        // Consecutive day
        newStreak += 1
      } else if (daysDiff > 1) {
        // Streak broken
        newStreak = 1
      }
      // If same day, keep streak

      const updatedUser = {
        ...state.user,
        streak: newStreak,
        lastActive: now,
      }
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser)
      return { user: updatedUser }
    })
  },

  resetProgress: () => {
    storage.clearAll()
    set({ user: DEFAULT_USER })
  },

  loadFromStorage: () => {
    const savedUser = storage.get<UserData>(STORAGE_KEYS.USER_DATA, DEFAULT_USER)
    const storedChecksum = storage.get<string>(`${STORAGE_KEYS.USER_DATA}_checksum`, '')

    // Verify integrity
    if (storedChecksum && !storageIntegrity.verify(savedUser, storedChecksum)) {
      console.warn('User data integrity check failed - using defaults')
      set({ user: DEFAULT_USER })
      return
    }

    // Detect tampering
    if (antiCheat.detectTampering()) {
      console.warn('Potential tampering detected')
    }

    set({ user: savedUser })
  },

  syncFromFirebase: (firebaseData: Partial<UserData>) => {
    set((state) => {
      // Merge Firebase data with local state
      // Firebase is the source of truth for critical data
      const updatedUser = {
        ...state.user,
        ...firebaseData,
        lastActive: new Date(),
      }

      // Update localStorage cache
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser)
      storage.set(`${STORAGE_KEYS.USER_DATA}_checksum`, storageIntegrity.generateChecksum(updatedUser))

      return { user: updatedUser }
    })
  },
}))
