'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WelcomeScreen from '@/components/Onboarding/WelcomeScreen'
import NewUserForm from '@/components/Onboarding/NewUserForm'
import ReturningUserForm from '@/components/Onboarding/ReturningUserForm'
import GoalSelectionScreen from '@/components/Onboarding/GoalSelectionScreen'
import { getSession, migrateOldSession, createSession } from '@/utils/sessionManager'

type OnboardingStep = 'welcome' | 'new-user' | 'returning-user' | 'goal-selection'

export default function Home() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [userCode, setUserCode] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [userAge, setUserAge] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Try to migrate old session format if exists
        migrateOldSession()

        // Check if user already has a valid session
        const existingCode = getSession()

        if (existingCode) {
          // User already onboarded, redirect to dashboard
          router.push('/dashboard')
          // Set a timeout in case redirect fails
          setTimeout(() => {
            setIsLoading(false)
          }, 2000)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Session check error:', error)
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router])

  const handleUserTypeSelect = (type: 'new' | 'returning') => {
    if (type === 'new') {
      setCurrentStep('new-user')
    } else {
      setCurrentStep('returning-user')
    }
  }

  const handleNewUserComplete = (code: string, name: string, age: number) => {
    setUserCode(code)
    setUserName(name)
    setUserAge(age)
    setCurrentStep('goal-selection')
  }

  const handleReturningUserSuccess = (code: string) => {
    // Create secure session and redirect to dashboard
    if (createSession(code)) {
      router.push('/dashboard')
    } else {
      console.error('Failed to create session')
    }
  }

  const handleGoalSelectionComplete = (goal: 'career' | 'hobby' | 'school') => {
    void goal
    // Create secure session and redirect to dashboard
    if (userCode) {
      if (createSession(userCode)) {
        router.push('/dashboard')
      } else {
        console.error('Failed to create session')
      }
    }
  }

  const handleBack = () => {
    setCurrentStep('welcome')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="flex flex-col items-center gap-6">
          {/* Modern Animated Spinner */}
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-20 h-20 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
          </div>

          {/* Animated text */}
          <div className="text-white text-xl font-semibold animate-pulse">
            Loading your experience...
          </div>

          {/* Animated dots */}
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {currentStep === 'welcome' && (
        <WelcomeScreen onSelectUserType={handleUserTypeSelect} />
      )}

      {currentStep === 'new-user' && (
        <NewUserForm onComplete={handleNewUserComplete} onBack={handleBack} />
      )}

      {currentStep === 'returning-user' && (
        <ReturningUserForm onSuccess={handleReturningUserSuccess} onBack={handleBack} />
      )}

      {currentStep === 'goal-selection' && userCode && (
        <GoalSelectionScreen
          code={userCode}
          name={userName}
          onComplete={handleGoalSelectionComplete}
        />
      )}
    </>
  )
}
