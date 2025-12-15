'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Code2, Play, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Tutorial, getTotalSectionsForDifficulty } from '@/utils/progressiveTutorialContent'
import { Language } from '@/utils/techModules'
import {
  getLanguageProgress,
  initializeLanguageProgress,
  updateTutorialProgress,
  addUserXP,
  getUserProfile
} from '@/lib/firebaseService'
import confetti from 'canvas-confetti'
import Certificate from '@/components/Common/Certificate'

interface InteractiveTutorialProps {
  tutorial: Tutorial
  language: Language
  moduleId: string
  languageId: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function InteractiveTutorial({
  tutorial,
  language,
  moduleId,
  languageId,
  difficulty,
}: InteractiveTutorialProps) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const [sandboxCode, setSandboxCode] = useState('')
  const [sandboxOutput, setSandboxOutput] = useState('')
  const [showCelebration, setShowCelebration] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userCode, setUserCode] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('')
  const [showCertificate, setShowCertificate] = useState(false)

  const languageKey = `${moduleId}-${languageId}`
  const sections = tutorial.sections ?? []
  const totalSections = sections.length
  const clampedIndex = Math.min(Math.max(currentSection, 0), Math.max(totalSections - 1, 0))
  const section = sections[clampedIndex]
  const isLastSection = totalSections > 0 ? clampedIndex === totalSections - 1 : true
  const allCompleted = totalSections > 0 ? completedSections.length === totalSections : false

  // Load user progress from Firebase on mount
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

        // Get saved progress for this language
        const progress = await getLanguageProgress(code, languageKey)

        if (progress && progress.difficulty === difficulty) {
          // Resume from saved progress
          setCurrentSection(progress.tutorialProgress.currentSection)
          setCompletedSections(progress.tutorialProgress.completedSections)
        } else {
          // Initialize new progress for this difficulty
          const totalSections = getTotalSectionsForDifficulty(difficulty)
          await initializeLanguageProgress(
            code,
            languageKey,
            difficulty,
            totalSections,
            10 // Default game levels - will be updated by game component
          )
        }
      } catch (error) {
        console.error('Error loading progress:', error)
      }

      setIsLoading(false)
    }

    loadProgress()
  }, [languageKey, difficulty])

  // Clamp current section to available sections
  useEffect(() => {
    if (totalSections === 0) return
    if (currentSection !== clampedIndex) {
      setCurrentSection(clampedIndex)
    }
  }, [totalSections, clampedIndex, currentSection])

  // Update Firebase whenever progress changes
  const saveProgress = async (newSection: number, newCompleted: number[], completed: boolean) => {
    if (!userCode) return

    try {
      await updateTutorialProgress(
        userCode,
        languageKey,
        newSection,
        newCompleted,
        completed
      )
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  // Update sandbox code when section changes
  useEffect(() => {
    if (section?.codeExample) {
      setSandboxCode(section.codeExample.replace(/\\n/g, '\n'))
    } else {
      setSandboxCode('')
    }
  }, [section, clampedIndex, currentSection])

  const handleNext = () => {
    if (!isLastSection) {
      const nextSection = clampedIndex + 1
      setCurrentSection(nextSection)
      saveProgress(nextSection, completedSections, false)
    }
  }

  const handlePrevious = () => {
    if (clampedIndex > 0) {
      const prevSection = clampedIndex - 1
      setCurrentSection(prevSection)
      saveProgress(prevSection, completedSections, false)
    }
  }

  const handleCompleteSection = async () => {
    if (!completedSections.includes(currentSection)) {
      const newCompleted = [...completedSections, currentSection].sort((a, b) => a - b)
      setCompletedSections(newCompleted)

      // Award XP for section completion
      if (userCode) {
        await addUserXP(userCode, 50) // 50 XP per section
      }

      // Check if all sections are complete
      const isFullyCompleted = totalSections > 0 && newCompleted.length === totalSections

      if (isFullyCompleted) {
        setShowCelebration(true)

        // Award bonus XP for completing entire tutorial
        if (userCode) {
          await addUserXP(userCode, 500) // 500 XP bonus
        }

        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        })

        setTimeout(() => {
          setShowCelebration(false)
          // Show certificate after celebration
          setShowCertificate(true)
        }, 4000)
      }

      // Save progress to Firebase
      const nextSection = !isLastSection ? clampedIndex + 1 : clampedIndex
      await saveProgress(nextSection, newCompleted, isFullyCompleted)

      // Move to next section if not last
      if (!isLastSection) {
        setCurrentSection(nextSection)
      }
    } else {
      // Already completed, just move to next
      if (!isLastSection) {
        handleNext()
      }
    }
  }

  const handleRunCode = async () => {
    // Simulated code execution
    setSandboxOutput(`// Code executed!\n// Output: Code ran successfully!\n// This is a simulation - the actual code execution would depend on the language.`)

    // Award XP for running code
    if (userCode) {
      await addUserXP(userCode, 10) // 10 XP for experimenting
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-white text-2xl font-bold">Loading your progress...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pb-20">
      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-white mb-4 sm:mb-5 md:mb-6" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-4">
                You completed the {language.name} tutorial at {getDifficultyLabel()} level!
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/80">
                +500 XP Bonus!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-white/10 backdrop-blur-lg rounded-xl px-3 sm:px-4 md:px-6 py-2 md:py-3">
            <div className="text-2xl sm:text-3xl md:text-4xl">{language.icon}</div>
            <div>
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">{language.name} Tutorial</h1>
              <div className={`inline-block bg-gradient-to-r ${getDifficultyColor()} px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold text-white`}>
                {getDifficultyLabel()}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 md:mb-8">
          <div className="flex items-center justify-between mb-2 text-xs sm:text-sm md:text-base">
              <p className="text-white font-semibold">
                Section {clampedIndex + 1} of {totalSections || 1}
            </p>
              <p className="text-white/70">
                {completedSections.length} / {totalSections || 1} completed
            </p>
          </div>
          <div className="h-2 md:h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              initial={{ width: 0 }}
              animate={{
                  width: `${totalSections > 0 ? (completedSections.length / totalSections) * 100 : 0}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* Tutorial Content */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-white/95 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                {section?.title ?? 'Tutorial Section'}
              </h2>
              {completedSections.includes(currentSection) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-green-500 text-white p-2 md:p-3 rounded-full flex-shrink-0"
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.div>
              )}
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                  {section?.content ?? 'Content will appear here.'}
                </p>
              </div>

              {section?.syntax && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Syntax:</h3>
                  <code className="text-blue-700 font-mono text-xs sm:text-sm">{section?.syntax}</code>
                </div>
              )}

              {section?.usage && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-3 md:p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Usage:</h3>
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base">{section?.usage}</p>
                </div>
              )}

              {section?.codeExample && (
                <div className="bg-gray-900 rounded-xl p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white flex items-center gap-1 md:gap-2 text-sm md:text-base">
                      <Code2 className="w-4 h-4 md:w-5 md:h-5" />
                      Code Example
                    </h3>
                  </div>
                  <pre className="text-green-400 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap">
                    {section?.codeExample?.replace(/\\n/g, '\n')}
                  </pre>
                </div>
              )}

              {section?.practiceTask && (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded">
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">Practice Task:</h3>
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base">{section?.practiceTask}</p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="flex items-center gap-1 md:gap-2 px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <button
                onClick={handleCompleteSection}
                className="flex items-center gap-1 md:gap-2 px-3 sm:px-5 md:px-8 py-2 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all text-xs sm:text-sm md:text-base"
              >
                {completedSections.includes(currentSection) ? (
                  <>
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Completed</span>
                    <span className="sm:hidden">Done</span>
                  </>
                ) : (
                  <>
                    <span className="hidden md:inline">Complete & Earn 50 XP</span>
                    <span className="hidden sm:inline md:hidden">Complete +50 XP</span>
                    <span className="sm:hidden">Complete</span>
                  </>
                )}
                {!isLastSection && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Interactive Sandbox */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-1 md:gap-2">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
              Try It Yourself
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Code Editor
                </label>
                <textarea
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  className="w-full h-48 sm:h-56 md:h-64 bg-gray-900 text-green-400 font-mono text-xs sm:text-sm p-3 md:p-4 rounded-xl border-2 border-gray-700 focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="Write your code here..."
                />
              </div>

              <button
                onClick={handleRunCode}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                Run Code (+10 XP)
              </button>

              {sandboxOutput && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Output
                  </label>
                  <div className="bg-gray-900 text-gray-300 font-mono text-xs sm:text-sm p-3 md:p-4 rounded-xl min-h-32 whitespace-pre-wrap">
                    {sandboxOutput}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 sm:mt-5 md:mt-6 bg-blue-50 border border-blue-200 rounded-xl p-3 md:p-4">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>💡 Tip:</strong> Try modifying the code example above to see what happens!
                Experiment and learn by doing.
              </p>
            </div>
          </div>
        </div>

        {/* All Completed Message */}
        {allCompleted && !showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 md:mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-center text-white"
          >
            <Trophy className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4" />
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2">Tutorial Complete! 🎉</h3>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6">
              You&apos;ve mastered {language.name} at the {getDifficultyLabel()} level!
            </p>
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-wrap">
              <button
                onClick={() => router.push(`/game/${moduleId}-${languageId}?difficulty=${difficulty}`)}
                className="bg-white text-green-600 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl font-bold hover:shadow-xl transition-all text-xs sm:text-sm md:text-base"
              >
                Play Game Next
              </button>
              <button
                onClick={() => router.push(`/sandbox/${moduleId}-${languageId}`)}
                className="bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl font-bold hover:bg-white/30 transition-all text-xs sm:text-sm md:text-base"
              >
                Open Sandbox
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
              type="tutorial"
              onClose={() => setShowCertificate(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
