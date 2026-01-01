'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Trophy, Flame, TrendingUp, BookOpen, Gamepad2, Code2, Award } from 'lucide-react'
import { validateSession } from '@/utils/sessionManager'
import { getUserProfile, getLanguageProgress, getGlobalCompletedDifficulties } from '@/lib/firebaseService'
import { TECHNOLOGY_MODULES } from '@/utils/techModules'
import Certificate from '@/components/Common/Certificate'

interface LanguageProgressData {
  tutorialProgress: number
  gameProgress: number
  sandboxProgress: number
  completedDifficulties: ('easy' | 'medium' | 'hard')[]
  languageName: string
  moduleName: string
}

export default function ProgressPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [languageProgressMap, setLanguageProgressMap] = useState<Map<string, LanguageProgressData>>(new Map())
  const [activeCertificate, setActiveCertificate] = useState<{ language: string; difficulty: 'easy' | 'medium' | 'hard' } | null>(null)

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
        const progressMap = new Map<string, LanguageProgressData>()
        for (const mod of TECHNOLOGY_MODULES) {
          for (const language of mod.languages) {
            const languageKey = `${mod.id}-${language.id}`
            const progress = await getLanguageProgress(userCode, languageKey)
            const completedDiffs = progress?.completedDifficulties
            const globalCompleted = getGlobalCompletedDifficulties(completedDiffs)
            const sharedProgress = globalCompleted.length > 0 ? Math.round((globalCompleted.length / 3) * 100) : 0

            progressMap.set(languageKey, {
              tutorialProgress: progress?.tutorialProgress?.completed
                ? 100
                : Math.round(((progress?.tutorialProgress?.completedSections?.length || 0) / (progress?.tutorialProgress?.totalSections || 1)) * 100),
              gameProgress: sharedProgress,
              sandboxProgress: sharedProgress,
              completedDifficulties: globalCompleted,
              languageName: language.name,
              moduleName: mod.name,
            })
          }
        }
        setLanguageProgressMap(progressMap)
      } catch (error) {
        console.error('Error loading progress data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-2xl">Loading your progress...</div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-2xl">No data found</div>
      </div>
    )
  }

  // Calculate overall statistics
  const allLanguageProgress = Array.from(languageProgressMap.values())
  const avgOverallProgress = allLanguageProgress.length > 0
    ? Math.round(
        allLanguageProgress.reduce((sum, p) => sum + (p.tutorialProgress + p.gameProgress + p.sandboxProgress) / 3, 0) /
          allLanguageProgress.length
      )
    : 0
  const certificateUserName = userProfile?.name || 'Learner'

  return (
    <>
      <div className="min-h-screen pb-20 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-blue-dark">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white text-glow mb-4">
            📊 Your Progress
          </h1>
          <p className="text-xl text-white/80">
            Track your learning journey across all topics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              Lv.{userProfile.level}
            </div>
            <div className="text-white/70 text-sm">Your Level</div>
          </motion.div>

          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-400 mb-2">
              {userProfile.totalXP}
            </div>
            <div className="text-white/70 text-sm">Total XP</div>
          </motion.div>

          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Flame className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-400 mb-2">
              {userProfile.streak}
            </div>
            <div className="text-white/70 text-sm">Day Streak</div>
          </motion.div>

          <motion.div
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-green-400 mb-2">
              {avgOverallProgress}%
            </div>
            <div className="text-white/70 text-sm">Overall Progress</div>
          </motion.div>
        </div>

        {/* Language Progress */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
            <span>📚</span>
            <span>Language Progress</span>
          </h2>

          <div className="space-y-8">
            {TECHNOLOGY_MODULES.map((mod, moduleIdx) => (
              <div key={mod.id}>
                <motion.h3
                  className="text-2xl font-bold text-white mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: moduleIdx * 0.1 }}
                >
                  <span>{mod.icon}</span>
                  {mod.name}
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mod.languages.map((language, langIdx) => {
                    const languageKey = `${mod.id}-${language.id}`
                    const progress = languageProgressMap.get(languageKey) || {
                      tutorialProgress: 0,
                      gameProgress: 0,
                      sandboxProgress: 0,
                      completedDifficulties: [],
                      languageName: language.name,
                      moduleName: mod.name,
                    }
                    const avgProgress = Math.round(
                      (progress.tutorialProgress + progress.gameProgress + progress.sandboxProgress) / 3
                    )

                    return (
                      <motion.div
                        key={languageKey}
                        className="bg-white/10 rounded-xl p-6 border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: moduleIdx * 0.1 + langIdx * 0.05 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl">{language.icon}</span>
                          <div>
                            <h4 className="text-lg font-bold text-white">{language.name}</h4>
                            <p className="text-sm text-white/60">Avg: {avgProgress}%</p>
                          </div>
                        </div>

                        {/* Tutorial Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                              <BookOpen className="w-4 h-4" />
                              Tutorial
                            </div>
                            <span className="text-white font-semibold text-sm">{progress.tutorialProgress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              className="bg-blue-500 h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.tutorialProgress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        {/* Game Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                              <Gamepad2 className="w-4 h-4" />
                              Game
                            </div>
                            <span className="text-white font-semibold text-sm">{progress.gameProgress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              className="bg-green-500 h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.gameProgress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        {/* Sandbox Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                              <Code2 className="w-4 h-4" />
                              Sandbox
                            </div>
                            <span className="text-white font-semibold text-sm">{progress.sandboxProgress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              className="bg-purple-500 h-full rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress.sandboxProgress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        {progress.completedDifficulties.length === 3 && (
                          <div className="mt-3 bg-white/10 border border-white/20 rounded-xl p-2.5">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2 text-green-100 text-xs font-semibold">
                                <Award className="w-4 h-4" />
                                Certificates ready
                              </div>
                              <span className="text-xs text-green-100/80">Easy · Medium · Hard</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                                <button
                                  key={diff}
                                  onClick={() => setActiveCertificate({ language: language.name, difficulty: diff })}
                                  className="px-3 py-1.5 bg-green-500/20 text-green-100 rounded-full text-xs font-semibold hover:bg-green-500/30 transition-colors"
                                >
                                  View {diff.charAt(0).toUpperCase() + diff.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      <AnimatePresence>
        {activeCertificate && (
          <Certificate
            userName={certificateUserName}
            languageName={activeCertificate.language}
            difficulty={activeCertificate.difficulty}
            type="game"
            onClose={() => setActiveCertificate(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
