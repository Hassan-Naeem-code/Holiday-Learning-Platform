'use client'

import { motion } from 'framer-motion'
import { Module } from '@/utils/techModules'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface ModuleCardProps {
  module: Module
  index: number
  onClick: () => void
}

export default function ModuleCard({ module, index, onClick }: ModuleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`Select ${module.name} module with ${module.languages.length} languages`}
    >
      <div className={`relative bg-gradient-to-br ${module.gradient} rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 2xl:p-10 shadow-xl hover:shadow-2xl transition-all overflow-hidden h-full`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl mb-2 sm:mb-3 md:mb-4"
            animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {module.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl font-bold text-white mb-2 sm:mb-3">
            {module.name}
          </h3>

          {/* Description */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-lg 2xl:text-xl mb-4 sm:mb-5 md:mb-6 line-clamp-2 sm:line-clamp-none">
            {module.description}
          </p>

          {/* Language Count Badge */}
          <div className="flex items-center justify-between">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <p className="text-white font-semibold text-xs sm:text-sm md:text-base 2xl:text-lg">
                {module.languages.length} Languages
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              animate={isHovered ? { x: [0, 10, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 2xl:w-8 2xl:h-8 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}
