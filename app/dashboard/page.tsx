'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sparkles, Flame, Trophy, Target, Zap } from 'lucide-react'
import { TECHNOLOGY_MODULES, type Module } from '@/utils/techModules'
import ModuleCard from '@/components/Dashboard/ModuleCard'
import SearchFilter from '@/components/Dashboard/SearchFilter'
import { getUserProfile, updateUserStreak, addUserXP } from '@/lib/firebaseService'
import type { UserProfile } from '@/lib/firebaseService'
import { useUserStore } from '@/stores/userStore'
import { validateSession, clearSession } from '@/utils/sessionManager'
import { XP_REWARDS } from '@/hooks/useXP'
import { SkeletonDashboard } from '@/components/Common/Skeleton'

export default function DashboardPage() {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [streakNotification, setStreakNotification] = useState<{ show: boolean; streak: number; isNew: boolean } | null>(null)
  const [filteredModules, setFilteredModules] = useState<Module[]>(TECHNOLOGY_MODULES)
  const syncFromFirebase = useUserStore((state) => state.syncFromFirebase)

  // Handler for search/filter changes
  const handleFilteredModulesChange = useCallback((modules: Module[]) => {
    setFilteredModules(modules)
  }, [])

  useEffect(() => {
    const userCode = validateSession(() => router.push('/'))
    if (!userCode) return

    const loadProfile = async () => {
      try {
        const profile = await getUserProfile(userCode)
        if (profile) {
          try {
            const streakResult = await updateUserStreak(userCode)
            if (streakResult.increased) {
              await addUserXP(userCode, XP_REWARDS.STREAK_BONUS)
              setStreakNotification({
                show: true,
                streak: streakResult.streak,
                isNew: streakResult.isNew
              })
            }
            const updatedProfile = await getUserProfile(userCode)
            if (updatedProfile) {
              setUserProfile(updatedProfile)
              syncFromFirebase({
                level: updatedProfile.level,
                totalXP: updatedProfile.totalXP,
                streak: updatedProfile.streak,
                achievements: updatedProfile.achievements,
              })
            }
          } catch {
            setUserProfile(profile)
            syncFromFirebase({
              level: profile.level,
              totalXP: profile.totalXP,
              streak: profile.streak,
              achievements: profile.achievements,
            })
          }
        } else {
          clearSession()
          router.push('/')
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [router, syncFromFirebase])

  useEffect(() => {
    if (streakNotification?.show) {
      const timer = setTimeout(() => setStreakNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [streakNotification])

  if (loading) {
    return (
      <div className="min-h-screen p-6 md:p-8 lg:p-12">
        <SkeletonDashboard />
      </div>
    )
  }

  if (!userProfile) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-blue-dark pb-32">
      {/* Subtle animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* HERO SECTION: Large, bold, professional */}
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl 2xl:max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            {/* Welcome message: BIG and BOLD */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Welcome back,{' '}
              <span className="bg-gradient-to-r from-brand-gold to-yellow-300 bg-clip-text text-transparent">
                {userProfile.name}
              </span>
              ! 👋
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/80 mb-6 sm:mb-8 md:mb-12">
              Ready to continue your coding journey?
            </p>

            {/* Stats Cards: Bigger, more impactful */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl 2xl:max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 2xl:p-10 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 shadow-lg">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-1 sm:mb-2">{userProfile.level}</p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/70 font-medium">Level</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 2xl:p-10 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 bg-gradient-to-br from-brand-gold to-yellow-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 shadow-lg">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-gray-900" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-1 sm:mb-2">{userProfile.totalXP}</p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/70 font-medium">Total XP</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-3 sm:p-4 md:p-6 lg:p-8 2xl:p-10 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 shadow-lg">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-1 sm:mb-2">{userProfile.streak}</p>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/70 font-medium">Day Streak</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section Header: Clear visual hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-6 sm:mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 rounded-full backdrop-blur-sm">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7 text-brand-gold" />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-semibold text-white">Choose Your Path</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-3 sm:mb-4">
              Technology Modules
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-white/70 max-w-2xl 2xl:max-w-3xl mx-auto px-4">
              Select a module below to start learning, playing games, and building projects
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <SearchFilter
              modules={TECHNOLOGY_MODULES}
              onFilteredModulesChange={handleFilteredModulesChange}
            />
          </motion.div>

          {/* Modules Grid: Bigger, better spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl 2xl:max-w-[1600px] mx-auto">
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <ModuleCard
                  module={module}
                  index={index}
                  onClick={() => router.push(`/module/${module.id}`)}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-4xl mx-auto mt-20 text-center"
          >
            <div className="glass-card p-8 md:p-12 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20">
              <Sparkles className="w-12 h-12 text-brand-gold mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                How to Earn Progress
              </h3>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Complete tutorials, win games, and practice in sandboxes to earn XP!<br/>
                Watch your knowledge tree grow as you complete lessons! 🌳
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Streak Notification */}
      <AnimatePresence>
        {streakNotification?.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-5 rounded-2xl shadow-2xl border-2 border-white/30">
              <div className="flex items-center gap-4">
                <Flame className="w-10 h-10 animate-pulse" />
                <div>
                  <p className="font-bold text-xl">
                    {streakNotification.isNew ? '🔥 Streak Started!' : '🔥 Streak Continued!'}
                  </p>
                  <p className="text-base">
                    Day {streakNotification.streak} • +{XP_REWARDS.STREAK_BONUS} XP Bonus!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
