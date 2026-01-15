'use client'

import { useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import GameContainer from '@/components/Games/GameContainer'
import GameHUD from '@/components/Games/GameHUD'
import DraggableItem from '@/components/Games/DraggableItem'
import DragDropZone from '@/components/Games/DragDropZone'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'
import { soundManager } from '@/utils/soundManager'
import { celebrateCompletion } from '@/utils/celebrationUtils'
import { GAME_XP_REWARDS } from '@/utils/gameConstants'
import { getDifficultyColor } from '@/utils/colorUtils'
import type { Difficulty, DraggableItem as DraggableItemType } from '@/types'

interface CodeBlock extends DraggableItemType {
  label: string
  color: string
}

const CODE_BLOCKS: CodeBlock[] = [
  { id: 'start', content: 'START', label: 'START', icon: '▶️', type: 'code', color: 'bg-green-500' },
  { id: 'input', content: 'INPUT', label: 'INPUT', icon: '📥', type: 'code', color: 'bg-blue-500' },
  { id: 'process', content: 'PROCESS', label: 'PROCESS', icon: '⚙️', type: 'code', color: 'bg-purple-500' },
  { id: 'compare', content: 'COMPARE', label: 'COMPARE', icon: '⚖️', type: 'code', color: 'bg-orange-500' },
  { id: 'loop', content: 'LOOP', label: 'LOOP', icon: '🔄', type: 'code', color: 'bg-pink-500' },
  { id: 'output', content: 'OUTPUT', label: 'OUTPUT', icon: '📤', type: 'code', color: 'bg-cyan-500' },
  { id: 'end', content: 'END', label: 'END', icon: '⏹️', type: 'code', color: 'bg-red-500' },
]

const LEVEL_SOLUTIONS: Record<Difficulty, string[]> = {
  easy: ['start', 'input', 'compare', 'output', 'end'],
  medium: ['start', 'input', 'process', 'compare', 'output', 'end'],
  hard: ['start', 'input', 'loop', 'process', 'compare', 'output', 'end'],
}

const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 100,
  medium: 200,
  hard: 300,
}

const DIFFICULTY_PROGRESS: Record<Difficulty, number> = {
  easy: 33,
  medium: 66,
  hard: 100,
}

