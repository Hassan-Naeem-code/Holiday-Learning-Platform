'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Gamepad2, Code } from 'lucide-react'
import type { Topic } from '@/utils/topicConfig'

interface TopicCardProps {
  topic: Topic
  index: number
}

export default function TopicCard({ topic, index }: TopicCardProps) {
  return (
    <motion.div
      className="glass-card p-6 card-hover relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-10`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="text-6xl mb-4"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {topic.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {topic.title}
        </h3>

        {/* Description */}
        <p className="text-white/80 mb-6 text-sm leading-relaxed">
          {topic.description}
        </p>

        {/* Learning Paths */}
        <div className="space-y-3">
          <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3">
            Choose Your Path:
          </h4>

          {/* Read It: Tutorial */}
          <Link href={`/tutorial/${topic.tutorialId}`}>
            <motion.div
              className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all cursor-pointer group"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Read It</div>
                <div className="text-white/60 text-xs">Interactive Tutorial</div>
              </div>
              <div className="text-white/40 group-hover:text-white/60 transition-colors">→</div>
            </motion.div>
          </Link>

          {/* Play It: Game */}
          <Link href={`/game/${topic.gameId}`}>
            <motion.div
              className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all cursor-pointer group"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <Gamepad2 className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Play It</div>
                <div className="text-white/60 text-xs">Mini Game</div>
              </div>
              <div className="text-white/40 group-hover:text-white/60 transition-colors">→</div>
            </motion.div>
          </Link>

          {/* Try It: Sandbox */}
          <Link href={`/sandbox/${topic.sandboxId}`}>
            <motion.div
              className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all cursor-pointer group"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-purple-500/20 p-2 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">Try It</div>
                <div className="text-white/60 text-xs">Interactive Sandbox</div>
              </div>
              <div className="text-white/40 group-hover:text-white/60 transition-colors">→</div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
