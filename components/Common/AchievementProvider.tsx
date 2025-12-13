'use client'

import { useEffect, useState } from 'react'
import { achievementManager } from '@/utils/achievementManager'
import AchievementNotification from './AchievementNotification'

interface Achievement {
  id: string
  title: string
  icon: string
}

export default function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    // Set up notification callback
    achievementManager.setNotificationCallback((achievement) => {
      setCurrentAchievement(achievement)
    })

    // Check achievements periodically (every 2 seconds)
    const interval = setInterval(() => {
      achievementManager.checkAll()
    }, 2000)

    // Check immediately on mount
    achievementManager.checkAll()

    return () => clearInterval(interval)
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
