'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, X } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!hasAccepted) {
      // Small delay before showing the banner
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: true,
      preferences: true,
      acceptedAt: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      necessary: true,
      analytics: false,
      preferences: false,
      acceptedAt: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
            {/* Main Banner */}
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Cookie className="w-5 h-5 text-amber-400 sm:hidden" />
                    <h3 className="text-lg font-bold text-white">We use cookies</h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base mb-4">
                    We use cookies to enhance your learning experience, save your progress, and analyze how you use our platform.
                    You can choose to accept all cookies or only essential ones.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={handleAcceptNecessary}
                      className="px-6 py-2.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
                    >
                      Essential Only
                    </button>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="px-4 py-2.5 text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {showDetails ? 'Hide Details' : 'Cookie Settings'}
                    </button>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={handleAcceptNecessary}
                  className="text-gray-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-700 overflow-hidden"
                >
                  <div className="p-4 md:p-6 space-y-4">
                    {/* Necessary Cookies */}
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-white">Essential Cookies</h4>
                          <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                            Always Active
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Required for the platform to function. These save your login session, progress, and preferences.
                        </p>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-white">Analytics Cookies</h4>
                          <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Help us understand how you use the platform so we can improve it. No personal data is shared.
                        </p>
                      </div>
                    </div>

                    {/* Preference Cookies */}
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-white">Preference Cookies</h4>
                          <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Remember your settings like theme preferences and language choices for a personalized experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
