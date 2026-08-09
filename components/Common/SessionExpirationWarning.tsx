'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, X, RefreshCw } from 'lucide-react'
import {
  onSessionExpiring,
  startSessionExpirationWatcher,
  stopSessionExpirationWatcher,
  extendSession,
  getSessionRemainingTime
} from '@/utils/sessionManager'

interface SessionExpirationWarningProps {
  // Time before expiration to start showing warning (default: 5 minutes)
  warningThresholdMs?: number
  // How often to check session status (default: 1 minute)
  checkIntervalMs?: number
}

export default function SessionExpirationWarning({
  warningThresholdMs = 5 * 60 * 1000,
  checkIntervalMs = 60 * 1000
}: SessionExpirationWarningProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [extending, setExtending] = useState(false)

  useEffect(() => {
    // Register expiration callback
    const unsubscribe = onSessionExpiring((remaining) => {
      setRemainingTime(remaining)

      if (remaining === 0) {
        // Session expired: force reload to show login
        window.location.href = '/'
      } else if (!dismissed) {
        setShowWarning(true)
      }
    })

    // Start the watcher
    startSessionExpirationWatcher(checkIntervalMs, warningThresholdMs)

    // Check immediately on mount
    const remaining = getSessionRemainingTime()
    if (remaining > 0 && remaining <= warningThresholdMs && !dismissed) {
      setShowWarning(true)
      setRemainingTime(remaining)
    }

    return () => {
      unsubscribe()
      stopSessionExpirationWatcher()
    }
  }, [warningThresholdMs, checkIntervalMs, dismissed])

  // Update remaining time every second when warning is shown
  useEffect(() => {
    if (!showWarning) return

    const timer = setInterval(() => {
      const remaining = getSessionRemainingTime()
      setRemainingTime(remaining)

      if (remaining === 0) {
        window.location.href = '/'
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [showWarning])

  const handleExtendSession = async () => {
    setExtending(true)
    const success = extendSession()

    if (success) {
      setShowWarning(false)
      setDismissed(false)
      setRemainingTime(getSessionRemainingTime())
    }

    setExtending(false)
  }

  const handleDismiss = () => {
    setDismissed(true)
    setShowWarning(false)
  }

  // Format remaining time
  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    }
    return `${seconds}s`
  }

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 right-0 z-[100] p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="max-w-2xl mx-auto bg-yellow-500 text-yellow-900 rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 flex-shrink-0" aria-hidden="true" />

              <div className="flex-1">
                <p className="font-semibold">
                  Session expiring soon!
                </p>
                <p className="text-sm text-yellow-800">
                  Your session will expire in{' '}
                  <span className="font-bold">{formatTime(remainingTime)}</span>.
                  {' '}Extend your session to avoid losing unsaved progress.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExtendSession}
                  disabled={extending}
                  className="flex items-center gap-1.5 bg-yellow-900 text-yellow-100 px-4 py-2 rounded-lg font-medium hover:bg-yellow-800 transition-colors disabled:opacity-50"
                  aria-label="Extend session"
                >
                  <RefreshCw className={`w-4 h-4 ${extending ? 'animate-spin' : ''}`} aria-hidden="true" />
                  <span className="hidden sm:inline">Extend</span>
                </button>

                <button
                  onClick={handleDismiss}
                  className="p-2 text-yellow-800 hover:text-yellow-900 hover:bg-yellow-400 rounded-lg transition-colors"
                  aria-label="Dismiss warning"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
