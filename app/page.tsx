'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WelcomeScreen from '@/components/Onboarding/WelcomeScreen'
import NewUserForm from '@/components/Onboarding/NewUserForm'
import ReturningUserForm from '@/components/Onboarding/ReturningUserForm'
import DrinkPreferenceScreen from '@/components/Onboarding/DrinkPreferenceScreen'
import { getSession, migrateOldSession } from '@/utils/sessionManager'

type OnboardingStep = 'welcome' | 'new-user' | 'returning-user' | 'drink-preference'

export default function Home() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [userCode, setUserCode] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [userAge, setUserAge] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Try to migrate old session format if exists
    migrateOldSession()

    // Check if user already has a valid session
    const existingCode = getSession()

    if (existingCode) {
      // User already onboarded, redirect to dashboard
      router.push('/dashboard')
    } else {
      setIsLoading(false)
    }
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
    setCurrentStep('drink-preference')
  }

  const handleReturningUserSuccess = (code: string) => {
    // Create secure session and redirect to dashboard
    const { createSession } = require('@/utils/sessionManager')
    if (createSession(code)) {
      router.push('/dashboard')
    } else {
      console.error('Failed to create session')
    }
  }

  const handleDrinkPreferenceComplete = (preference: 'beer' | 'coffee' | 'coke') => {
    void preference
    // Create secure session and redirect to dashboard
    if (userCode) {
      const { createSession } = require('@/utils/sessionManager')
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
        <div className="text-white text-2xl">Loading...</div>
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

      {currentStep === 'drink-preference' && userCode && (
        <DrinkPreferenceScreen
          code={userCode}
          name={userName}
          age={userAge}
          onComplete={handleDrinkPreferenceComplete}
        />
      )}
    </>
  )
}