export default function CodeBlockGame() {
  // Configuration
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [started, setStarted] = useState(false)

  // Game state - simplified
  const [solution, setSolution] = useState<string[]>([])
  const [availableBlocks, setAvailableBlocks] = useState<CodeBlock[]>(CODE_BLOCKS)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [hints, setHints] = useState(3)
  const [feedback, setFeedback] = useState('')
  const [gameWon, setGameWon] = useState(false)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)

  // Store hooks
  const { addXP } = useUserStore()
  const { updateTopicProgress } = useTutorialStore()

  // Drag handlers
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const blockId = active.id as string
    const zoneId = over.id as string

    if (zoneId.startsWith('drop-')) {
      const index = parseInt(zoneId.split('-')[1])
      const newSolution = [...solution]

      // Remove block from available
      setAvailableBlocks(availableBlocks.filter(b => b.id !== blockId))

      // Add to solution at index
      newSolution[index] = blockId
      setSolution(newSolution)

      // Validate placement for combo
      const correctSolution = LEVEL_SOLUTIONS[difficulty]
      const filledSlots = newSolution.filter(Boolean)
      const isCorrectPlacement = filledSlots.every((blockId, i) =>
        blockId === correctSolution[i]
      )

      if (isCorrectPlacement) {
        const newCombo = combo + 1
        setCombo(newCombo)
        if (newCombo > bestCombo) setBestCombo(newCombo)

        const comboBonus = newCombo * 10
        setScore(prev => prev + comboBonus)

        soundManager.playCombo(newCombo)
        setFeedback(`🔥 Combo x${newCombo}! +${comboBonus} bonus points!`)
      } else {
        setCombo(0)
        soundManager.playSuccess()
        setFeedback('Block placed! 👍')
      }

      setTimeout(() => setFeedback(''), 2000)
    }
  }

  const removeBlock = (index: number) => {
    const blockId = solution[index]
    const block = CODE_BLOCKS.find(b => b.id === blockId)

    if (block) {
      setAvailableBlocks([...availableBlocks, block])
    }

    const newSolution = [...solution]
    newSolution[index] = ''
    setSolution(newSolution.filter(s => s))
  }

  const checkSolution = () => {
    const correctSolution = LEVEL_SOLUTIONS[difficulty]
    const isCorrect =
      solution.length === correctSolution.length &&
      solution.every((block, idx) => block === correctSolution[idx])

    if (isCorrect) {
      setGameWon(true)

      const points = DIFFICULTY_POINTS[difficulty]
      setScore(prev => prev + points)
      addXP(points + GAME_XP_REWARDS.GAME_COMPLETION_BONUS)

      updateTopicProgress('software-dev', 'game', DIFFICULTY_PROGRESS[difficulty])

      celebrateCompletion()
      setFeedback('🎉 Perfect! Algorithm complete!')
      soundManager.playWin()

      setTimeout(() => {
        achievementManager.checkAll()
      }, 1000)
    } else {
      const newLives = lives - 1
      setLives(newLives)
      setCombo(0)
      setFeedback('❌ Not quite right. Try again!')
      soundManager.playError()
      setTimeout(() => setFeedback(''), 2000)
    }
  }

  const useHint = () => {
    if (hints > 0) {
      setHints(hints - 1)
      soundManager.playHint()

      const correctSolution = LEVEL_SOLUTIONS[difficulty]
      const nextIndex = solution.length

      if (nextIndex < correctSolution.length) {
        const nextBlockId = correctSolution[nextIndex]
        setFeedback(`💡 Hint: Next block should be "${nextBlockId.toUpperCase()}"`)
        setTimeout(() => setFeedback(''), 5000)
      }
    }
  }

  const startGame = () => {
    setStarted(true)
    setSolution([])
    setLives(3)
    setHints(3)
    setScore(0)
    setGameWon(false)
    setCombo(0)
    setBestCombo(0)
    setAvailableBlocks(CODE_BLOCKS)
    setFeedback('')
  }

  // Start screen
  if (!started) {
    return (
      <GameContainer title="Code Block Constructor" icon="💻">
        <div className="glass-card p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="text-8xl mb-6">🧩</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Code Block Constructor
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Drag and drop code blocks to create a working algorithm!
              Arrange them in the correct order to solve programming challenges.
            </p>

            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4">Select Difficulty:</h3>
              <div className="flex justify-center gap-4">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                      difficulty === diff
                        ? 'bg-brand-gold text-gray-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={startGame}
              className="btn btn-primary text-xl px-12 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </motion.div>
        </div>
      </GameContainer>
    )
  }

  // Win screen
  if (gameWon) {
    return (
      <GameContainer title="Code Block Constructor" icon="💻" difficulty={difficulty}>
        <motion.div
          className="glass-card p-12 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Level Complete!
          </h2>
          <p className="text-2xl text-brand-gold mb-6">
            Score: {score} points
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={() => setStarted(false)}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
            <motion.button
              onClick={() => window.location.href = '/'}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </GameContainer>
    )
  }

  // Game over screen
  if (lives === 0) {
    return (
      <GameContainer title="Code Block Constructor" icon="💻" difficulty={difficulty}>
        <motion.div
          className="glass-card p-12 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-8xl mb-6">😢</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Game Over
          </h2>
          <p className="text-xl text-white/80 mb-6">
            Don't give up! Try again and you'll get it!
          </p>
          <motion.button
            onClick={() => setStarted(false)}
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </GameContainer>
    )
  }

  // Main game UI
  const solutionLength = LEVEL_SOLUTIONS[difficulty].length

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <GameContainer title="Code Block Constructor" icon="💻" difficulty={difficulty}>
        <div className="space-y-4">
          <GameHUD
            score={score}
            lives={lives}
            maxLives={3}
            hints={hints}
            maxHints={3}
            onUseHint={useHint}
          />

          {combo > 1 && (
            <motion.div
              className="glass-card p-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                🔥 COMBO x{combo}!
              </div>
              <div className="text-white/70 text-sm mt-1">
                Best: {bestCombo}
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              className="glass-card p-4 mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="text-white font-semibold text-lg">{feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Blocks */}
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Available Blocks</h3>
            <div className="grid grid-cols-2 gap-3">
              {availableBlocks.map((block) => (
                <DraggableItem key={block.id} id={block.id}>
                  <div className={`${block.color} rounded-lg p-4 text-white text-center font-bold`}>
                    <div className="text-2xl mb-1">{block.icon}</div>
                    <div>{block.label}</div>
                  </div>
                </DraggableItem>
              ))}
            </div>
          </div>

          {/* Solution Area */}
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Build Your Algorithm</h3>
            <div className="space-y-3">
              {Array.from({ length: solutionLength }).map((_, index) => (
                <DragDropZone key={index} id={`drop-${index}`} isEmpty={!solution[index]}>
                  {solution[index] && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">
                          {CODE_BLOCKS.find(b => b.id === solution[index])?.icon}
                        </span>
                        <span className="text-white font-bold">
                          {CODE_BLOCKS.find(b => b.id === solution[index])?.label}
                        </span>
                      </div>
                      <button
                        onClick={() => removeBlock(index)}
                        className="text-red-400 hover:text-red-300 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </DragDropZone>
              ))}
            </div>

            <motion.button
              onClick={checkSolution}
              disabled={solution.length !== solutionLength}
              className={`btn w-full mt-6 ${
                solution.length === solutionLength
                  ? 'btn-primary'
                  : 'opacity-50 cursor-not-allowed bg-white/10'
              }`}
              whileHover={solution.length === solutionLength ? { scale: 1.02 } : {}}
              whileTap={solution.length === solutionLength ? { scale: 0.98 } : {}}
            >
              Check Solution
            </motion.button>
          </div>
        </div>

        <DragOverlay>
          {activeId && (
            <div className="bg-brand-gold rounded-lg p-4 text-gray-900 text-center font-bold opacity-90">
              <div className="text-2xl mb-1">
                {CODE_BLOCKS.find(b => b.id === activeId)?.icon}
              </div>
              <div>{CODE_BLOCKS.find(b => b.id === activeId)?.label}</div>
            </div>
          )}
        </DragOverlay>
      </GameContainer>
    </DndContext>
  )
}
