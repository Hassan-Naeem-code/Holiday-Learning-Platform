'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { soundManager } from '@/utils/soundManager'

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface QuizComponentProps {
  questions: QuizQuestion[]
  onComplete: (score: number) => void
}

export default function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false))

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer

    if (isCorrect) {
      setCorrectCount(correctCount + 1)
      soundManager.playSuccess()
    } else {
      soundManager.playError()
    }

    setShowExplanation(true)
    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Quiz complete
      const finalScore = Math.round((correctCount / questions.length) * 100)
      onComplete(finalScore)
    }
  }

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <div className="glass-card p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">Quiz Time! 📝</h3>
          <span className="text-white/70">
            Question {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-christmas-gold h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-xl text-white font-semibold mb-6">
          {question.question}
        </h4>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isThisCorrect = index === question.correctAnswer

            let bgClass = 'bg-white/5 hover:bg-white/10'
            let borderClass = 'border-white/20'

            if (showExplanation) {
              if (isThisCorrect) {
                bgClass = 'bg-green-500/20'
                borderClass = 'border-green-500'
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-red-500/20'
                borderClass = 'border-red-500'
              }
            } else if (isSelected) {
              bgClass = 'bg-christmas-gold/20'
              borderClass = 'border-christmas-gold'
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  ${bgClass} ${borderClass}
                  ${showExplanation ? 'cursor-default' : 'cursor-pointer'}
                  disabled:opacity-100
                `}
                whileHover={!showExplanation ? { scale: 1.02 } : {}}
                whileTap={!showExplanation ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{option}</span>

                  {showExplanation && isThisCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && question.explanation && (
        <motion.div
          className={`p-4 rounded-lg border-2 mb-6 ${
            isCorrect
              ? 'bg-green-500/10 border-green-500'
              : 'bg-blue-500/10 border-blue-500'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-white/90">
            {isCorrect ? '✅ Correct! ' : '💡 '}{question.explanation}
          </p>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-white/70 text-sm">
          Score: {correctCount} / {answeredQuestions.filter(Boolean).length}
        </div>

        {!showExplanation ? (
          <motion.button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`btn ${selectedAnswer !== null ? 'btn-primary' : 'opacity-50 cursor-not-allowed bg-white/10'}`}
            whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
            whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
          >
            Submit Answer
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </motion.button>
        )}
      </div>
    </div>
  )
}
