'use client'

import { useState, useEffect, useCallback } from 'react'
import { getUserProfile, resetTreeProgress, type UserProfile } from '@/lib/firebaseService'
import LearningTree from './LearningTree'
import TreeCelebration from './TreeCelebration'
import { getSession } from '@/utils/sessionManager'

// Global event system for triggering profile refresh
const PROFILE_REFRESH_EVENT = 'triggerProfileRefresh'

export function triggerProfileRefresh() {
  window.dispatchEvent(new Event(PROFILE_REFRESH_EVENT))
}

export default function GlobalLearningTree() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [loading, setLoading] = useState(true)
  const userCode = getSession()

  const loadProfile = useCallback(async () => {
    if (!userCode) {
      setLoading(false)
      return
    }

    try {
      const profile = await getUserProfile(userCode)
      if (profile) {
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Error loading profile for tree:', error)
    } finally {
      setLoading(false)
    }
  }, [userCode])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  // Listen for profile refresh events (when XP is added)
  useEffect(() => {
    const handleRefresh = () => {
      loadProfile()
    }

    window.addEventListener(PROFILE_REFRESH_EVENT, handleRefresh)
    return () => {
      window.removeEventListener(PROFILE_REFRESH_EVENT, handleRefresh)
    }
  }, [loadProfile])

  const handleCelebrate = () => {
    setShowCelebration(true)
  }

  const handleCelebrationComplete = async () => {
    setShowCelebration(false)

    // Reset tree to 75% (mature stage)
    if (userCode) {
      try {
        await resetTreeProgress(userCode)
        await loadProfile()
      } catch (error) {
        console.error('Error resetting tree:', error)
      }
    }
  }

  // Don't render if no user, no tree progress, or no learning goal
  if (loading || !userProfile?.learningGoal || !userProfile?.treeProgress) {
    return null
  }

  return (
    <>
      {/* Fixed position tree in bottom right */}
      <div className="fixed bottom-24 right-4 md:right-8 z-50">
        <LearningTree
          goalType={userProfile.learningGoal}
          treeProgress={userProfile.treeProgress}
          onCelebrate={handleCelebrate}
        />
      </div>

      {/* Celebration modal */}
      <TreeCelebration
        isPlaying={showCelebration}
        goalType={userProfile.learningGoal}
        onComplete={handleCelebrationComplete}
      />
    </>
  )
}
