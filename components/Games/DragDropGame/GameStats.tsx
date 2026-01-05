/**
 * Game Stats Component
 * Reusable stats display for all drag-drop games
 * Shows score, lives, hints, and combo
 */

'use client'

import { motion } from 'framer-motion'
import { Heart, Lightbulb, Trophy, Flame } from 'lucide-react'

interface GameStatsProps {
  score: number
  lives: number
  hints: number
  combo?: number
  maxLives?: number
  maxHints?: number
  showCombo?: boolean
}

export default function GameStats({
  score,
  lives,
  hints,
  combo = 0,
  maxLives = 3,
  maxHints = 2,
  showCombo = false,
}: GameStatsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
      {/* Score */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Trophy className="w-5 h-5 text-yellow-400" />
        <div>
          <p className="text-xs text-white/60">Score</p>
          <motion.p
            key={score}
            className="text-xl font-bold text-white"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {score}
          </motion.p>
        </div>
      </motion.div>

      {/* Lives */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <p className="text-xs text-white/60">Lives</p>
          <div className="flex gap-1">
            {Array.from({ length: maxLives }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${
                  i < lives
                    ? 'text-red-400 fill-red-400'
                    : 'text-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hints */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <p className="text-xs text-white/60">Hints</p>
          <div className="flex gap-1">
            {Array.from({ length: maxHints }).map((_, i) => (
              <Lightbulb
                key={i}
                className={`w-5 h-5 ${
                  i < hints
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Combo (optional) */}
      {showCombo && combo > 1 && (
        <motion.div
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-2 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <Flame className="w-5 h-5 text-white" />
          <div>
            <p className="text-xs text-white/80">Combo</p>
            <p className="text-lg font-bold text-white">x{combo}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
