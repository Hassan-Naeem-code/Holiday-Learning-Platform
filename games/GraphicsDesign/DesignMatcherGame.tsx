'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameContainer from '@/components/Games/GameContainer'
import GameHUD from '@/components/Games/GameHUD'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'
import { soundManager } from '@/utils/soundManager'
import confetti from 'canvas-confetti'

interface DesignElement {
  id: string
  type: 'color' | 'font' | 'layout'
  question: string
  options: { id: string; label: string; value: string; correct: boolean }[]
}

const DESIGN_CHALLENGES: DesignElement[] = [
  {
    id: 'color-1',
    type: 'color',
    question: 'Which color scheme creates the most contrast?',
    options: [
      { id: 'a', label: 'Blue & Light Blue', value: '#3B82F6 #93C5FD', correct: false },
      { id: 'b', label: 'Black & White', value: '#000000 #FFFFFF', correct: true },
      { id: 'c', label: 'Gray & Light Gray', value: '#6B7280 #D1D5DB', correct: false },
      { id: 'd', label: 'Green & Dark Green', value: '#10B981 #065F46', correct: false },
    ]
  },
  {
    id: 'font-1',
    type: 'font',
    question: 'Which font is best for body text readability?',
    options: [
      { id: 'a', label: 'Decorative Script', value: 'cursive', correct: false },
      { id: 'b', label: 'Sans-Serif', value: 'sans-serif', correct: true },
      { id: 'c', label: 'Bold Display', value: 'impact', correct: false },
      { id: 'd', label: 'Narrow Condensed', value: 'narrow', correct: false },
    ]
  },
  {
    id: 'layout-1',
    type: 'layout',
    question: 'Which layout shows proper visual hierarchy?',
    options: [
      { id: 'a', label: 'All same size', value: 'equal', correct: false },
      { id: 'b', label: 'Large title, medium subtitle, small body', value: 'hierarchy', correct: true },
      { id: 'c', label: 'Random sizes', value: 'random', correct: false },
      { id: 'd', label: 'Small title, large body', value: 'reversed', correct: false },
    ]
  },
  {
    id: 'color-2',
    type: 'color',
    question: 'Which colors are complementary (opposite on color wheel)?',
    options: [
      { id: 'a', label: 'Red & Orange', value: '#EF4444 #F97316', correct: false },
      { id: 'b', label: 'Blue & Orange', value: '#3B82F6 #F97316', correct: true },
      { id: 'c', label: 'Green & Yellow', value: '#10B981 #F59E0B', correct: false },
      { id: 'd', label: 'Purple & Pink', value: '#8B5CF6 #EC4899', correct: false },
    ]
  },
  {
    id: 'font-2',
    type: 'font',
    question: 'Which font pairing creates good contrast?',
    options: [
      { id: 'a', label: 'Serif & Sans-Serif', value: 'contrast', correct: true },
      { id: 'b', label: 'Sans-Serif & Sans-Serif', value: 'same', correct: false },
      { id: 'c', label: 'Script & Script', value: 'similar', correct: false },
      { id: 'd', label: 'Serif & Serif', value: 'match', correct: false },
    ]
  },
]

type Difficulty = 'easy' | 'medium' | 'hard'

