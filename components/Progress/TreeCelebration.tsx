'use client'

import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect, useState } from 'react'

interface TreeCelebrationProps {
  isPlaying: boolean
  goalType: 'career' | 'hobby' | 'school'
  onComplete: () => void
}

export default function TreeCelebration({ isPlaying, goalType, onComplete }: TreeCelebrationProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      // Trigger confetti
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10B981', '#FCD34D', '#7C3AED', '#3B82F6']
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10B981', '#FCD34D', '#7C3AED', '#3B82F6']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()

      // Progress animation
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval)
            setTimeout(onComplete, 500)
            return 100
          }
          return p + 2
        })
      }, 30)

      return () => {
        clearInterval(interval)
        setProgress(0)
      }
    }
  }, [isPlaying, onComplete])

  const goalEmoji = {
    career: '💼',
    hobby: '🎨',
    school: '🎓'
  }[goalType]

  const goalMessage = {
    career: 'Professional Knowledge Unlocked!',
    hobby: 'Creative Milestone Achieved!',
    school: 'Academic Excellence Reached!'
  }[goalType]

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="glass-card p-8 md:p-12 text-center max-w-2xl w-full"
          >
            {/* Animated Tree Icon */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl md:text-8xl mb-6"
            >
              🌳
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Tree Complete! 🎉
            </motion.h2>

            {/* Goal-specific message */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/80 mb-2"
            >
              {goalEmoji} {goalMessage}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-white/70 mb-6"
            >
              Your knowledge tree has fully bloomed!
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-white/20 rounded-full h-4 mb-6 overflow-hidden"
            >
              <motion.div
                className="bg-gradient-to-r from-tree-green via-brand-gold to-brand-purple h-full rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Achievement badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-brand-gold to-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg">
                🌟 Master Learner 🌟
              </div>
            </motion.div>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/60 text-sm mt-6"
            >
              {progress}% Complete
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
