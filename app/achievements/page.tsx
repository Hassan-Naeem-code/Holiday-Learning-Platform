'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Award, Lock } from 'lucide-react'
import { validateSession } from '@/utils/sessionManager'
import { getUserProfile, getLanguageProgress } from '@/lib/firebaseService'
import { TECHNOLOGY_MODULES } from '@/utils/techModules'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  color: string
  condition: (profile: any, progressMap: Map<string, any>) => boolean
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first tutorial',
    icon: '🎯',
    color: 'from-blue-500 to-blue-700',
    condition: (profile, progressMap) => {
      for (const progress of progressMap.values()) {
        if (progress.tutorialProgress?.completed) return true
      }
      return false
    },
  },
  {
    id: 'game-master',
    title: 'Game Master',
    description: 'Win any game on hard difficulty',
    icon: '🎮',
    color: 'from-purple-500 to-purple-700',
    condition: (profile, progressMap) => {
      for (const progress of progressMap.values()) {
        if (progress.completedDifficulties?.game?.includes('hard')) return true
      }
      return false
    },
  },
  {
    id: 'scholar',
    title: 'Scholar',
    description: 'Complete all tutorials in one module',
    icon: '📚',
    color: 'from-green-500 to-green-700',
    condition: (profile, progressMap) => {
      for (const mod of TECHNOLOGY_MODULES) {
        let allTutorialsComplete = true
        for (const language of mod.languages) {
          const languageKey = `${mod.id}-${language.id}`
          const progress = progressMap.get(languageKey)
          if (!progress?.tutorialProgress?.completed) {
            allTutorialsComplete = false
            break
          }
        }
        if (allTutorialsComplete && mod.languages.length > 0) return true
      }
      return false
    },
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Earn 500+ XP quickly',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-600',
    condition: (profile, progressMap) => (profile.totalXP || 0) > 500,
  },
  {
    id: 'experimenter',
    title: 'Experimenter',
    description: 'Complete sandbox exercises',
    icon: '🔬',
    color: 'from-cyan-500 to-blue-600',
    condition: (profile, progressMap) => {
      for (const progress of progressMap.values()) {
        if (progress.completedDifficulties?.sandbox && progress.completedDifficulties.sandbox.length > 0) {
          return true
        }
      }
      return false
    },
  },
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Finish one language all 3 ways',
    icon: '🏅',
    color: 'from-orange-500 to-red-600',
    condition: (profile, progressMap) => {
      for (const progress of progressMap.values()) {
        const tutorialDone = progress.tutorialProgress?.completed
        const gameDone = progress.completedDifficulties?.game?.length === 3
        const sandboxDone = progress.completedDifficulties?.sandbox?.length === 3
        if (tutorialDone && gameDone && sandboxDone) return true
      }
      return false
    },
  },
  {
    id: 'legend',
    title: 'Legend',
    description: 'Complete all modules',
    icon: '👑',
    color: 'from-yellow-400 to-yellow-600',
    condition: (profile, progressMap) => {
      let completedModules = 0
      for (const mod of TECHNOLOGY_MODULES) {
        let moduleComplete = false
        for (const language of mod.languages) {
          const languageKey = `${mod.id}-${language.id}`
          const progress = progressMap.get(languageKey)
          if (progress?.tutorialProgress?.completed) {
            moduleComplete = true
            break
          }
        }
        if (moduleComplete) completedModules++
      }
      return completedModules === TECHNOLOGY_MODULES.length
    },
  },
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a streak',
    icon: '🔥',
    color: 'from-red-500 to-orange-600',
    condition: (profile, progressMap) => (profile.streak || 0) >= 3,
  },
  {
    id: 'hard-mode-hero',
    title: 'Hard Mode Hero',
    description: 'Complete hard difficulty challenges',
    icon: '💪',
    color: 'from-red-600 to-pink-600',
    condition: (profile, progressMap) => {
      let hardCount = 0
      for (const progress of progressMap.values()) {
        if (progress.completedDifficulties?.game?.includes('hard')) hardCount++
        if (progress.completedDifficulties?.sandbox?.includes('hard')) hardCount++
      }
      return hardCount >= 3
    },
  },
  {
    id: 'xp-hunter',
    title: 'XP Hunter',
    description: 'Earn 1000 XP',
    icon: '💎',
    color: 'from-purple-500 to-indigo-600',
    condition: (profile, progressMap) => (profile.totalXP || 0) >= 1000,
  },
  {
    id: 'multi-linguist',
    title: 'Multi-Linguist',
    description: 'Complete tutorials in 5 languages',
    icon: '🌍',
    color: 'from-teal-500 to-emerald-600',
    condition: (profile, progressMap) => {
      let completedLanguages = 0
      for (const progress of progressMap.values()) {
        if (progress.tutorialProgress?.completed) completedLanguages++
      }
      return completedLanguages >= 5
    },
  },
]

