'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface ProgressGlassProps {
  drinkType: 'beer' | 'coffee' | 'coke'
  fillPercentage: number // 0-100
  onGlassFull: () => void
}

const DRINK_COLORS = {
  beer: {
    liquid: '#F59E0B',
    foam: '#FEF3C7',
    foamBubbles: '#FBBF24',
  },
  coffee: {
    liquid: '#6B4423',
    foam: '#D2B48C',
    steam: '#F5F5F5',
  },
  coke: {
    liquid: '#3D0C02',
    foam: '#F5F5F5',
    bubbles: '#FFFFFF',
  },
}

export default function ProgressGlass({
  drinkType,
  fillPercentage,
  onGlassFull,
}: ProgressGlassProps) {
  const [previousFill, setPreviousFill] = useState(fillPercentage)
  const [showBubbles, setShowBubbles] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)

  const isFull = fillPercentage >= 100
  const colors = DRINK_COLORS[drinkType]

  useEffect(() => {
    if (fillPercentage > previousFill) {
      setShowBubbles(true)
      setTimeout(() => setShowBubbles(false), 2000)
    }
    setPreviousFill(fillPercentage)
  }, [fillPercentage, previousFill])

  useEffect(() => {
    if (isFull) {
      setIsGlowing(true)
    } else {
      setIsGlowing(false)
    }
  }, [isFull])

  const handleClick = () => {
    if (isFull) {
      onGlassFull()
    }
  }

  // Shaking animation for filling
  const shakeAnimation = fillPercentage > previousFill ? {
    x: [-2, 2, -2, 2, 0],
    transition: { duration: 0.5 }
  } : {}

  return (
    <div className="relative">
      {/* Glass Container with Shake */}
      <motion.div
        className={`relative ${isFull ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={handleClick}
        whileHover={isFull ? { scale: 1.05 } : {}}
        whileTap={isFull ? { scale: 0.95 } : {}}
        animate={shakeAnimation}
      >
        {/* Glow Effect when Full */}
        <AnimatePresence>
          {isGlowing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -m-8"
            >
              <motion.div
                className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-60"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render different glasses based on drink type */}
        {drinkType === 'beer' && (
          <BeerGlass fillPercentage={fillPercentage} colors={colors} showBubbles={showBubbles} />
        )}
        {drinkType === 'coffee' && (
          <CoffeeMug fillPercentage={fillPercentage} colors={colors} />
        )}
        {drinkType === 'coke' && (
          <CokeGlass fillPercentage={fillPercentage} colors={colors} showBubbles={showBubbles} />
        )}

        {/* Sparkle Effect when Full */}
        <AnimatePresence>
          {isFull && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-6 -right-6"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1.5, repeat: Infinity },
                }}
              >
                <Sparkles className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress Percentage */}
      <motion.div
        className="text-center mt-6"
        animate={isFull ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <p className="text-4xl font-bold text-white drop-shadow-lg">
          {Math.round(fillPercentage)}%
        </p>
        <p className="text-sm text-white/80 mt-2 font-semibold">
          {isFull ? '🎉 Full! Click to celebrate!' : 'Keep learning!'}
        </p>
      </motion.div>
    </div>
  )
}

type BeerGlassColors = { liquid: string; foam: string; foamBubbles?: string }
// Beer Glass Component: Traditional Pint Glass
function BeerGlass({ fillPercentage, colors, showBubbles }: { fillPercentage: number; colors: BeerGlassColors; showBubbles: boolean }) {
  return (
    <div className="relative w-44 h-60">
      <svg viewBox="0 0 140 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* Beer liquid gradient */}
          <linearGradient id="beerLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.liquid} stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Glass shine */}
          <linearGradient id="beerGlassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
          </linearGradient>

          {/* Clip path for pint glass shape */}
          <clipPath id="beerPintClip">
            <path d="M 45 30 L 40 180 L 100 180 L 95 30 Z" />
          </clipPath>
        </defs>

        {/* Beer Liquid with pouring animation */}
        <g clipPath="url(#beerPintClip)">
          <motion.rect
            x="40"
            y="30"
            width="60"
            height="150"
            fill="url(#beerLiquid)"
            initial={{ y: 180 }}
            animate={{
              y: 180 - (fillPercentage / 100) * 150,
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
            }}
          />

          {/* Beer Foam: appears when beer is filling */}
          {fillPercentage > 5 && (
            <>
              {/* Main foam layer */}
              <motion.ellipse
                cx="70"
                cy={180 - (fillPercentage / 100) * 150 - 3}
                rx="28"
                ry="10"
                fill={colors.foam}
                opacity="0.98"
                animate={{
                  ry: [10, 12, 10],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Secondary foam bubbles */}
              <motion.ellipse
                cx="70"
                cy={180 - (fillPercentage / 100) * 150 - 10}
                rx="24"
                ry="8"
                fill={colors.foamBubbles}
                opacity="0.9"
                animate={{
                  ry: [8, 10, 8],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              {/* Top foam layer */}
              <motion.ellipse
                cx="70"
                cy={180 - (fillPercentage / 100) * 150 - 15}
                rx="20"
                ry="6"
                fill="#FFFBEB"
                opacity="0.85"
                animate={{
                  ry: [6, 8, 6],
                  opacity: [0.85, 0.95, 0.85],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
              />
            </>
          )}
        </g>

        {/* Glass Body: Pint Shape (wider at top, narrower at bottom) */}
        <path
          d="M 45 30 L 40 180 L 100 180 L 95 30 Z"
          fill="url(#beerGlassShine)"
          stroke="#D1D5DB"
          strokeWidth="3"
        />

        {/* Glass Rim (top opening) */}
        <ellipse
          cx="70"
          cy="30"
          rx="25"
          ry="5"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth="2.5"
        />

        {/* Glass shine highlight */}
        <ellipse
          cx="52"
          cy="85"
          rx="12"
          ry="50"
          fill="white"
          opacity="0.4"
        />

        {/* Glass Base */}
        <ellipse
          cx="70"
          cy="180"
          rx="30"
          ry="6"
          fill="#D1D5DB"
          stroke="#9CA3AF"
          strokeWidth="2.5"
        />

        {/* Base ring detail */}
        <ellipse
          cx="70"
          cy="180"
          rx="25"
          ry="4"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
      </svg>

      {/* Rising Bubbles Animation */}
      <AnimatePresence>
        {showBubbles && fillPercentage > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-yellow-100/70"
                style={{
                  width: Math.random() * 3 + 2 + 'px',
                  height: Math.random() * 3 + 2 + 'px',
                  left: `${40 + Math.random() * 25}%`,
                  bottom: `${(fillPercentage / 100) * 75}%`,
                }}
                initial={{ opacity: 0.9, scale: 1 }}
                animate={{
                  y: -120 - Math.random() * 60,
                  opacity: 0,
                  scale: 0.4,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 2.5 + 2,
                  ease: 'linear',
                  delay: Math.random() * 0.4,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

type CoffeeMugColors = { liquid: string; steam?: string }
// Coffee Mug Component
function CoffeeMug({ fillPercentage, colors }: { fillPercentage: number; colors: CoffeeMugColors }) {
  return (
    <div className="relative w-48 h-60">
      <svg viewBox="0 0 160 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="coffeeLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.liquid} stopOpacity="0.98" />
            <stop offset="100%" stopColor="#3E1F08" />
          </linearGradient>

          {/* Mug clip path */}
          <clipPath id="mugClip">
            <rect x="35" y="50" width="70" height="120" rx="8" />
          </clipPath>
        </defs>

        {/* Coffee Liquid */}
        <g clipPath="url(#mugClip)">
          <motion.rect
            x="35"
            y="50"
            width="70"
            height="120"
            fill="url(#coffeeLiquid)"
            initial={{ y: 170 }}
            animate={{
              y: 170 - (fillPercentage / 100) * 120,
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
            }}
          />
        </g>

        {/* Mug Body */}
        <rect
          x="35"
          y="50"
          width="70"
          height="120"
          rx="8"
          fill="rgba(255,255,255,0.3)"
          stroke="#E5E7EB"
          strokeWidth="4"
        />

        {/* Mug Handle */}
        <path
          d="M 105 75 Q 135 85 135 110 Q 135 135 105 145"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 105 80 Q 128 88 128 110 Q 128 132 105 140"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Mug Rim */}
        <ellipse
          cx="70"
          cy="50"
          rx="35"
          ry="7"
          fill="#F3F4F6"
          stroke="#D1D5DB"
          strokeWidth="3"
        />

        {/* Mug shine */}
        <ellipse
          cx="52"
          cy="95"
          rx="10"
          ry="40"
          fill="white"
          opacity="0.45"
        />

        {/* Mug Base */}
        <ellipse
          cx="70"
          cy="170"
          rx="35"
          ry="6"
          fill="#D1D5DB"
          stroke="#9CA3AF"
          strokeWidth="2"
        />

        {/* Steam Animation: appears when coffee is hot */}
        {fillPercentage > 15 && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${60 + i * 7} 40 Q ${63 + i * 7} 28 ${60 + i * 7} 15 Q ${57 + i * 7} 5 ${60 + i * 7} -5`}
                fill="none"
                stroke={colors.steam}
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.7"
                animate={{
                  y: [0, -15, -30],
                  opacity: [0.7, 0.4, 0],
                  pathLength: [0, 0.5, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  )
}

// Coke Glass Component with "Coke" Text
type CokeGlassColors = { liquid: string; bubbles?: string; steam?: string }
function CokeGlass({ fillPercentage, colors, showBubbles }: { fillPercentage: number; colors: CokeGlassColors; showBubbles: boolean }) {
  // Normalize fill and ensure a tiny visible base so 1-5% still shows
  const clampedFill = Math.min(100, Math.max(0, fillPercentage))
  const effectiveHeight = 145
  const liquidHeight = Math.max(2, (clampedFill / 100) * effectiveHeight)
  const liquidY = 35 + (1 - clampedFill / 100) * effectiveHeight

  return (
    <div className="relative w-44 h-60">
      <svg viewBox="0 0 140 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="cokeLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.liquid} stopOpacity="0.98" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Glass clip path */}
          <clipPath id="cokeClip">
            <rect x="42" y="35" width="56" height="145" rx="6" />
          </clipPath>
        </defs>

        {/* Coke Liquid */}
        <g clipPath="url(#cokeClip)">
          <motion.rect
            x="42"
            y={liquidY}
            width="56"
            height={liquidHeight}
            fill="url(#cokeLiquid)"
            initial={{ height: 0, y: 180 }}
            animate={{ height: liquidHeight, y: liquidY }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 15,
            }}
          />

          {/* Ice Cubes floating in coke */}
          {clampedFill > 25 && (
            <>
              <motion.rect
                x="52"
                y={Math.max(50, liquidY + liquidHeight * 0.25)}
                width="14"
                height="14"
                rx="3"
                fill="rgba(255,255,255,0.35)"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
                animate={{
                  y: [
                    Math.max(50, liquidY + liquidHeight * 0.25),
                    Math.max(50, liquidY + liquidHeight * 0.32),
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
              <motion.rect
                x="72"
                y={Math.max(65, liquidY + liquidHeight * 0.4)}
                width="12"
                height="12"
                rx="2"
                fill="rgba(255,255,255,0.3)"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.5"
                animate={{
                  y: [
                    Math.max(65, liquidY + liquidHeight * 0.4),
                    Math.max(65, liquidY + liquidHeight * 0.47),
                  ],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 0.6,
                }}
              />
            </>
          )}
        </g>

        {/* Glass Body */}
        <rect
          x="42"
          y="35"
          width="56"
          height="145"
          rx="6"
          fill="rgba(255,255,255,0.2)"
          stroke="#D1D5DB"
          strokeWidth="3"
        />

        {/* "Coke" Text on Glass */}
        <text
          x="70"
          y="110"
          fontSize="20"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          fill="#DC2626"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          textAnchor="middle"
          style={{
            fontStyle: 'italic',
            letterSpacing: '1px'
          }}
        >
          Coke
        </text>

        {/* Glass Rim */}
        <rect
          x="42"
          y="35"
          width="56"
          height="8"
          rx="4"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth="2"
        />

        {/* Glass shine */}
        <rect
          x="50"
          y="60"
          width="10"
          height="90"
          rx="5"
          fill="white"
          opacity="0.4"
        />

        {/* Glass Base */}
        <rect
          x="42"
          y="175"
          width="56"
          height="5"
          rx="2"
          fill="#D1D5DB"
        />
      </svg>

      {/* Rising Bubbles for Coke */}
      <AnimatePresence>
        {showBubbles && clampedFill > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/80"
                style={{
                  width: Math.random() * 2 + 1.5 + 'px',
                  height: Math.random() * 2 + 1.5 + 'px',
                  left: `${35 + Math.random() * 32}%`,
                  bottom: `${(clampedFill / 100) * 75}%`,
                }}
                initial={{ opacity: 0.9, scale: 1 }}
                animate={{
                  y: -140 - Math.random() * 50,
                  opacity: 0,
                  scale: 0.2,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 3 + 2.5,
                  ease: 'linear',
                  delay: Math.random() * 0.6,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
