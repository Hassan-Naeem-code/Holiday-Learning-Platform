'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Trophy, Flame, TrendingUp, BookOpen, Gamepad2, Code2, Award, TreeDeciduous, Sprout, Leaf, TreePine } from 'lucide-react'
import { validateSession } from '@/utils/sessionManager'
import { getUserProfile, getLanguageProgress, getGlobalCompletedDifficulties, type UserProfile } from '@/lib/firebaseService'
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
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

        {/* Learning Tree Progress Section */}
        {userProfile.treeProgress && userProfile.learningGoal && (
          <motion.div
            className="glass-card p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
              <TreeDeciduous className="w-8 h-8 text-green-400" />
              <span>Learning Tree</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tree Visualization */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  {/* Tree SVG */}
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    className="drop-shadow-xl"
                  >
                    {/* Pot */}
                    <rect
                      x="70"
                      y="160"
                      width="60"
                      height="35"
                      fill="#8B4513"
                      rx="5"
                    />
                    <rect
                      x="65"
                      y="155"
                      width="70"
                      height="10"
                      fill="#A0522D"
                      rx="3"
                    />

                    {/* Trunk */}
                    <motion.rect
                      x="90"
                      y="100"
                      width="20"
                      height="60"
                      fill={userProfile.learningGoal === 'career' ? '#92400E' : userProfile.learningGoal === 'hobby' ? '#BE185D' : '#1E40AF'}
                      rx="3"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      style={{ transformOrigin: 'bottom' }}
                    />

                    {/* Foliage based on stage */}
                    {userProfile.treeProgress.stage === 'seedling' && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <circle
                          cx="100"
                          cy="90"
                          r="15"
                          fill={userProfile.learningGoal === 'career' ? '#059669' : userProfile.learningGoal === 'hobby' ? '#EC4899' : '#3B82F6'}
                        />
                      </motion.g>
                    )}
                    {userProfile.treeProgress.stage === 'sapling' && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <circle
                          cx="100"
                          cy="80"
                          r="30"
                          fill={userProfile.learningGoal === 'career' ? '#059669' : userProfile.learningGoal === 'hobby' ? '#EC4899' : '#3B82F6'}
                        />
                      </motion.g>
                    )}
                    {userProfile.treeProgress.stage === 'growing' && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <circle
                          cx="100"
                          cy="70"
                          r="45"
                          fill={userProfile.learningGoal === 'career' ? '#059669' : userProfile.learningGoal === 'hobby' ? '#EC4899' : '#3B82F6'}
                        />
                      </motion.g>
                    )}
                    {(userProfile.treeProgress.stage === 'mature' || userProfile.treeProgress.stage === 'flourishing') && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <circle
                          cx="100"
                          cy="60"
                          r="55"
                          fill={userProfile.learningGoal === 'career' ? '#059669' : userProfile.learningGoal === 'hobby' ? '#EC4899' : '#3B82F6'}
                        />
                        <circle
                          cx="65"
                          cy="90"
                          r="35"
                          fill={userProfile.learningGoal === 'career' ? '#059669' : userProfile.learningGoal === 'hobby' ? '#EC4899' : '#3B82F6'}
                        />
                        <circle
                          cx="135"
                          cy="90"
                          r="35"
                          fill={userProfile.learningGoal === 'career' ? '#059669' : userProfile.learningGoal === 'hobby' ? '#EC4899' : '#3B82F6'}
                        />
                      </motion.g>
                    )}
                    {userProfile.treeProgress.stage === 'flourishing' && (
                      <motion.g>
                        {/* Flowers/fruits */}
                        <motion.circle
                          cx="75"
                          cy="50"
                          r="8"
                          fill="#FCD34D"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.circle
                          cx="125"
                          cy="45"
                          r="8"
                          fill="#FCD34D"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.circle
                          cx="100"
                          cy="30"
                          r="8"
                          fill="#FCD34D"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                      </motion.g>
                    )}
                  </svg>

                  {/* Glow effect when flourishing */}
                  {userProfile.treeProgress.overallGrowth >= 100 && (
                    <motion.div
                      className="absolute inset-0 -m-4 bg-yellow-400/30 rounded-full blur-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Growth percentage */}
                <motion.div
                  className="text-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className={`text-4xl font-bold ${userProfile.treeProgress.overallGrowth >= 100 ? 'text-yellow-400' : 'text-white'}`}>
                    {Math.floor(userProfile.treeProgress.overallGrowth)}%
                  </p>
                  <p className="text-white/70 capitalize">{userProfile.treeProgress.stage}</p>
                </motion.div>
              </div>

              {/* Tree Info & Stage Progress */}
              <div className="space-y-6">
                {/* Goal Type */}
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    {userProfile.learningGoal === 'career' && <TreePine className="w-6 h-6 text-emerald-400" />}
                    {userProfile.learningGoal === 'hobby' && <Leaf className="w-6 h-6 text-pink-400" />}
                    {userProfile.learningGoal === 'school' && <Sprout className="w-6 h-6 text-blue-400" />}
                    <span className="text-lg font-semibold text-white capitalize">
                      {userProfile.learningGoal === 'career' ? 'Professional Oak' :
                       userProfile.learningGoal === 'hobby' ? 'Creative Cherry' : 'Academic Pine'}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">
                    {userProfile.learningGoal === 'career' && 'Growing strong foundations for your career path'}
                    {userProfile.learningGoal === 'hobby' && 'Nurturing your creative coding journey'}
                    {userProfile.learningGoal === 'school' && 'Building academic excellence in programming'}
                  </p>
                </div>

                {/* Growth Progress Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/70 text-sm">Overall Growth</span>
                    <span className="text-white font-semibold">{Math.floor(userProfile.treeProgress.overallGrowth)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        userProfile.treeProgress.overallGrowth >= 100
                          ? 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400'
                          : 'bg-gradient-to-r from-green-500 to-emerald-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, userProfile.treeProgress.overallGrowth)}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                {/* Stage Timeline */}
                <div>
                  <p className="text-white/70 text-sm mb-3">Growth Stages</p>
                  <div className="flex items-center justify-between">
                    {['seedling', 'sapling', 'growing', 'mature', 'flourishing'].map((stage, index) => {
                      const stages = ['seedling', 'sapling', 'growing', 'mature', 'flourishing']
                      const treeStage = userProfile.treeProgress?.stage ?? 'seedling'
                      const currentIndex = stages.indexOf(treeStage)
                      const isCompleted = index <= currentIndex
                      const isCurrent = stage === treeStage

                      return (
                        <div key={stage} className="flex flex-col items-center">
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                              isCompleted
                                ? isCurrent
                                  ? 'bg-green-500 text-white ring-2 ring-green-300'
                                  : 'bg-green-600 text-white'
                                : 'bg-white/20 text-white/50'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {index + 1}
                          </motion.div>
                          <span className={`text-xs mt-1 capitalize ${isCurrent ? 'text-green-400 font-semibold' : 'text-white/50'}`}>
                            {stage.slice(0, 4)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Next milestone info */}
                {userProfile.treeProgress.overallGrowth < 100 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-300 text-sm">
                      <span className="font-semibold">Keep learning!</span> Complete tutorials, games, and sandbox challenges to grow your tree.
                    </p>
                  </div>
                )}
                {userProfile.treeProgress.overallGrowth >= 100 && (
                  <motion.div
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-yellow-300 text-sm">
                      <span className="font-semibold">Your tree is fully grown!</span> Click the floating tree to celebrate and start a new growth cycle.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

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