export default function AchievementsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [languageProgressMap, setLanguageProgressMap] = useState<Map<string, any>>(new Map())
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])

  useEffect(() => {
    const loadData = async () => {
      const userCode = validateSession(() => router.push('/'))
      if (!userCode) {
        return
      }

      try {
        // Load user profile
        const profile = await getUserProfile(userCode)
        if (profile) {
          setUserProfile(profile)
        }

        // Load all language progress
        const progressMap = new Map<string, any>()
        for (const mod of TECHNOLOGY_MODULES) {
          for (const language of mod.languages) {
            const languageKey = `${mod.id}-${language.id}`
            const progress = await getLanguageProgress(userCode, languageKey)
            if (progress) {
              progressMap.set(languageKey, progress)
            }
          }
        }
        setLanguageProgressMap(progressMap)

        // Check which achievements are unlocked
        const unlocked: string[] = []
        for (const achievement of ALL_ACHIEVEMENTS) {
          if (achievement.condition(profile, progressMap)) {
            unlocked.push(achievement.id)
          }
        }
        setUnlockedAchievements(unlocked)
      } catch (error) {
        console.error('Error loading achievements:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-2xl">Loading achievements...</div>
      </div>
    )
  }

  const unlockedCount = unlockedAchievements.length
  const totalCount = ALL_ACHIEVEMENTS.length
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100)

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-blue-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white text-glow mb-4">
            🏆 Achievements
          </h1>
          <p className="text-xl text-white/80 mb-6">
            Unlock badges by completing challenges
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Progress</span>
              <span className="text-white font-bold">
                {unlockedCount} / {totalCount}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ALL_ACHIEVEMENTS.map((achievement, index) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id)

            return (
              <motion.div
                key={achievement.id}
                className={`
                  glass-card p-6 text-center relative overflow-hidden
                  ${isUnlocked ? 'ring-2 ring-yellow-400' : 'opacity-70'}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10`}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`text-6xl mb-4 ${!isUnlocked && 'grayscale'}`}
                    animate={isUnlocked ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {achievement.icon}
                  </motion.div>

                  {/* Lock Overlay */}
                  {!isUnlocked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-6 h-6 text-white/50" />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-yellow-400' : 'text-white/50'}`}>
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm ${isUnlocked ? 'text-white/80' : 'text-white/40'}`}>
                    {achievement.description}
                  </p>

                  {/* Unlocked Badge */}
                  {isUnlocked && (
                    <motion.div
                      className="mt-4 inline-flex items-center space-x-1 bg-yellow-400/20 border border-yellow-400 rounded-full px-3 py-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-xs font-semibold">Unlocked</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Motivational Message */}
        {unlockedCount === 0 && (
          <motion.div
            className="glass-card p-8 mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Start Your Journey!
            </h3>
            <p className="text-white/80">
              Complete tutorials, play games, and experiment in sandboxes to unlock achievements!
            </p>
          </motion.div>
        )}

        {unlockedCount === totalCount && (
          <motion.div
            className="glass-card p-8 mt-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-8xl mb-4">🎊</div>
            <h3 className="text-3xl font-bold text-yellow-400 mb-2">
              Congratulations!
            </h3>
            <p className="text-white/90 text-xl">
              You&apos;ve unlocked all achievements! You&apos;re a learning legend! 👑
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
