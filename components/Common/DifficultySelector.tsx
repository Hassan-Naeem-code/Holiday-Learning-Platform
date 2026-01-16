'use client'

import { motion } from 'framer-motion'
import { BookOpen, Zap, Flame } from 'lucide-react'

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void
  onClose: () => void
  languageName: string
  type: 'game' | 'sandbox' | 'tutorial'
  completedDifficulties?: ('easy' | 'medium' | 'hard')[]
}

export default function DifficultySelector({
  onSelectDifficulty,
  onClose,
  languageName,
  type,
  completedDifficulties = [],
}: DifficultySelectorProps) {
  const difficulties = [
    {
      level: 'easy' as const,
      title: 'Easy - Beginner',
      description: 'Perfect for absolute beginners. Start from scratch with basics, syntax, and simple concepts.',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/50',
      textColor: 'text-green-400',
    },
    {
      level: 'medium' as const,
      title: 'Medium - Intermediate',
      description: 'For those with basic knowledge. Learn intermediate concepts, patterns, and practical applications.',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/50',
      textColor: 'text-yellow-400',
    },
    {
      level: 'hard' as const,
      title: 'Hard - Advanced',
      description: 'For experienced learners. Master advanced topics, optimization, best practices, and complex scenarios.',
      icon: Flame,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/50',
      textColor: 'text-red-400',
    },
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-4xl w-full mx-4 border-2 border-white/20 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-white mb-3"
          >
            Choose Your Difficulty Level
          </motion.h2>
          <p className="text-xl text-white/80">
            {type === 'sandbox' ? 'Practicing' : 'Playing'} <span className="text-blue-400 font-semibold">{languageName}</span>
          </p>
          <p className="text-sm text-white/60 mt-2">
            Your progress will be saved automatically and you can continue anytime!
          </p>
        </div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {difficulties.map((diff, index) => {
            const isCompleted = completedDifficulties.includes(diff.level)
            return (
              <motion.button
                key={diff.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectDifficulty(diff.level)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                disabled={isCompleted}
                aria-label={`Select ${diff.title} difficulty${isCompleted ? ' (already completed)' : ''}`}
                aria-disabled={isCompleted}
                className={`${diff.bgColor} ${diff.borderColor} border-2 rounded-2xl p-6 text-left transition-all hover:shadow-2xl hover:border-opacity-100 group relative ${
                  isCompleted ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </div>
                )}
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${diff.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <diff.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold ${diff.textColor} mb-2 group-hover:text-white transition-colors`}>
                  {diff.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {diff.description}
                </p>

                {/* Level Badge */}
                <div className="mt-4 flex items-center gap-2">
                  {[...Array(index + 1)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-8 rounded-full bg-gradient-to-r ${diff.color}`}
                    />
                  ))}
                  {[...Array(2 - index)].map((_, i) => (
                    <div
                      key={i + index + 1}
                      className="h-2 w-8 rounded-full bg-white/20"
                    />
                  ))}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Cancel Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/20"
        >
          Cancel
        </motion.button>
      </motion.div>
    </div>
  )
}
