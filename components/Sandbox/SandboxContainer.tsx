'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Home, Play, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface SandboxContainerProps {
  title: string
  icon: string
  children: ReactNode
  onRun?: () => void
  onReset?: () => void
  isRunning?: boolean
}

export default function SandboxContainer({
  title,
  icon,
  children,
  onRun,
  onReset,
  isRunning = false,
}: SandboxContainerProps) {
  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/" aria-label="Go to home page">
                <motion.button
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Go to home page"
                  title="Home"
                >
                  <Home className="w-5 h-5 text-white" />
                </motion.button>
              </Link>
              <span className="text-5xl">{icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-white">{title}</h1>
                <p className="text-white/70 text-sm">Interactive Sandbox</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {onReset && (
                <motion.button
                  onClick={onReset}
                  className="btn btn-secondary flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Reset sandbox to default state"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </motion.button>
              )}
              {onRun && (
                <motion.button
                  onClick={onRun}
                  disabled={isRunning}
                  className="btn btn-primary flex items-center space-x-2"
                  whileHover={!isRunning ? { scale: 1.05 } : {}}
                  whileTap={!isRunning ? { scale: 0.95 } : {}}
                  aria-label={isRunning ? 'Code is running' : 'Run code'}
                  aria-busy={isRunning}
                  title="Run"
                >
                  <Play className="w-5 h-5" />
                  <span>{isRunning ? 'Running...' : 'Run'}</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Sandbox Content */}
        {children}
      </div>
    </div>
  )
}
