'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, PartyPopper } from 'lucide-react'

interface WelcomeScreenProps {
  onSelectUserType: (type: 'new' | 'returning') => void
}

export default function WelcomeScreen({ onSelectUserType }: WelcomeScreenProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Main Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="inline-block mb-8"
          >
            <Image
              src="/logo.png"
              alt="CodeLikeBasics Logo"
              width={128}
              height={128}
              className="object-contain mx-auto"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to CodeLikeBasics!
          </motion.h1>

          <motion.p
            className="text-2xl text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            An interactive journey through technology, powered by fun, games, and hands-on learning!
          </motion.p>
        </motion.div>

        {/* User Type Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* First Time User Card */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onHoverStart={() => setHoveredCard('new')}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => onSelectUserType('new')}
            className="relative cursor-pointer"
          >
            <motion.div
              className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-8 shadow-2xl border-4 border-green-300/50 h-full"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={hoveredCard === 'new' ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="text-center mb-6"
              >
                <PartyPopper className="w-24 h-24 mx-auto text-white mb-4" />
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-4 text-center">
                First Time Here?
              </h2>

              <p className="text-white/90 text-lg mb-6 text-center">
                Start your amazing learning adventure! We&apos;ll create a unique code just for you to track your progress.
              </p>

              <motion.div
                className="flex items-center justify-center gap-2 text-white font-semibold text-xl"
                animate={hoveredCard === 'new' ? { x: [0, 10, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <span>Let&apos;s Begin</span>
                <ArrowRight className="w-6 h-6" />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-300 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Returning User Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onHoverStart={() => setHoveredCard('returning')}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => onSelectUserType('returning')}
            className="relative cursor-pointer"
          >
            <motion.div
              className="bg-gradient-to-br from-purple-500 to-pink-700 rounded-3xl p-8 shadow-2xl border-4 border-purple-300/50 h-full"
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={hoveredCard === 'returning' ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="text-center mb-6"
              >
                <Sparkles className="w-24 h-24 mx-auto text-white mb-4" />
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-4 text-center">
                Welcome Back!
              </h2>

              <p className="text-white/90 text-lg mb-6 text-center">
                Have your unique code? Enter it to continue your learning journey and pick up where you left off!
              </p>

              <motion.div
                className="flex items-center justify-center gap-2 text-white font-semibold text-xl"
                animate={hoveredCard === 'returning' ? { x: [0, 10, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <span>Continue Learning</span>
                <ArrowRight className="w-6 h-6" />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-2 -left-2 w-16 h-16 bg-blue-300 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16 text-white/60"
        >
          <p className="text-lg">
            100% Free • Track Your Progress • Earn Rewards • Have Fun!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
