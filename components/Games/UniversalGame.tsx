'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trophy, Heart, Lightbulb, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Language } from '@/utils/techModules'
import { generateProgressiveQuiz, getTotalQuestionsForDifficulty } from '@/utils/progressiveGameContent'
import {
  getLanguageProgress,
  initializeLanguageProgress,
  updateGameProgress,
  addUserXP,
  getUserProfile
} from '@/lib/firebaseService'
import confetti from 'canvas-confetti'
import Certificate from '@/components/Common/Certificate'

interface UniversalGameProps {
  language: Language
  moduleId: string
  languageId: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function UniversalGame({ language, moduleId, languageId, difficulty }: UniversalGameProps) {
  const router = useRouter()
  const [currentLevel, setCurrentLevel] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [hints, setHints] = useState(2)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userCode, setUserCode] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [allCompleted, setAllCompleted] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)

  const languageKey = `${moduleId}-${languageId}`

  // Generate comprehensive quiz
  const quiz = generateProgressiveQuiz(languageId, language.name, difficulty)
  const totalLevels = quiz.questions.length
  const question = quiz.questions[currentLevel]

  // Load progress from Firebase
  useEffect(() => {
    const loadProgress = async () => {
      setIsLoading(true)
      const code = localStorage.getItem('userCode')
      setUserCode(code)

      if (!code) {
        setIsLoading(false)
        return
      }

      try {
        // Get user profile for name
        const profile = await getUserProfile(code)
        if (profile) {
          setUserName(profile.name)
        }

        const progress = await getLanguageProgress(code, languageKey)

        if (progress && progress.difficulty === difficulty) {
          // Resume from saved progress
          setCurrentLevel(progress.gameProgress.currentLevel)
          setCompletedLevels(progress.gameProgress.completedLevels)
          setScore(progress.gameProgress.completedLevels.length * 100)
        } else {
          // Initialize new progress
          const totalQuestions = getTotalQuestionsForDifficulty(difficulty)
          await initializeLanguageProgress(
            code,
            languageKey,
            difficulty,
            50, // Default tutorial sections
            totalQuestions
          )
        }
      } catch (error) {
        console.error('Error loading game progress:', error)
      }

      setIsLoading(false)
    }

    loadProgress()
  }, [languageKey, difficulty])

  // Save progress to Firebase
  const saveProgress = async (newLevel: number, newCompleted: number[], completed: boolean) => {
    if (!userCode) return

    try {
      await updateGameProgress(
        userCode,
        languageKey,
        newLevel,
        newCompleted,
        completed
      )
    } catch (error) {
      console.error('Error saving game progress:', error)
    }
  }

  const handleAnswerSelect = async (index: number) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(index)
    const correct = index === question.correctAnswer

    setIsCorrect(correct)
    setShowExplanation(true)

    if (correct) {
      // Correct answer
      setScore(score + 100)

      // Mark level as completed if not already
      if (!completedLevels.includes(currentLevel)) {
        const newCompleted = [...completedLevels, currentLevel].sort((a, b) => a - b)
        setCompletedLevels(newCompleted)

        // Award XP
        if (userCode) {
          await addUserXP(userCode, 20) // 20 XP per level
        }

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        })

        // Check if all levels complete
        const isFullyCompleted = newCompleted.length === totalLevels

        if (isFullyCompleted) {
          setAllCompleted(true)

          // Bonus XP for completing all levels
          if (userCode) {
            await addUserXP(userCode, 300) // 300 XP bonus
          }

          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
          })

          // Show certificate after 2 seconds
          setTimeout(() => {
            setShowCertificate(true)
          }, 2000)
        }

        // Save progress
        const nextLevel = currentLevel < totalLevels - 1 ? currentLevel + 1 : currentLevel
        await saveProgress(nextLevel, newCompleted, isFullyCompleted)
      }
    } else {
      // Wrong answer
      setLives(lives - 1)

      if (lives - 1 === 0) {
        // Game over - restart level
        setTimeout(() => {
          setLives(3)
          setHints(2)
          setSelectedAnswer(null)
          setShowExplanation(false)
          setIsCorrect(false)
        }, 2000)
      }
    }
  }

  const handleNext = () => {
    if (currentLevel < totalLevels - 1) {
      const nextLevel = currentLevel + 1
      setCurrentLevel(nextLevel)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setIsCorrect(false)
      setLives(3)
      setHints(2)

      // Save progress
      saveProgress(nextLevel, completedLevels, false)
    }
  }

  const handleUseHint = () => {
    if (hints > 0 && selectedAnswer === null) {
      setHints(hints - 1)
      const correctIndex = question.correctAnswer
      const wrongIndex = correctIndex === 0 ? 1 : 0
      alert(`Hint: Option ${String.fromCharCode(65 + wrongIndex)} is NOT the correct answer!`)
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'from-green-500 to-emerald-600'
      case 'medium':
        return 'from-yellow-500 to-orange-600'
      case 'hard':
        return 'from-red-500 to-pink-600'
    }
  }

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case 'easy':
        return 'Easy - Beginner'
      case 'medium':
        return 'Medium - Intermediate'
      case 'hard':
        return 'Hard - Advanced'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <div className="text-white text-2xl font-bold">Loading your game progress...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 pb-20">
      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8 flex-wrap gap-2 md:gap-4">
          <motion.button
            onClick={() => router.push(`/module/${moduleId}`)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-1 md:gap-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Back to {language.name}</span>
            <span className="sm:hidden">Back</span>
          </motion.button>

          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 flex-wrap">
            {/* Lives */}
            <div className="flex items-center gap-1 sm:gap-2 bg-red-500/20 backdrop-blur-lg rounded-xl px-2 sm:px-3 md:px-4 py-1.5 md:py-2">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
                />
              ))}
            </div>

            {/* Hints */}
            <button
              onClick={handleUseHint}
              disabled={hints === 0 || selectedAnswer !== null}
              className="flex items-center gap-1 sm:gap-2 bg-yellow-500/20 backdrop-blur-lg rounded-xl px-2 sm:px-3 md:px-4 py-1.5 md:py-2 text-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base"
            >
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span className="hidden sm:inline">{hints} Hints</span>
              <span className="sm:hidden">{hints}</span>
            </button>

            {/* Score */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl px-2 sm:px-4 md:px-6 py-1.5 md:py-2">
              <p className="text-white font-bold text-sm sm:text-base md:text-xl">Score: {score}</p>
            </div>
          </div>
        </div>

        {/* Game Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-8"
        >
          <div className="text-4xl sm:text-5xl md:text-6xl mb-3 md:mb-4">{language.icon}</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 px-2">
            {language.name} Quiz Challenge
          </h1>
          <div className={`inline-block bg-gradient-to-r ${getDifficultyColor()} px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-bold text-white mb-3 md:mb-4`}>
            {getDifficultyLabel()}
          </div>
          <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl px-4">
            Master the entire language through {totalLevels} progressive challenges!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-4 md:mb-8">
          <div className="flex items-center justify-between mb-2 text-xs sm:text-sm md:text-base">
            <p className="text-white font-semibold">
              Level {currentLevel + 1} of {totalLevels}
            </p>
            <p className="text-white/70">
              {completedLevels.length} / {totalLevels} completed
            </p>
          </div>
          <div className="h-2 md:h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${(completedLevels.length / totalLevels) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl mb-4 md:mb-6">
            {/* Topic Badge */}
            <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-2">
              <div className="bg-purple-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                <span className="text-purple-700 font-semibold text-xs sm:text-sm">📚 {question.topic}</span>
              </div>
              {completedLevels.includes(currentLevel) && (
                <div className="bg-green-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-1.5 md:gap-2">
                  <Check className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs sm:text-sm font-bold">Completed</span>
                </div>
              )}
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 md:mb-8">
              {question.question}
            </h2>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  className={`w-full p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl font-semibold text-left transition-all text-sm sm:text-base ${
                    selectedAnswer === null
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      : selectedAnswer === index
                      ? index === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-800 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm sm:text-base">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`max-w-4xl mx-auto rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 ${
                  isCorrect
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-red-500/20 border-2 border-red-500'
                }`}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  {isCorrect ? '✅ Correct! Great job!' : '❌ Not quite right'}
                </h3>
                <p className="text-white/90 text-sm sm:text-base md:text-lg mb-3 md:mb-4">{question.explanation}</p>
                {isCorrect && !completedLevels.includes(currentLevel) && (
                  <p className="text-white font-semibold text-sm sm:text-base">
                    +20 XP Earned!
                  </p>
                )}
                <button
                  onClick={handleNext}
                  disabled={currentLevel >= totalLevels - 1}
                  className="mt-3 md:mt-4 bg-white text-gray-800 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  {currentLevel < totalLevels - 1 ? 'Next Level' : 'Completed!'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* All Completed Screen */}
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center shadow-2xl max-w-md mx-4">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-white mb-4 sm:mb-5 md:mb-6" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                🎉 Amazing!
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-4">
                You completed all {totalLevels} levels of {language.name} at {getDifficultyLabel()}!
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-4 sm:mb-5 md:mb-6">
                +300 XP Bonus!
              </p>
              <button
                onClick={() => router.push(`/module/${moduleId}`)}
                className="bg-white text-orange-600 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl font-bold hover:shadow-xl transition-all text-sm sm:text-base"
              >
                Back to Module
              </button>
            </div>
          </motion.div>
        )}

        {/* Certificate Modal */}
        <AnimatePresence>
          {showCertificate && userName && (
            <Certificate
              userName={userName}
              languageName={language.name}
              difficulty={difficulty}
              type="game"
              onClose={() => setShowCertificate(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
