'use client'

import { useState, useEffect } from 'react'
import ProgressGlass from './ProgressGlass'
import SantaDrinkingAnimation from './SantaDrinkingAnimation'
import { getUserProfile, emptyGlass } from '@/lib/firebaseService'
import type { UserProfile } from '@/lib/firebaseService'

// Global event emitter for profile refresh
export const triggerProfileRefresh = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('refreshProfile'))
  }
}

export default function GlobalProgressGlass() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showSantaAnimation, setShowSantaAnimation] = useState(false)

  useEffect(() => {
    const loadUserProfile = async () => {
      const userCode = localStorage.getItem('userCode')
      if (!userCode) return

      const profile = await getUserProfile(userCode)
      if (profile) {
        setUserProfile(profile)
      }
    }

    // Load profile immediately on mount
    loadUserProfile()

    // Event-driven profile refresh
    const handleProfileRefresh = () => {
      loadUserProfile()
    }

    window.addEventListener('refreshProfile', handleProfileRefresh)

    // Reduced polling as fallback (every 30 seconds instead of 5)
    // Only to catch updates from other tabs/windows
    const interval = setInterval(loadUserProfile, 30000) // 30 seconds

    return () => {
      window.removeEventListener('refreshProfile', handleProfileRefresh)
      clearInterval(interval)
    }
  }, [])

  const handleGlassFull = async () => {
    if (!userProfile) return
    setShowSantaAnimation(true)
  }

  const handleSantaAnimationComplete = async () => {
    if (!userProfile) return

    // Empty the glass in Firebase
    await emptyGlass(userProfile.code)

    // Update local state
    setUserProfile({
      ...userProfile,
      glassProgress: 0,
    })

    setShowSantaAnimation(false)
  }

  // Don't show if user is not logged in or no drink preference
  if (!userProfile || !userProfile.drinkPreference) {
    return null
  }

  return (
    <>
      {/* Santa Drinking Animation */}
      <SantaDrinkingAnimation
        isPlaying={showSantaAnimation}
        drinkType={userProfile.drinkPreference}
        onComplete={handleSantaAnimationComplete}
      />

      {/* Fixed Progress Glass - Above Music Icon */}
      <div className="fixed bottom-32 right-6 z-40">
        <ProgressGlass
          drinkType={userProfile.drinkPreference}
          fillPercentage={userProfile.glassProgress}
          onGlassFull={handleGlassFull}
        />
      </div>
    </>
  )
}
