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
import { rateLimiter } from '@/utils/security'
import confetti from 'canvas-confetti'

interface NetworkNode {
  id: string
  layer: 'input' | 'hidden' | 'output'
  label: string
  icon: string
  color: string
}

const NETWORK_NODES: NetworkNode[] = [
  { id: 'input-1', layer: 'input', label: 'Input 1', icon: '📥', color: 'bg-blue-500' },
  { id: 'input-2', layer: 'input', label: 'Input 2', icon: '📥', color: 'bg-blue-500' },
  { id: 'input-3', layer: 'input', label: 'Input 3', icon: '📥', color: 'bg-blue-500' },
  { id: 'hidden-1', layer: 'hidden', label: 'Hidden 1', icon: '🧠', color: 'bg-purple-500' },
  { id: 'hidden-2', layer: 'hidden', label: 'Hidden 2', icon: '🧠', color: 'bg-purple-500' },
  { id: 'hidden-3', layer: 'hidden', label: 'Hidden 3', icon: '🧠', color: 'bg-purple-500' },
  { id: 'hidden-4', layer: 'hidden', label: 'Hidden 4', icon: '🧠', color: 'bg-purple-500' },
  { id: 'output-1', layer: 'output', label: 'Output 1', icon: '📤', color: 'bg-green-500' },
  { id: 'output-2', layer: 'output', label: 'Output 2', icon: '📤', color: 'bg-green-500' },
]

const LEVEL_SOLUTIONS = {
  easy: {
    input: ['input-1', 'input-2'],
    hidden: ['hidden-1', 'hidden-2'],
    output: ['output-1']
  },
  medium: {
    input: ['input-1', 'input-2', 'input-3'],
    hidden: ['hidden-1', 'hidden-2', 'hidden-3'],
    output: ['output-1', 'output-2']
  },
  hard: {
    input: ['input-1', 'input-2', 'input-3'],
    hidden: ['hidden-1', 'hidden-2', 'hidden-3', 'hidden-4'],
    output: ['output-1', 'output-2']
  },
}

type Difficulty = 'easy' | 'medium' | 'hard'

