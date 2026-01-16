import { create } from 'zustand'
import { storage, STORAGE_KEYS } from '@/utils/storage'

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

export const useUserStore = create<UserStore>((set) => ({
  user: DEFAULT_USER,

  addXP: (amount: number) => {
    set((state) => {
      const newTotalXP = state.user.totalXP + amount
      const newLevel = calculateLevel(newTotalXP)
      const updatedUser = {
        ...state.user,
        totalXP: newTotalXP,
        level: newLevel,
        lastActive: new Date(),
      }
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser)

      // Trigger profile refresh for GlobalLearningTree and other listeners
      // This uses the window event system to avoid circular dependencies
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('triggerProfileRefresh'))
      }

      return { user: updatedUser }
    })
  },

  unlockAchievement: (achievementId: string) => {
    set((state) => {
      if (state.user.achievements.includes(achievementId)) {
        return state // Already unlocked
      }

      const updatedUser = {
        ...state.user,
        achievements: [...state.user.achievements, achievementId],
        lastActive: new Date(),
      }
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser)
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
      storage.set(STORAGE_KEYS.USER_DATA, updatedUser)
      return { user: updatedUser }
    })
  },
}))
