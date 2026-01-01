'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { updateLearningGoal } from '@/lib/firebaseService'
import confetti from 'canvas-confetti'

interface GoalSelectionScreenProps {
  code: string
  name: string
  onComplete: (goal: 'career' | 'hobby' | 'school') => void
}

const GOALS = [
  {
    id: 'career' as const,
    title: 'Career Development',
    description: 'Build professional skills',
    icon: '💼',
    gradient: 'from-purple-600 to-blue-600',
    features: ['Industry-relevant skills', 'Advanced options', 'Portfolio projects']
  },
  {
    id: 'hobby' as const,
    title: 'Personal Hobby',
    description: 'Learn at your own pace',
    icon: '🎨',
    gradient: 'from-pink-500 to-orange-500',
    features: ['Relaxed pace', 'Creative projects', 'Focus on fun']
  },
  {
    id: 'school' as const,
    title: 'School/Academic',
    description: 'Master concepts for education',
    icon: '🎓',
    gradient: 'from-blue-500 to-indigo-600',
    features: ['Structured curriculum', 'Detailed explanations', 'Practice exercises']
  }
]

export default function GoalSelectionScreen({ code, name, onComplete }: GoalSelectionScreenProps) {
  const [loading, setLoading] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<'career' | 'hobby' | 'school' | null>(null)

  const handleGoalSelect = async (goal: 'career' | 'hobby' | 'school') => {
    if (loading) return

    setSelectedGoal(goal)
    setLoading(true)

    try {
      await updateLearningGoal(code, goal)

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#3B82F6', '#FCD34D', '#10B981']
      })

      setTimeout(() => {
        onComplete(goal)
      }, 1000)
    } catch (error) {
      console.error('Failed to save goal:', error)
      setLoading(false)
      setSelectedGoal(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-blue-dark relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome, {name}! 👋
          </h1>
          <p className="text-lg sm:text-xl text-white/80">
            What&apos;s your main goal for learning to code?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {GOALS.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!loading ? { scale: 1.05, y: -10 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
              onClick={() => handleGoalSelect(goal.id)}
              disabled={loading}
              className={`bg-gradient-to-br ${goal.gradient} p-6 md:p-8 rounded-3xl text-white glass-card transition-all ${
                loading && selectedGoal === goal.id ? 'ring-4 ring-brand-gold animate-pulse' : ''
              } ${loading && selectedGoal !== goal.id ? 'opacity-50' : ''}`}
            >
              <div className="text-5xl md:text-6xl mb-4">{goal.icon}</div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">{goal.title}</h2>
              <p className="text-white/90 mb-4 text-sm md:text-base">{goal.description}</p>
              <ul className="text-xs md:text-sm text-white/80 space-y-2 text-left">
                {goal.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-brand-gold-light flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <p className="text-white text-lg">Setting up your learning journey...</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