export default function NeuralNetworkGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [started, setStarted] = useState(false)
  const [inputLayer, setInputLayer] = useState<string[]>([])
  const [hiddenLayer, setHiddenLayer] = useState<string[]>([])
  const [outputLayer, setOutputLayer] = useState<string[]>([])
  const [availableNodes, setAvailableNodes] = useState<NetworkNode[]>(NETWORK_NODES)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [hints, setHints] = useState(3)
  const [feedback, setFeedback] = useState<string>('')
  const [gameWon, setGameWon] = useState(false)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)

  const { addXP } = useUserStore()
  const { updateTopicProgress } = useTutorialStore()

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const nodeId = active.id as string
    const node = NETWORK_NODES.find(n => n.id === nodeId)
    const zoneId = over.id as string

    if (!node) return

    setAvailableNodes(availableNodes.filter(n => n.id !== nodeId))

    if (zoneId.startsWith('input-')) {
      const index = parseInt(zoneId.split('-')[2])
      const newLayer = [...inputLayer]
      newLayer[index] = nodeId
      setInputLayer(newLayer)
    } else if (zoneId.startsWith('hidden-')) {
      const index = parseInt(zoneId.split('-')[2])
      const newLayer = [...hiddenLayer]
      newLayer[index] = nodeId
      setHiddenLayer(newLayer)
    } else if (zoneId.startsWith('output-')) {
      const index = parseInt(zoneId.split('-')[2])
      const newLayer = [...outputLayer]
      newLayer[index] = nodeId
      setOutputLayer(newLayer)
    }

    const correct = LEVEL_SOLUTIONS[difficulty]
    const totalCorrect =
      inputLayer.filter((n, i) => n && n === correct.input[i]).length +
      hiddenLayer.filter((n, i) => n && n === correct.hidden[i]).length +
      outputLayer.filter((n, i) => n && n === correct.output[i]).length

    const totalPlaced =
      inputLayer.filter(Boolean).length +
      hiddenLayer.filter(Boolean).length +
      outputLayer.filter(Boolean).length

    if (totalCorrect === totalPlaced && totalPlaced > 0) {
      const newCombo = combo + 1
      setCombo(newCombo)
      if (newCombo > bestCombo) setBestCombo(newCombo)

      const comboBonus = newCombo * 10
      setScore(score + comboBonus)

      soundManager.playCombo(newCombo)
      setFeedback(`🔥 Combo x${newCombo}! +${comboBonus} bonus points!`)
    } else {
      setCombo(0)
      soundManager.playSuccess()
      setFeedback('Node placed! 👍')
    }

    setTimeout(() => setFeedback(''), 2000)
  }

  const removeNode = (layer: 'input' | 'hidden' | 'output', index: number) => {
    let nodeId = ''
    if (layer === 'input') {
      nodeId = inputLayer[index]
      const newLayer = [...inputLayer]
      newLayer[index] = ''
      setInputLayer(newLayer.filter(s => s))
    } else if (layer === 'hidden') {
      nodeId = hiddenLayer[index]
      const newLayer = [...hiddenLayer]
      newLayer[index] = ''
      setHiddenLayer(newLayer.filter(s => s))
    } else {
      nodeId = outputLayer[index]
      const newLayer = [...outputLayer]
      newLayer[index] = ''
      setOutputLayer(newLayer.filter(s => s))
    }

    const node = NETWORK_NODES.find(n => n.id === nodeId)
    if (node) {
      setAvailableNodes([...availableNodes, node])
    }
  }

  const checkSolution = () => {
    if (!rateLimiter.check('game-submission', 10, 60000)) {
      setFeedback('⏳ Too many attempts! Please wait a moment.')
      setTimeout(() => setFeedback(''), 3000)
      return
    }

    const correct = LEVEL_SOLUTIONS[difficulty]
    const isCorrect =
      inputLayer.length === correct.input.length &&
      inputLayer.every((node, idx) => node === correct.input[idx]) &&
      hiddenLayer.length === correct.hidden.length &&
      hiddenLayer.every((node, idx) => node === correct.hidden[idx]) &&
      outputLayer.length === correct.output.length &&
      outputLayer.every((node, idx) => node === correct.output[idx])

    if (isCorrect) {
      setGameWon(true)
      const points = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 200 : 300
      setScore(score + points)
      addXP(points)

      const progressPercent = difficulty === 'easy' ? 33 : difficulty === 'medium' ? 66 : 100
      updateTopicProgress('ai-ml', 'game', progressPercent)

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      setFeedback('🎉 Perfect! Neural network complete!')
      soundManager.playWin()

      setTimeout(() => {
        achievementManager.checkAll()
      }, 1000)
    } else {
      setLives(lives - 1)
      setFeedback('❌ Not quite right. Check the network structure!')
      soundManager.playError()
      setTimeout(() => setFeedback(''), 2000)
    }
  }

  const useHint = () => {
    if (hints > 0) {
      setHints(hints - 1)
      soundManager.playHint()
      setFeedback(`💡 Hint: Build a network with Input → Hidden → Output layers!`)
      setTimeout(() => setFeedback(''), 5000)
    }
  }

  const startGame = () => {
    setStarted(true)
    setInputLayer([])
    setHiddenLayer([])
    setOutputLayer([])
    setLives(3)
    setHints(3)
    setScore(0)
    setGameWon(false)
    setCombo(0)
    setBestCombo(0)
    setAvailableNodes(NETWORK_NODES)
  }

  if (!started) {
    return (
      <GameContainer title="Neural Network Builder" icon="🤖">
        <div className="glass-card p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="text-8xl mb-6">🧠</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Neural Network Builder
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Build a neural network by connecting nodes in layers!
              Arrange Input, Hidden, and Output nodes to create a working AI model.
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
                        ? 'bg-christmas-gold text-gray-900'
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

  if (gameWon) {
    return (
      <GameContainer title="Neural Network Builder" icon="🤖" difficulty={difficulty}>
        <motion.div
          className="glass-card p-12 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Level Complete!
          </h2>
          <p className="text-2xl text-christmas-gold mb-6">
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

  if (lives === 0) {
    return (
      <GameContainer title="Neural Network Builder" icon="🤖" difficulty={difficulty}>
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
            Don't give up! Try again and build that perfect network!
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

  const solution = LEVEL_SOLUTIONS[difficulty]

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <GameContainer title="Neural Network Builder" icon="🤖" difficulty={difficulty}>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Nodes */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">Available Nodes</h3>
            <div className="space-y-2">
              {availableNodes.map((node) => (
                <DraggableItem key={node.id} id={node.id}>
                  <div className={`${node.color} rounded-lg p-3 text-white text-center font-bold text-sm`}>
                    <div className="text-xl mb-1">{node.icon}</div>
                    <div className="text-xs">{node.label}</div>
                  </div>
                </DraggableItem>
              ))}
            </div>
          </div>

          {/* Input Layer */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">📥 Input Layer</h3>
            <div className="space-y-3">
              {Array.from({ length: solution.input.length }).map((_, index) => (
                <DragDropZone key={index} id={`input-layer-${index}`} isEmpty={!inputLayer[index]}>
                  {inputLayer[index] && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">
                          {NETWORK_NODES.find(n => n.id === inputLayer[index])?.icon}
                        </span>
                        <span className="text-white font-bold text-sm">
                          {NETWORK_NODES.find(n => n.id === inputLayer[index])?.label}
                        </span>
                      </div>
                      <button
                        onClick={() => removeNode('input', index)}
                        className="text-red-400 hover:text-red-300 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </DragDropZone>
              ))}
            </div>
          </div>

          {/* Hidden Layer */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">🧠 Hidden Layer</h3>
            <div className="space-y-3">
              {Array.from({ length: solution.hidden.length }).map((_, index) => (
                <DragDropZone key={index} id={`hidden-layer-${index}`} isEmpty={!hiddenLayer[index]}>
                  {hiddenLayer[index] && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">
                          {NETWORK_NODES.find(n => n.id === hiddenLayer[index])?.icon}
                        </span>
                        <span className="text-white font-bold text-sm">
                          {NETWORK_NODES.find(n => n.id === hiddenLayer[index])?.label}
                        </span>
                      </div>
                      <button
                        onClick={() => removeNode('hidden', index)}
                        className="text-red-400 hover:text-red-300 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </DragDropZone>
              ))}
            </div>
          </div>

          {/* Output Layer */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">📤 Output Layer</h3>
            <div className="space-y-3">
              {Array.from({ length: solution.output.length }).map((_, index) => (
                <DragDropZone key={index} id={`output-layer-${index}`} isEmpty={!outputLayer[index]}>
                  {outputLayer[index] && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">
                          {NETWORK_NODES.find(n => n.id === outputLayer[index])?.icon}
                        </span>
                        <span className="text-white font-bold text-sm">
                          {NETWORK_NODES.find(n => n.id === outputLayer[index])?.label}
                        </span>
                      </div>
                      <button
                        onClick={() => removeNode('output', index)}
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
              disabled={
                inputLayer.length !== solution.input.length ||
                hiddenLayer.length !== solution.hidden.length ||
                outputLayer.length !== solution.output.length
              }
              className={`btn w-full mt-6 ${
                inputLayer.length === solution.input.length &&
                hiddenLayer.length === solution.hidden.length &&
                outputLayer.length === solution.output.length
                  ? 'btn-primary'
                  : 'opacity-50 cursor-not-allowed bg-white/10'
              }`}
              whileHover={
                inputLayer.length === solution.input.length &&
                hiddenLayer.length === solution.hidden.length &&
                outputLayer.length === solution.output.length
                  ? { scale: 1.02 }
                  : {}
              }
              whileTap={
                inputLayer.length === solution.input.length &&
                hiddenLayer.length === solution.hidden.length &&
                outputLayer.length === solution.output.length
                  ? { scale: 0.98 }
                  : {}
              }
            >
              Check Network
            </motion.button>
          </div>
        </div>

        <DragOverlay>
          {activeId && (
            <div className="bg-christmas-gold rounded-lg p-3 text-gray-900 text-center font-bold opacity-90">
              <div className="text-xl mb-1">
                {NETWORK_NODES.find(n => n.id === activeId)?.icon}
              </div>
              <div className="text-xs">{NETWORK_NODES.find(n => n.id === activeId)?.label}</div>
            </div>
          )}
        </DragOverlay>
      </GameContainer>
    </DndContext>
  )
}
