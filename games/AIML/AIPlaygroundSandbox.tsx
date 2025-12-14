'use client'

import { useState, useEffect, useRef } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import SandboxContainer from '@/components/Sandbox/SandboxContainer'
import DraggableItem from '@/components/Games/DraggableItem'
import DragDropZone from '@/components/Games/DragDropZone'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useUserStore } from '@/stores/userStore'
import { achievementManager } from '@/utils/achievementManager'

interface AIBlock {
  id: string
  type: 'data' | 'train' | 'predict' | 'evaluate'
  label: string
  icon: string
}

const AVAILABLE_BLOCKS: AIBlock[] = [
  { id: 'data-1', type: 'data', label: 'Load Data', icon: '📊' },
  { id: 'train-1', type: 'train', label: 'Train Model', icon: '🎓' },
  { id: 'predict-1', type: 'predict', label: 'Make Prediction', icon: '🔮' },
  { id: 'evaluate-1', type: 'evaluate', label: 'Evaluate Results', icon: '📈' },
]

export default function AIPlaygroundSandbox() {
  const [pipeline, setPipeline] = useState<AIBlock[]>([])
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [executingIndex, setExecutingIndex] = useState(-1)
  const [timeSpent, setTimeSpent] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const startTimeRef = useRef<number>(Date.now())

  const { updateTopicProgress } = useTutorialStore()
  const { addXP } = useUserStore()

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      setTimeSpent(elapsed)

      if (elapsed % 300 === 0 && elapsed > 0) {
        addXP(20)
      }

      if (elapsed >= 1800) {
        achievementManager.checkAll()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [addXP])

  useEffect(() => {
    if (pipeline.length > 0) {
      const progressPercent = Math.min(100, pipeline.length * 25)
      updateTopicProgress('ai-ml', 'sandbox', progressPercent)
    }
  }, [pipeline.length, updateTopicProgress])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const blockId = active.id as string
    const block = AVAILABLE_BLOCKS.find(b => b.id === blockId)

    if (block && over.id === 'pipeline-area') {
      setPipeline([...pipeline, { ...block, id: `${block.id}-${Date.now()}` }])
    }
  }

  const removeBlock = (index: number) => {
    setPipeline(pipeline.filter((_, i) => i !== index))
  }

  const runPipeline = async () => {
    setIsRunning(true)
    setOutput([])
    const newOutput: string[] = []
    let currentAccuracy = 0

    for (let i = 0; i < pipeline.length; i++) {
      setExecutingIndex(i)
      await new Promise(resolve => setTimeout(resolve, 1000))

      const block = pipeline[i]

      switch (block.type) {
        case 'data':
          newOutput.push(`📊 Loading dataset... Found 1,000 samples`)
          newOutput.push(`   ✓ Data ready for training`)
          currentAccuracy += 20
          break
        case 'train':
          newOutput.push(`🎓 Training AI model...`)
          newOutput.push(`   Epoch 1/3... Loss: 0.45`)
          await new Promise(resolve => setTimeout(resolve, 500))
          newOutput.push(`   Epoch 2/3... Loss: 0.28`)
          await new Promise(resolve => setTimeout(resolve, 500))
          newOutput.push(`   Epoch 3/3... Loss: 0.12`)
          newOutput.push(`   ✓ Model trained successfully!`)
          currentAccuracy += 40
          break
        case 'predict':
          newOutput.push(`🔮 Making predictions on test data...`)
          newOutput.push(`   Prediction 1: Cat (98% confidence)`)
          newOutput.push(`   Prediction 2: Dog (95% confidence)`)
          newOutput.push(`   Prediction 3: Bird (87% confidence)`)
          newOutput.push(`   ✓ Predictions complete!`)
          currentAccuracy += 20
          break
        case 'evaluate':
          const finalAccuracy = Math.min(95, currentAccuracy + Math.random() * 10)
          setAccuracy(finalAccuracy)
          newOutput.push(`📈 Evaluating model performance...`)
          newOutput.push(`   Accuracy: ${finalAccuracy.toFixed(1)}%`)
          newOutput.push(`   Precision: ${(finalAccuracy - 3).toFixed(1)}%`)
          newOutput.push(`   Recall: ${(finalAccuracy - 2).toFixed(1)}%`)
          newOutput.push(`   ✓ Model is performing well!`)
          currentAccuracy += 20
          break
      }

      setOutput([...newOutput])
    }

    setExecutingIndex(-1)
    setIsRunning(false)
  }

  const resetPipeline = () => {
    setPipeline([])
    setOutput([])
    setExecutingIndex(-1)
    setAccuracy(0)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SandboxContainer
        title="AI Playground"
        icon="🤖"
        onRun={runPipeline}
        onReset={resetPipeline}
        isRunning={isRunning}
      >
        <div className="glass-card p-4 mb-6 text-center">
          <div className="text-white/70 text-sm mb-1">Time Experimenting</div>
          <div className="text-2xl font-bold text-christmas-gold">
            {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
          </div>
          {accuracy > 0 && (
            <div className="mt-2">
              <div className="text-white/70 text-sm">Model Accuracy</div>
              <div className="text-3xl font-bold text-green-400">{accuracy.toFixed(1)}%</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Blocks */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">🧩 AI Building Blocks</h3>
            <p className="text-white/70 text-sm mb-4">
              Drag blocks to build your AI training pipeline
            </p>
            <div className="space-y-3">
              {AVAILABLE_BLOCKS.map((block) => (
                <DraggableItem key={block.id} id={block.id}>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 rounded-lg p-4 cursor-grab active:cursor-grabbing">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{block.icon}</span>
                      <div>
                        <div className="text-white font-semibold text-sm">{block.label}</div>
                        <div className="text-white/60 text-xs">{block.type}</div>
                      </div>
                    </div>
                  </div>
                </DraggableItem>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded">
              <p className="text-white/80 text-sm">
                💡 <strong>Tip:</strong> Build a complete pipeline: Load Data → Train → Predict → Evaluate!
              </p>
            </div>
          </div>

          {/* Pipeline Area */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">🔧 AI Pipeline</h3>
            <DragDropZone id="pipeline-area" className="min-h-[400px]">
              {pipeline.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🤖</div>
                  <p className="text-white/50">
                    Drop AI blocks here to build your pipeline
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pipeline.map((block, index) => (
                    <motion.div
                      key={block.id}
                      className={`
                        bg-white/5 border-2 rounded-lg p-3 relative
                        ${executingIndex === index
                          ? 'border-christmas-gold bg-christmas-gold/20 scale-105'
                          : 'border-white/20'}
                      `}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{block.icon}</span>
                          <div>
                            <div className="text-white font-semibold text-sm">
                              {index + 1}. {block.label}
                            </div>
                            <div className="text-white/60 text-xs">{block.type}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeBlock(index)}
                          disabled={isRunning}
                          className="text-red-400 hover:text-red-300 font-bold disabled:opacity-30"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </DragDropZone>
          </div>

          {/* Output Console */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">📟 AI Console</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 min-h-[400px] font-mono text-sm">
              {output.length === 0 ? (
                <div className="text-white/30 text-center py-12">
                  <div className="text-4xl mb-2">▶️</div>
                  <p>Output will appear here...</p>
                </div>
              ) : (
                <AnimatePresence>
                  {output.map((line, index) => (
                    <motion.div
                      key={index}
                      className="text-green-400 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {line}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {isRunning && (
                <motion.div
                  className="text-yellow-400 mt-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⏳ Processing...
                </motion.div>
              )}
            </div>

            {output.length > 0 && !isRunning && (
              <motion.div
                className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-green-400 font-semibold">
                  ✅ AI pipeline completed successfully!
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Templates Section */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-xl font-bold text-white mb-4">📝 Quick Pipelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              onClick={() => {
                setPipeline([
                  { ...AVAILABLE_BLOCKS[0], id: 'temp-1' },
                  { ...AVAILABLE_BLOCKS[1], id: 'temp-2' },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-white font-semibold mb-1">Simple Training</div>
              <div className="text-white/60 text-xs">Load Data, Train Model</div>
            </motion.button>

            <motion.button
              onClick={() => {
                setPipeline([
                  { ...AVAILABLE_BLOCKS[0], id: 'temp-3' },
                  { ...AVAILABLE_BLOCKS[1], id: 'temp-4' },
                  { ...AVAILABLE_BLOCKS[2], id: 'temp-5' },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">🔮</div>
              <div className="text-white font-semibold mb-1">Train & Predict</div>
              <div className="text-white/60 text-xs">Load, Train, Predict</div>
            </motion.button>

            <motion.button
              onClick={() => {
                setPipeline([
                  { ...AVAILABLE_BLOCKS[0], id: 'temp-6' },
                  { ...AVAILABLE_BLOCKS[1], id: 'temp-7' },
                  { ...AVAILABLE_BLOCKS[2], id: 'temp-8' },
                  { ...AVAILABLE_BLOCKS[3], id: 'temp-9' },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="text-white font-semibold mb-1">Full Pipeline</div>
              <div className="text-white/60 text-xs">Complete AI workflow</div>
            </motion.button>
          </div>
        </div>
      </SandboxContainer>
    </DndContext>
  )
}
