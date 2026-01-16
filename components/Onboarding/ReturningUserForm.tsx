'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KeyRound, Loader2, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'
import { getUserProfile } from '@/lib/firebaseService'
import { formatCode, validateCodeFormat } from '@/utils/userCodeGenerator'

interface ReturningUserFormProps {
  onSuccess: (code: string) => void
  onBack: () => void
}

export default function ReturningUserForm({ onSuccess, onBack }: ReturningUserFormProps) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isNetworkError, setIsNetworkError] = useState(false)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError(null)
    setIsNetworkError(false)

    const formattedCode = formatCode(code)

    if (!validateCodeFormat(formattedCode)) {
      setError('Invalid code format. Should be XXXX-XXXX')
      return
    }

    setLoading(true)

    try {
      const userProfile = await getUserProfile(formattedCode)

      if (userProfile) {
        onSuccess(formattedCode)
      } else {
        setError('Code not found. Please double-check your code and try again.')
        setIsNetworkError(false)
      }
    } catch (err) {
      // Check if it's a network error
      const errorMessage = err instanceof Error ? err.message : ''
      const isNetwork = errorMessage.includes('network') ||
                       errorMessage.includes('fetch') ||
                       errorMessage.includes('offline') ||
                       !navigator.onLine

      setIsNetworkError(isNetwork)
      setError(isNetwork
        ? 'Network error. Please check your connection and try again.'
        : 'Failed to verify code. Our servers might be busy. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '')

    // Auto-format with hyphen
    if (value.length > 4 && !value.includes('-')) {
      value = value.slice(0, 4) + '-' + value.slice(4)
    }

    // Limit to format XXXX-XXXX
    if (value.length > 9) {
      value = value.slice(0, 9)
    }

    setCode(value)
    setError(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <KeyRound className="w-16 h-16 text-purple-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600">
              Enter your unique code to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input */}
            <div>
              <label htmlFor="code-input" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Unique Code
              </label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  id="code-input"
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="XXXX-XXXX"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-800 text-center text-2xl font-mono tracking-wider"
                  disabled={loading}
                  maxLength={9}
                  aria-describedby="code-hint code-error"
                  aria-invalid={error ? 'true' : 'false'}
                />
              </div>
              <p id="code-hint" className="mt-2 text-xs text-gray-500 text-center">
                Format: XXXX-XXXX (e.g., A1B2-C3D4)
              </p>
            </div>

            {/* Error/Success Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
                  role="alert"
                  id="code-error"
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{error}</p>
                      {isNetworkError && (
                        <p className="text-xs text-red-500 mt-1">
                          Tip: Check if you&apos;re connected to the internet.
                        </p>
                      )}
                    </div>
                    {(isNetworkError || error.includes('servers')) && !loading && (
                      <button
                        type="button"
                        onClick={() => handleSubmit()}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-xs font-medium transition-colors"
                        aria-label="Retry code verification"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Retry
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || code.length < 9}
              whileHover={code.length >= 9 ? { scale: 1.02 } : {}}
              whileTap={code.length >= 9 ? { scale: 0.98 } : {}}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Continue
                </>
              )}
            </motion.button>

            {/* Back Button */}
            <button
              type="button"
              onClick={onBack}
              className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
              disabled={loading}
            >
              Go Back
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-xl">
            <p className="text-sm text-purple-800 text-center">
              <strong>Lost your code?</strong> Unfortunately, codes cannot be recovered. You&apos;ll need to create a new account.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
