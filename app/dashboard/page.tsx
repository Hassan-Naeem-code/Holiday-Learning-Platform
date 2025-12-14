'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sparkles, TrendingUp, Flame } from 'lucide-react'
import { TECHNOLOGY_MODULES } from '@/utils/techModules'
import ModuleCard from '@/components/Dashboard/ModuleCard'
import { getUserProfile } from '@/lib/firebaseService'
import type { UserProfile } from '@/lib/firebaseService'

export default function DashboardPage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user code from localStorage or session
    const userCode = localStorage.getItem('userCode')

    if (!userCode) {
      // Redirect to onboarding if no code found
      router.push('/')
      return
    }

    // Fetch user profile
    const loadProfile = async () => {
      const profile = await getUserProfile(userCode)
      if (profile) {
        setUserProfile(profile)
      } else {
        // Code not found, redirect to onboarding
        localStorage.removeItem('userCode')
        router.push('/')
      }
      setLoading(false)
    }

    loadProfile()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-16 h-16 text-yellow-300" />
        </motion.div>
      </div>
    )
  }

  if (!userProfile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pb-20">

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Top Bar with User Stats */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/20 max-w-4xl mx-auto">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Welcome back, {userProfile.name}! 👋
            </motion.h1>
            <p className="text-white/80 text-base sm:text-lg md:text-xl text-center mb-4 md:mb-6">
              Ready to continue your learning journey?
            </p>

            {/* Stats - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
              <div className="bg-white/10 rounded-xl p-3 md:p-4 text-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-white">{userProfile.level}</p>
                <p className="text-white/70 text-xs md:text-sm">Level</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 md:p-4 text-center">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-white">{userProfile.totalXP}</p>
                <p className="text-white/70 text-xs md:text-sm">Total XP</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 md:p-4 text-center">
                <Flame className="w-5 h-5 md:w-6 md:h-6 text-orange-400 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-white">{userProfile.streak}</p>
                <p className="text-white/70 text-xs md:text-sm">Day Streak</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12 px-2"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Technology Modules</h2>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80">
            Choose a module to start learning!
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {TECHNOLOGY_MODULES.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              index={index}
              onClick={() => router.push(`/module/${module.id}`)}
            />
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mt-8 md:mt-12 lg:mt-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20"
        >
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              🎯 How to Earn Progress
            </h3>
            <p className="text-white/90 text-sm sm:text-base md:text-lg">
              Complete tutorials, play games, and practice in sandboxes to earn XP!
              Watch your glass fill up, and when it&apos;s full, click it to see Santa celebrate with you! 🎅
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
