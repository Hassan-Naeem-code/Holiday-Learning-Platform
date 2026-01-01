'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-blue-dark p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 md:p-12 text-center max-w-2xl mx-auto"
      >
        {/* Error Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <AlertTriangle className="w-20 h-20 md:w-24 md:h-24 text-red-400 mx-auto" />
        </motion.div>

        {/* Error Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Oops! Something Went Wrong
        </h1>

        {/* Error Message */}
        <p className="text-lg md:text-xl text-white/80 mb-6">
          We encountered an unexpected error. Don&apos;t worry, our team is on it! 🔧
        </p>

        {/* Technical Details (optional, for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-left">
            <p className="text-white/90 font-mono text-sm break-all">
              <strong>Error:</strong> {error.message}
            </p>
            {error.digest && (
              <p className="text-white/70 font-mono text-xs mt-2">
                <strong>Digest:</strong> {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </motion.button>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-gray-900 font-bold rounded-lg hover:shadow-xl transition-all w-full"
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </motion.button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-6xl">💻 ⚡ 💻</div>
      </motion.div>
    </div>
  )
}
