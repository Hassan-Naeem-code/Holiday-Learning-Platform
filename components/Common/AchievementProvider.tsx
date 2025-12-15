'use client'

import { useEffect, useState } from 'react'
import { achievementManager } from '@/utils/achievementManager'
import AchievementNotification from './AchievementNotification'

interface Achievement {
  id: string
  title: string
  icon: string
}

// Global event emitter for achievement checks
export const triggerAchievementCheck = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('checkAchievements'))
  }
}

export default function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    // Set up notification callback
    achievementManager.setNotificationCallback((achievement) => {
      setCurrentAchievement(achievement)
    })

    // Check achievements immediately on mount
    achievementManager.checkAll()

    // Event-driven achievement checking
    const handleAchievementCheck = () => {
      achievementManager.checkAll()
    }

    window.addEventListener('checkAchievements', handleAchievementCheck)

    // Reduced polling as fallback (every 60 seconds instead of 2)
    // This catches any achievements that might be missed by events
    const interval = setInterval(() => {
      achievementManager.checkAll()
    }, 60000) // 60 seconds

    return () => {
      window.removeEventListener('checkAchievements', handleAchievementCheck)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {children}
      <AchievementNotification
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </>
  )
}
