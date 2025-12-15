'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Beer, Coffee, Milk } from 'lucide-react'
import { updateDrinkPreference } from '@/lib/firebaseService'
import confetti from 'canvas-confetti'

interface DrinkPreferenceScreenProps {
  code: string
  name: string
  age: number
  onComplete: (preference: 'beer' | 'coffee' | 'coke') => void
}

export default function DrinkPreferenceScreen({
  code,
  name,
  age,
  onComplete,
}: DrinkPreferenceScreenProps) {
  const [isAlcoholic, setIsAlcoholic] = useState<boolean | null>(null)
  const [selectedDrink, setSelectedDrink] = useState<'beer' | 'coffee' | 'coke' | null>(null)
  const [loading, setLoading] = useState(false)
  const [hoveredDrink, setHoveredDrink] = useState<string | null>(null)

  // Validate age and determine if adult (with fallback)
  const validAge = typeof age === 'number' && !isNaN(age) && age >= 5 && age <= 120 ? age : 18
  const isAdult = validAge >= 21

  const handleAlcoholicChoice = (choice: boolean) => {
    setIsAlcoholic(choice)
    if (choice) {
      // Automatically select beer for alcoholic users
      handleDrinkSelect('beer')
    }
  }

  const handleDrinkSelect = async (drink: 'beer' | 'coffee' | 'coke') => {
    setSelectedDrink(drink)
    setLoading(true)

    try {
      await updateDrinkPreference(code, drink)

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      })

      setTimeout(() => {
        onComplete(drink)
      }, 1000)
    } catch (err) {
      console.error('Failed to save drink preference:', err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -50,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Hey {name}! 🎉
            </motion.h2>
            <p className="text-xl text-gray-600">
              Let&apos;s personalize your learning experience!
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isAdult && isAlcoholic === null ? (
              /* Adult User - Ask if Alcoholic */
              <motion.div
                key="alcoholic-choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <p className="text-2xl font-semibold text-gray-700">
                    Do you enjoy alcoholic beverages?
                  </p>
                  <p className="text-gray-500 mt-2">
                    This helps us customize your progress visualization
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.button
                    onClick={() => handleAlcoholicChoice(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <Beer className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-2xl font-bold">Yes, I do!</p>
                    <p className="text-white/80 mt-2">Beer enthusiast</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setIsAlcoholic(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <Coffee className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-2xl font-bold">No, thanks!</p>
                    <p className="text-white/80 mt-2">Non-alcoholic options</p>
                  </motion.button>
                </div>
              </motion.div>
            ) : (!isAdult || isAlcoholic === false) && !selectedDrink ? (
              /* Non-Adult or Non-Alcoholic - Choose Drink */
              <motion.div
                key="drink-choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <p className="text-2xl font-semibold text-gray-700">
                    What&apos;s your favorite drink?
                  </p>
                  <p className="text-gray-500 mt-2">
                    Your glass will fill with this as you progress!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.button
                    onClick={() => handleDrinkSelect('coffee')}
                    onHoverStart={() => setHoveredDrink('coffee')}
                    onHoverEnd={() => setHoveredDrink(null)}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-amber-700 to-yellow-900 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 relative overflow-hidden"
                  >
                    <motion.div
                      animate={
                        hoveredDrink === 'coffee'
                          ? { rotate: [0, 10, -10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Coffee className="w-20 h-20 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-2xl font-bold">Coffee</p>
                    <p className="text-white/80 mt-2">Rich & Energizing</p>
                    {loading && selectedDrink === 'coffee' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => handleDrinkSelect('coke')}
                    onHoverStart={() => setHoveredDrink('coke')}
                    onHoverEnd={() => setHoveredDrink(null)}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-red-600 to-rose-800 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 relative overflow-hidden"
                  >
                    <motion.div
                      animate={
                        hoveredDrink === 'coke'
                          ? { rotate: [0, -10, 10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <Milk className="w-20 h-20 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-2xl font-bold">Coke</p>
                    <p className="text-white/80 mt-2">Sweet & Refreshing</p>
                    {loading && selectedDrink === 'coke' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </motion.button>
                </div>

                {isAdult && (
                  <button
                    onClick={() => setIsAlcoholic(null)}
                    className="text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors block mx-auto"
                    disabled={loading}
                  >
                    Go Back
                  </button>
                )}
              </motion.div>
            ) : selectedDrink === 'beer' ? (
              /* Alcoholic - Show Beer Selection */
              <motion.div
                key="beer-selected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Beer className="w-32 h-32 mx-auto text-amber-600 mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  Cheers! 🍺
                </h3>
                <p className="text-xl text-gray-600">
                  Your beer glass is ready to fill with progress!
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center"
        >
          <p className="text-gray-700">
            <strong>How it works:</strong> As you complete lessons and earn XP, your glass will fill up!
            When it&apos;s full, click it to see Santa enjoy your drink 🎅
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