export default function DesignMatcherGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [hints, setHints] = useState(3)
  const [feedback, setFeedback] = useState<string>('')
  const [gameWon, setGameWon] = useState(false)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)

  const { addXP } = useUserStore()
  const { updateTopicProgress } = useTutorialStore()

  const questionsToAnswer = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5

  const handleAnswer = (optionId: string) => {
    setSelectedAnswer(optionId)
    const currentChallenge = DESIGN_CHALLENGES[currentQuestion]
    const selectedOption = currentChallenge.options.find(o => o.id === optionId)

    if (selectedOption?.correct) {
      const newCombo = combo + 1
      setCombo(newCombo)
      if (newCombo > bestCombo) setBestCombo(newCombo)

      const points = 10 + (newCombo * 5)
      setScore(score + points)
      setFeedback(`✅ Correct! +${points} points`)
      soundManager.playCombo(newCombo)

      setTimeout(() => {
        if (currentQuestion + 1 >= questionsToAnswer) {
          setGameWon(true)
          const totalPoints = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300
          addXP(totalPoints)
          const progressPercent = difficulty === 'easy' ? 33 : difficulty === 'medium' ? 66 : 100
          updateTopicProgress('graphics-design', 'game', progressPercent)
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
          soundManager.playWin()
          setTimeout(() => achievementManager.checkAll(), 1000)
        } else {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setFeedback('')
        }
      }, 1500)
    } else {
      setCombo(0)
      setLives(lives - 1)
      setFeedback('❌ Wrong! Try again.')
      soundManager.playError()
      setTimeout(() => {
        setSelectedAnswer(null)
        setFeedback('')
      }, 1500)
    }
  }

  const useHint = () => {
    if (hints > 0) {
      setHints(hints - 1)
      soundManager.playHint()
      const currentChallenge = DESIGN_CHALLENGES[currentQuestion]
      const correctOption = currentChallenge.options.find(o => o.correct)
      setFeedback(`💡 Hint: Look for "${correctOption?.label}"`)
      setTimeout(() => setFeedback(''), 5000)
    }
  }

  const startGame = () => {
    setStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setLives(3)
    setHints(3)
    setScore(0)
    setGameWon(false)
    setCombo(0)
    setBestCombo(0)
  }

  if (!started) {
    return (
      <GameContainer title="Design Matcher" icon="🎨">
        <div className="glass-card p-12 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <div className="text-8xl mb-6">🎯</div>
            <h2 className="text-4xl font-bold text-white mb-4">Design Matcher</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Match design elements correctly! Test your knowledge of colors, fonts, and layouts.
            </p>
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4">Select Difficulty:</h3>
              <div className="flex justify-center gap-4">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                      difficulty === diff ? 'bg-christmas-gold text-gray-900' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
            <motion.button onClick={startGame} className="btn btn-primary text-xl px-12 py-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Start Game
            </motion.button>
          </motion.div>
        </div>
      </GameContainer>
    )
  }

  if (gameWon) {
    return (
      <GameContainer title="Design Matcher" icon="🎨" difficulty={difficulty}>
        <motion.div className="glass-card p-12 text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-white mb-4">Perfect Match!</h2>
          <p className="text-2xl text-christmas-gold mb-6">Score: {score} points</p>
          <div className="flex justify-center gap-4">
            <motion.button onClick={() => setStarted(false)} className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Play Again
            </motion.button>
            <motion.button onClick={() => window.location.href = '/'} className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </GameContainer>
    )
  }

  if (lives === 0) {
    return (
      <GameContainer title="Design Matcher" icon="🎨" difficulty={difficulty}>
        <motion.div className="glass-card p-12 text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="text-8xl mb-6">😢</div>
          <h2 className="text-4xl font-bold text-white mb-4">Game Over</h2>
          <p className="text-xl text-white/80 mb-6">Keep practicing your design skills!</p>
          <motion.button onClick={() => setStarted(false)} className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Try Again
          </motion.button>
        </motion.div>
      </GameContainer>
    )
  }

  const currentChallenge = DESIGN_CHALLENGES[currentQuestion]

  return (
    <GameContainer title="Design Matcher" icon="🎨" difficulty={difficulty}>
      <div className="space-y-4">
        <GameHUD score={score} lives={lives} maxLives={3} hints={hints} maxHints={3} onUseHint={useHint} />

        <div className="glass-card p-4 text-center">
          <div className="text-white/70 text-sm">Question {currentQuestion + 1} of {questionsToAnswer}</div>
          {combo > 1 && (
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🔥 COMBO x{combo}!
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div className="glass-card p-4 mb-6 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <p className="text-white font-semibold text-lg">{feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{currentChallenge.question}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentChallenge.options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => !selectedAnswer && handleAnswer(option.id)}
              disabled={selectedAnswer !== null}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedAnswer === option.id
                  ? option.correct
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-red-500/20 border-red-500'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              } ${selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
              whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
            >
              <div className="text-white font-semibold mb-2">{option.label}</div>
              {currentChallenge.type === 'color' && (
                <div className="flex gap-2 justify-center">
                  {option.value.split(' ').map((color, i) => (
                    <div key={i} className="w-16 h-16 rounded" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              )}
              {selectedAnswer === option.id && (
                <div className="mt-2 text-2xl">{option.correct ? '✅' : '❌'}</div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </GameContainer>
  )
}
