'use client';

import { motion } from 'framer-motion';
import { useAICoachStore } from '@/stores/aiCoachStore';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { useState } from 'react';

export default function AICoachButton() {
  const { toggleCoach } = useAICoachStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main button */}
      <motion.button
        onClick={toggleCoach}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 shadow-2xl flex items-center justify-center overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Coach assistant"
        title="AI Coach - Need help? Click me!"
        animate={{
          boxShadow: [
            '0 0 20px rgba(168, 85, 247, 0.4)',
            '0 0 40px rgba(236, 72, 153, 0.6)',
            '0 0 20px rgba(168, 85, 247, 0.4)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Animated sparkles background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Main icon with animation */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Brain className="w-8 h-8 text-white" strokeWidth={2.5} />
          
          {/* Floating sparkle */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              y: [-2, -6, -2],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" fill="currentColor" />
          </motion.div>

          {/* Energy pulse */}
          <motion.div
            className="absolute -bottom-1 -left-1"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="w-3 h-3 text-yellow-400" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Ripple effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className="absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap"
        initial={{ opacity: 0, x: -10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -10,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-xl border border-purple-500/30">
          <p className="text-sm font-semibold">AI Coach</p>
          <p className="text-xs text-gray-300">Need help? Click me!</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
