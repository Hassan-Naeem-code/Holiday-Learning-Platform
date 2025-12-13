'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy } from 'lucide-react'
import { soundManager } from '@/utils/soundManager'

interface Achievement {
  id: string
  title: string
  icon: string
}

interface AchievementNotificationProps {
  achievement: Achievement | null
  onClose: () => void
}

export default function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  useEffect(() => {
    if (achievement) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      // Play achievement sound
      soundManager.playAchievement()

      // Auto-close after 5 seconds
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed top-24 right-4 z-[100] pointer-events-none"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="glass-card p-6 pointer-events-auto max-w-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-christmas-gold to-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Trophy className="w-8 h-8 text-gray-900" />
                </motion.div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl">{achievement.icon}</span>
                  <h3 className="text-lg font-bold text-christmas-gold">
                    Achievement Unlocked!
                  </h3>
                </div>
                <p className="text-white font-semibold text-xl">
                  {achievement.title}
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
