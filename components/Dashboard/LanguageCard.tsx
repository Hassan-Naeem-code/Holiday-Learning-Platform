'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Language } from '@/utils/techModules'
import { BookOpen, Gamepad2, Code2, CheckCircle2, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DifficultySelector from '../Common/DifficultySelector'
import { getLanguageProgress, getGlobalCompletedDifficulties, getUserProfile } from '@/lib/firebaseService'
import { getSession } from '@/utils/sessionManager'
import Certificate from '@/components/Common/Certificate'

interface LanguageCardProps {
  language: Language
  moduleId: string
  index: number
}

export default function LanguageCard({ language, moduleId, index }: LanguageCardProps) {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [showDifficultySelector, setShowDifficultySelector] = useState(false)
  const [selectedType, setSelectedType] = useState<'tutorial' | 'game' | 'sandbox' | null>(null)
  const [tutorialProgress, setTutorialProgress] = useState<number>(0)
  const [gameProgress, setGameProgress] = useState<number>(0)
  const [savedDifficulty, setSavedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null)
  const [sandboxCompleted, setSandboxCompleted] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [tutorialCompleted, setTutorialCompleted] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const [completedDifficulties, setCompletedDifficulties] = useState<{
    sandbox?: ('easy' | 'medium' | 'hard')[]
    game?: ('easy' | 'medium' | 'hard')[]
    tutorial?: ('easy' | 'medium' | 'hard')[]
  } | null>(null)
  const [certificateDifficulty, setCertificateDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null)
  const router = useRouter()

  const languageKey = `${moduleId}-${language.id}`

  // Load progress from Firebase
  useEffect(() => {
    const loadProgress = async () => {
      const userCode = getSession()
      if (!userCode) return

      try {
        const profile = await getUserProfile(userCode)
        if (profile?.name) {
          setUserName(profile.name)
        }

        const progress = await getLanguageProgress(userCode, languageKey)
        if (progress) {
          setSavedDifficulty(progress.difficulty)

          // Calculate tutorial progress percentage
          const tutorialPercent = progress.tutorialProgress.totalSections > 0
            ? Math.round((progress.tutorialProgress.completedSections.length / progress.tutorialProgress.totalSections) * 100)
            : 0
          setTutorialProgress(tutorialPercent)

          // Calculate game progress percentage
          const gamePercent = progress.gameProgress.totalLevels > 0
            ? Math.round((progress.gameProgress.completedLevels.length / progress.gameProgress.totalLevels) * 100)
            : 0
          setGameProgress(gamePercent)

          // Check if all difficulties are completed
          const completedDiffs = progress.completedDifficulties
          if (completedDiffs) {
            setCompletedDifficulties(completedDiffs)
            
            // Get global completed difficulties (game and sandbox share completion)
            const globalCompleted = getGlobalCompletedDifficulties(completedDiffs)
            const allDifficultiesComplete = globalCompleted.length === 3
            
            // Both sandbox and game are complete when all 3 difficulties are done globally
            setSandboxCompleted(allDifficultiesComplete)
            setGameCompleted(allDifficultiesComplete)
            
            // Check tutorial completion (separate tracking)
            setTutorialCompleted(completedDiffs.tutorial?.length === 3)
          }
        }
      } catch (error) {
        console.error('Error loading language progress:', error)
      }
    }

    loadProgress()
  }, [languageKey])

  const getDifficultyColor = () => {
    switch (language.difficulty) {
      case 'beginner':
        return 'bg-green-500'
      case 'intermediate':
        return 'bg-yellow-500'
      case 'advanced':
        return 'bg-red-500'
    }
  }

  // Get the current learning level based on completed difficulties
  const getCurrentLearningLevel = () => {
    if (!completedDifficulties) return { level: 'Easy', color: 'bg-green-500' }
    
    // Get global completed difficulties (game and sandbox share completion)
    const globalCompleted = getGlobalCompletedDifficulties(completedDifficulties)
    
    // Check which difficulties have been completed
    const hasEasy = globalCompleted.includes('easy')
    const hasMedium = globalCompleted.includes('medium')
    const hasHard = globalCompleted.includes('hard')
    
    // Determine current learning level
    if (hasMedium && !hasHard) {
      return { level: 'Hard', color: 'bg-red-500' }
    } else if (hasEasy && !hasMedium) {
      return { level: 'Medium', color: 'bg-yellow-500' }
    } else {
      return { level: 'Easy', color: 'bg-green-500' }
    }
  }

  const handleOptionClick = (type: 'tutorial' | 'game' | 'sandbox') => {
    // Prevent navigating into completed flows
    if (type === 'sandbox' && sandboxCompleted) return
    if (type === 'game' && gameCompleted) return
    if (type === 'tutorial' && tutorialCompleted) return

    if (type === 'tutorial') {
      // Tutorials open directly without difficulty selection
      router.push(`/tutorial/${moduleId}-${language.id}`)
      return
    }

    // Sandbox and games need difficulty selection
    setSelectedType(type)
    setShowDifficultySelector(true)
  }

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (selectedType) {
      // Navigate with difficulty parameter for sandbox and game
      router.push(`/${selectedType}/${moduleId}-${language.id}?difficulty=${difficulty}`)
    }
    setShowDifficultySelector(false)
  }

  const handleCloseSelector = () => {
    setShowDifficultySelector(false)
    setSelectedType(null)
  }

  const hasProgress = tutorialProgress > 0 || gameProgress > 0
  const globalCompleted = completedDifficulties ? getGlobalCompletedDifficulties(completedDifficulties) : []
  const allDifficultiesComplete = globalCompleted.length === 3

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
      >
        {/* Header */}
        <div
          className="p-6 text-white relative overflow-hidden"
          style={{ backgroundColor: language.color }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <motion.div
                className="text-5xl"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {language.icon}
              </motion.div>
              <div className="flex flex-col gap-2 items-end">
                <div className={`${getDifficultyColor()} px-3 py-1 rounded-full text-xs font-bold text-white uppercase`}>
                  {language.difficulty}
                </div>
                {(savedDifficulty || completedDifficulties) && (
                  <div className={`${getCurrentLearningLevel().color} px-3 py-1 rounded-full text-xs font-bold text-white`}>
                    Learning: {getCurrentLearningLevel().level}
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-2">{language.name}</h3>
            <p className="text-white/90 text-sm">{language.description}</p>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white), linear-gradient(45deg, white 25%, transparent 25%, transparent 75%, white 75%, white)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
            }} />
          </div>
        </div>

        {/* Progress Indicators - Only show if user has progress */}
        {hasProgress && (
          <div className="px-6 pt-4 pb-2 bg-gray-50 border-b border-gray-200">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
              Your Progress:
            </p>

            {tutorialProgress > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Tutorial
                  </span>
                  <span className="text-sm font-bold text-blue-600">{tutorialProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${tutorialProgress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>
            )}

            {gameProgress > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Gamepad2 className="w-4 h-4" />
                    Game
                  </span>
                  <span className="text-sm font-bold text-green-600">{gameProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${gameProgress}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {allDifficultiesComplete && (
          <div className="px-6 pb-4 bg-gray-50 border-b border-gray-200">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-green-800 text-sm font-semibold">
                  <Award className="w-4 h-4" />
                  Certificates ready
                </div>
                <span className="text-xs text-green-700">All levels completed</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setCertificateDifficulty(diff)}
                    className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors"
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)} Certificate
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Learning Options */}
        <div className="p-6">
          <p className="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wide">
            Choose Your Learning Path:
          </p>

          <div className="space-y-3">
            {/* Tutorial Option */}
            <motion.button
              onHoverStart={() => !tutorialCompleted && setHoveredOption('tutorial')}
              onHoverEnd={() => setHoveredOption(null)}
              onClick={() => handleOptionClick('tutorial')}
              whileHover={tutorialCompleted ? {} : { scale: 1.02, x: 5 }}
              whileTap={tutorialCompleted ? {} : { scale: 0.98 }}
              disabled={tutorialCompleted}
              className={`w-full rounded-xl p-4 flex items-center gap-4 shadow-md transition-all ${
                tutorialCompleted
                  ? 'bg-gray-300 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
              }`}
            >
              <motion.div
                animate={hoveredOption === 'tutorial' && !tutorialCompleted ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {tutorialCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <BookOpen className="w-6 h-6" />
                )}
              </motion.div>
              <div className="flex-1 text-left">
                <p className={`font-bold text-lg ${tutorialCompleted ? 'text-gray-600' : ''}`}>
                  Tutorial
                  {tutorialCompleted ? (
                    <span className="ml-2 text-sm text-green-600 font-bold">✓ All Levels Mastered</span>
                  ) : tutorialProgress > 0 ? (
                    <span className="ml-2 text-sm">({tutorialProgress}%)</span>
                  ) : null}
                </p>
                <p className={`text-sm ${tutorialCompleted ? 'text-gray-500' : 'text-blue-100'}`}>
                  {tutorialCompleted ? 'Completed all difficulties' : 'Learn from basics to advanced'}
                </p>
              </div>
              {!tutorialCompleted && (
                <motion.div
                  animate={hoveredOption === 'tutorial' ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              )}
            </motion.button>

            {/* Game Option */}
            <motion.button
              onHoverStart={() => !gameCompleted && setHoveredOption('game')}
              onHoverEnd={() => setHoveredOption(null)}
              onClick={() => handleOptionClick('game')}
              whileHover={gameCompleted ? {} : { scale: 1.02, x: 5 }}
              whileTap={gameCompleted ? {} : { scale: 0.98 }}
              disabled={gameCompleted}
              className={`w-full rounded-xl p-4 flex items-center gap-4 shadow-md transition-all ${
                gameCompleted
                  ? 'bg-gray-300 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
              }`}
            >
              <motion.div
                animate={hoveredOption === 'game' && !gameCompleted ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {gameCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Gamepad2 className="w-6 h-6" />
                )}
              </motion.div>
              <div className="flex-1 text-left">
                <p className={`font-bold text-lg ${gameCompleted ? 'text-gray-600' : ''}`}>
                  Play Game
                  {gameCompleted ? (
                    <span className="ml-2 text-sm text-green-600 font-bold">✓ All Levels Mastered</span>
                  ) : gameProgress > 0 ? (
                    <span className="ml-2 text-sm">({gameProgress}%)</span>
                  ) : null}
                </p>
                <p className={`text-sm ${gameCompleted ? 'text-gray-500' : 'text-green-100'}`}>
                  {gameCompleted
                    ? 'Completed all difficulties'
                    : 'Play quiz levels — score 75%+ to earn your certificate'}
                </p>
              </div>
              {!gameCompleted && (
                <motion.div
                  animate={hoveredOption === 'game' ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              )}
            </motion.button>

            {/* Sandbox Option */}
            <motion.button
              onHoverStart={() => !sandboxCompleted && setHoveredOption('sandbox')}
              onHoverEnd={() => setHoveredOption(null)}
              onClick={() => handleOptionClick('sandbox')}
              whileHover={sandboxCompleted ? {} : { scale: 1.02, x: 5 }}
              whileTap={sandboxCompleted ? {} : { scale: 0.98 }}
              disabled={sandboxCompleted}
              className={`w-full rounded-xl p-4 flex items-center gap-4 shadow-md transition-all ${
                sandboxCompleted
                  ? 'bg-gray-300 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:shadow-lg'
              }`}
            >
              <motion.div
                animate={hoveredOption === 'sandbox' && !sandboxCompleted ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {sandboxCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Code2 className="w-6 h-6" />
                )}
              </motion.div>
              <div className="flex-1 text-left">
                <p className={`font-bold text-lg ${sandboxCompleted ? 'text-gray-600' : ''}`}>
                  Sandbox
                  {sandboxCompleted && (
                    <span className="ml-2 text-sm text-green-600 font-bold">✓ All Levels Mastered</span>
                  )}
                </p>
                <p className={`text-sm ${sandboxCompleted ? 'text-gray-500' : 'text-purple-100'}`}>
                  {sandboxCompleted
                    ? 'Completed all difficulties'
                    : 'Code exercises — hit 75%+ passing to unlock your certificate'}
                </p>
              </div>
              {!sandboxCompleted && (
                <motion.div
                  animate={hoveredOption === 'sandbox' ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Selector Modal */}
      {showDifficultySelector && selectedType && (
        <DifficultySelector
          languageName={language.name}
          type={selectedType}
          onSelectDifficulty={handleDifficultySelect}
          onClose={handleCloseSelector}
          completedDifficulties={getGlobalCompletedDifficulties(completedDifficulties || undefined)}
        />
      )}

      <AnimatePresence>
        {certificateDifficulty && (
          <Certificate
            userName={userName || 'Learner'}
            languageName={language.name}
            difficulty={certificateDifficulty}
            type="game"
            onClose={() => setCertificateDifficulty(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
