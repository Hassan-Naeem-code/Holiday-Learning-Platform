'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookmarkPlus, BookmarkCheck, Home } from 'lucide-react'
import Link from 'next/link'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useUserStore } from '@/stores/userStore'
import { achievementManager } from '@/utils/achievementManager'

export interface TutorialSection {
  id: number
  title: string
  content: React.ReactNode
  estimatedTime?: string
}

interface TutorialPlayerProps {
  tutorialId: string
  title: string
  icon: string
  sections: TutorialSection[]
  onComplete?: (quizScore: number) => void
}

export default function TutorialPlayer({
  tutorialId,
  title,
  icon,
  sections,
  onComplete,
}: TutorialPlayerProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const [direction, setDirection] = useState(0)

  const { updateTutorialProgress, updateTopicProgress } = useTutorialStore()
  const { addXP } = useUserStore()

  // Update progress when section changes
  useEffect(() => {
    updateTutorialProgress(tutorialId, currentSection + 1, sections.length)

    // If completed all sections
    if (currentSection === sections.length - 1) {
      // Extract topic ID from tutorial ID (e.g., 'software-dev-tutorial' -> 'software-dev')
      const topicId = tutorialId.replace('-tutorial', '')
      updateTopicProgress(topicId, 'tutorial', 100)

      // Award XP
      addXP(50)

      // Check for achievements
      setTimeout(() => {
        achievementManager.checkAll()
      }, 1000)
    }
  }, [currentSection, tutorialId, sections.length, updateTutorialProgress, updateTopicProgress, addXP])

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setDirection(1)
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setDirection(-1)
      setCurrentSection(currentSection - 1)
    }
  }

  const progress = ((currentSection + 1) / sections.length) * 100

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <motion.button
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-5 h-5 text-white" />
                </motion.button>
              </Link>
              <span className="text-5xl">{icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-white/70 text-sm">
                  Section {currentSection + 1} of {sections.length}
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => setBookmarked(!bookmarked)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-6 h-6 text-christmas-gold" />
              ) : (
                <BookmarkPlus className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-christmas-gold to-yellow-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="glass-card p-8 min-h-[500px] relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSection}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                {sections[currentSection].title}
              </h2>
              <div className="text-white/90 leading-relaxed">
                {sections[currentSection].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <motion.button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className={`btn flex items-center space-x-2 ${
              currentSection === 0
                ? 'opacity-50 cursor-not-allowed bg-white/10'
                : 'btn-secondary'
            }`}
            whileHover={currentSection > 0 ? { scale: 1.05 } : {}}
            whileTap={currentSection > 0 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <div className="text-white/70 text-sm">
            {sections[currentSection].estimatedTime && (
              <span>⏱️ {sections[currentSection].estimatedTime}</span>
            )}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={currentSection === sections.length - 1}
            className={`btn flex items-center space-x-2 ${
              currentSection === sections.length - 1
                ? 'opacity-50 cursor-not-allowed bg-white/10'
                : 'btn-primary'
            }`}
            whileHover={currentSection < sections.length - 1 ? { scale: 1.05 } : {}}
            whileTap={currentSection < sections.length - 1 ? { scale: 0.95 } : {}}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Completion Message */}
        {currentSection === sections.length - 1 && (
          <motion.div
            className="glass-card p-6 mt-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              🎉 Tutorial Complete!
            </h3>
            <p className="text-white/80 mb-4">
              Great job! You&apos;ve learned the fundamentals. Ready to try the game or sandbox?
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <motion.button
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
