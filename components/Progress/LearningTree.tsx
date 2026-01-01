'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LearningTreeProps {
  goalType: 'career' | 'hobby' | 'school'
  treeProgress: {
    stage: 'seedling' | 'sapling' | 'growing' | 'mature' | 'flourishing'
    overallGrowth: number // 0-100
  }
  onCelebrate: () => void
}

export default function LearningTree({ goalType, treeProgress, onCelebrate }: LearningTreeProps) {
  const [previousGrowth, setPreviousGrowth] = useState(treeProgress.overallGrowth)
  const [showSparkles, setShowSparkles] = useState(false)
  const isFull = treeProgress.overallGrowth >= 100

  useEffect(() => {
    if (treeProgress.overallGrowth > previousGrowth) {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 2000)
    }
    setPreviousGrowth(treeProgress.overallGrowth)
  }, [treeProgress.overallGrowth, previousGrowth])

  const handleClick = () => {
    if (isFull) onCelebrate()
  }

  // Tree aesthetics based on goal
  const treeStyle = {
    career: { trunkColor: '#92400E', leafColor: '#059669', theme: 'Professional Oak' },
    hobby: { trunkColor: '#BE185D', leafColor: '#EC4899', theme: 'Creative Cherry' },
    school: { trunkColor: '#1E40AF', leafColor: '#3B82F6', theme: 'Academic Pine' }
  }[goalType]

  return (
    <div className="relative">
      <motion.div
        className={`relative ${isFull ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
        whileHover={isFull ? { scale: 1.05 } : {}}
      >
        {/* Glow when full */}
        <AnimatePresence>
          {isFull && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -m-8"
            >
              <motion.div
                className="absolute inset-0 bg-brand-gold rounded-full blur-3xl opacity-60"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVG Tree */}
        <svg
          width="200"
          height="250"
          viewBox="0 0 200 250"
          className="drop-shadow-2xl"
        >
          {/* Trunk */}
          <motion.rect
            x="85"
            y="150"
            width="30"
            height="100"
            fill={treeStyle.trunkColor}
            rx="5"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: 'bottom' }}
          />

          {/* Foliage - changes size based on stage */}
          {treeProgress.stage !== 'seedling' && (
            <>
              {/* Main canopy */}
              <motion.circle
                cx="100"
                cy="120"
                r={treeProgress.stage === 'sapling' ? 30 : treeProgress.stage === 'growing' ? 45 : 60}
                fill={treeStyle.leafColor}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              />

              {/* Additional foliage for mature/flourishing */}
              {(treeProgress.stage === 'mature' || treeProgress.stage === 'flourishing') && (
                <>
                  <motion.circle
                    cx="70"
                    cy="140"
                    r="40"
                    fill={treeStyle.leafColor}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
                  />
                  <motion.circle
                    cx="130"
                    cy="140"
                    r="40"
                    fill={treeStyle.leafColor}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                  />
                </>
              )}

              {/* Blossoms for flourishing */}
              {treeProgress.stage === 'flourishing' && (
                <>
                  <motion.circle
                    cx="80"
                    cy="100"
                    r="8"
                    fill="#FCD34D"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="120"
                    cy="95"
                    r="8"
                    fill="#FCD34D"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="100"
                    cy="110"
                    r="8"
                    fill="#FCD34D"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </>
              )}
            </>
          )}

          {/* Seedling */}
          {treeProgress.stage === 'seedling' && (
            <motion.g>
              <motion.path
                d="M 95 200 Q 100 170, 105 200"
                stroke={treeStyle.leafColor}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.circle
                cx="100"
                cy="170"
                r="5"
                fill={treeStyle.leafColor}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.g>
          )}
        </svg>

        {/* Progress percentage and stage */}
        <div className="text-center mt-4">
          <motion.p
            className={`text-2xl font-bold ${isFull ? 'text-brand-gold' : 'text-white'}`}
            animate={isFull ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: isFull ? Infinity : 0 }}
          >
            {Math.floor(treeProgress.overallGrowth)}%
          </motion.p>
          <p className="text-white/70 text-sm capitalize">{treeProgress.stage}</p>
          {isFull && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-gold text-xs mt-1"
            >
              Click to celebrate! 🎉
            </motion.p>
          )}
        </div>

        {/* Sparkles on growth */}
        <AnimatePresence>
          {showSparkles && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xl md:text-2xl"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [-10, -40],
                    opacity: [1, 0],
                    scale: [0.5, 1.5],
                  }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
