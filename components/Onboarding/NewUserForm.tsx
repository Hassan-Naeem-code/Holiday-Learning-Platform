'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Cake, Copy, Check, AlertCircle, Loader2 } from 'lucide-react'
import { createUserProfile } from '@/lib/firebaseService'
import confetti from 'canvas-confetti'
import { toast } from '@/components/Common/Toast'

interface NewUserFormProps {
  onComplete: (code: string, name: string, age: number) => void
  onBack: () => void
}

// Security: Sanitize input to prevent XSS attacks
const sanitizeName = (input: string): string => {
  // Remove HTML tags and special characters that could be used for XSS
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .trim()
    .slice(0, 50) // Limit length
}

// Validate name format - only allow letters, spaces, hyphens, and apostrophes
const isValidName = (name: string): boolean => {
  const sanitized = sanitizeName(name)
  // Allow letters (including unicode), spaces, hyphens, and apostrophes
  const namePattern = /^[\p{L}\s'-]{2,50}$/u
  return namePattern.test(sanitized) && sanitized.length >= 2
}

// Validate age more strictly
const isValidAge = (ageStr: string): { valid: boolean; age: number; error?: string } => {
  // Remove any non-numeric characters
  const cleanAge = ageStr.replace(/[^0-9]/g, '')

  // Check if it's a valid number
  if (cleanAge !== ageStr.trim()) {
    return { valid: false, age: 0, error: 'Age must contain only numbers' }
  }

  const ageNum = parseInt(cleanAge, 10)

  if (isNaN(ageNum)) {
    return { valid: false, age: 0, error: 'Please enter a valid number' }
  }

  if (ageNum < 5) {
    return { valid: false, age: ageNum, error: 'You must be at least 5 years old' }
  }

  if (ageNum > 120) {
    return { valid: false, age: ageNum, error: 'Please enter a valid age (under 120)' }
  }

  return { valid: true, age: ageNum }
}

export default function NewUserForm({ onComplete, onBack }: NewUserFormProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle name input with sanitization
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow valid characters while typing
    if (value === '' || /^[\p{L}\s'-]*$/u.test(value)) {
      setName(value.slice(0, 50)) // Limit to 50 chars
    }
  }

  // Handle age input - only allow numbers
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits
    if (value === '' || /^\d{0,3}$/.test(value)) {
      setAge(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Sanitize and validate name
    const sanitizedName = sanitizeName(name)

    if (!sanitizedName) {
      setError('Please enter your name')
      return
    }

    if (!isValidName(sanitizedName)) {
      setError('Name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes')
      return
    }

    // Validate age
    const ageValidation = isValidAge(age)
    if (!ageValidation.valid) {
      setError(ageValidation.error || 'Please enter a valid age (5-120)')
      return
    }

    setLoading(true)

    try {
      const code = await createUserProfile(sanitizedName, ageValidation.age)
      setGeneratedCode(code)

      // Celebrate!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } catch (err) {
      // Provide more specific error messages
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError('Connection error. Please check your internet and try again.')
      } else if (errorMessage.includes('unique')) {
        setError('Could not generate a unique code. Please try again.')
      } else {
        setError('Failed to create your account. Please try again.')
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyCode = async () => {
    if (generatedCode) {
      try {
        await navigator.clipboard.writeText(generatedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      } catch (err) {
        console.error('Failed to copy code:', err)
        // Fallback: Select the text so user can manually copy
        const codeElement = document.getElementById('generated-code')
        if (codeElement) {
          const range = document.createRange()
          range.selectNode(codeElement)
          window.getSelection()?.removeAllRanges()
          window.getSelection()?.addRange(range)
        }
        toast.warning('Please manually copy the code: ' + generatedCode, 6000)
        // Still mark as copied so user can proceed
        setCopied(true)
      }
    }
  }

  const handleContinue = () => {
    if (generatedCode && copied) {
      onComplete(generatedCode, name, parseInt(age))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-blue-dark relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 20 + 10,
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
        <AnimatePresence mode="wait">
          {!generatedCode ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-brand-gold" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Create Your Profile
                </h2>
                <p className="text-gray-600">
                  Let&apos;s get to know you better!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name-input" className="block text-sm font-semibold text-gray-700 mb-2">
                    What&apos;s your name?
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                    <input
                      id="name-input"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-brand-purple focus:outline-none transition-colors text-gray-800"
                      disabled={loading}
                      maxLength={50}
                      autoComplete="name"
                      aria-describedby="name-hint"
                    />
                  </div>
                  <p id="name-hint" className="text-xs text-gray-500 mt-1">
                    2-50 characters, letters only
                  </p>
                </div>

                {/* Age Input */}
                <div>
                  <label htmlFor="age-input" className="block text-sm font-semibold text-gray-700 mb-2">
                    How old are you?
                  </label>
                  <div className="relative">
                    <Cake className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                    <input
                      id="age-input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={age}
                      onChange={handleAgeChange}
                      placeholder="Enter your age"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-brand-purple focus:outline-none transition-colors text-gray-800"
                      disabled={loading}
                      maxLength={3}
                      autoComplete="off"
                      aria-describedby="age-hint"
                    />
                  </div>
                  <p id="age-hint" className="text-xs text-gray-500 mt-1">
                    Must be between 5 and 120
                  </p>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-dark text-gray-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    'Generate My Code'
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
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Check className="w-16 h-16 text-brand-gold" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Your Unique Code!
                </h2>
                <p className="text-gray-600">
                  Save this code - you&apos;ll need it to access your progress!
                </p>
              </div>

              {/* Code Display */}
              <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-2xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-white/80 text-sm mb-2">Your Code</p>
                  <motion.p
                    id="generated-code"
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {generatedCode}
                  </motion.p>
                  <motion.button
                    onClick={copyCode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-brand-purple font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Code
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-bold mb-1">Important!</p>
                    <p>
                      Make sure you&apos;ve copied and saved your code. Without it, you won&apos;t be able to access your progress. There&apos;s no way to recover a lost code!
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <motion.button
                onClick={handleContinue}
                disabled={!copied}
                whileHover={copied ? { scale: 1.02 } : {}}
                whileTap={copied ? { scale: 0.98 } : {}}
                className="w-full bg-gradient-to-r from-brand-gold to-brand-gold-dark text-gray-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? 'Continue to Platform' : 'Copy Code First'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
