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

interface ProgramBlock {
  id: string
  type: 'print' | 'variable' | 'math' | 'if' | 'loop'
  label: string
  icon: string
  value?: string
}

const AVAILABLE_BLOCKS: ProgramBlock[] = [
  { id: 'print-1', type: 'print', label: 'Print Message', icon: '📢', value: 'Hello World!' },
  { id: 'var-1', type: 'variable', label: 'Set Variable', icon: '📦', value: 'x = 10' },
  { id: 'math-1', type: 'math', label: 'Calculate', icon: '🧮', value: 'x + 5' },
  { id: 'if-1', type: 'if', label: 'If Statement', icon: '🔀', value: 'if x > 5' },
  { id: 'loop-1', type: 'loop', label: 'Repeat 3 times', icon: '🔄', value: 'repeat 3' },
]

export default function CodeSimulator() {
  const [program, setProgram] = useState<ProgramBlock[]>([])
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [executingIndex, setExecutingIndex] = useState(-1)
  const [timeSpent, setTimeSpent] = useState(0)
  const startTimeRef = useRef<number>(Date.now())

  const { updateTopicProgress } = useTutorialStore()
  const { addXP } = useUserStore()

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      setTimeSpent(elapsed)

      // Award XP every 5 minutes
      if (elapsed % 300 === 0 && elapsed > 0) {
        addXP(20)
      }

      // Check for "Experimenter" achievement (30 minutes)
      if (elapsed >= 1800) {
        achievementManager.checkAll()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [addXP])

  // Update progress when program is built
  useEffect(() => {
    if (program.length > 0) {
      const progressPercent = Math.min(100, program.length * 20)
      updateTopicProgress('software-dev', 'sandbox', progressPercent)
    }
  }, [program.length, updateTopicProgress])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const blockId = active.id as string
    const block = AVAILABLE_BLOCKS.find(b => b.id === blockId)

    if (block && over.id === 'program-area') {
      setProgram([...program, { ...block, id: `${block.id}-${Date.now()}` }])
    }
  }

  const removeBlock = (index: number) => {
    setProgram(program.filter((_, i) => i !== index))
  }

  const runProgram = async () => {
    setIsRunning(true)
    setOutput([])
    const newOutput: string[] = []

    for (let i = 0; i < program.length; i++) {
      setExecutingIndex(i)
      await new Promise(resolve => setTimeout(resolve, 800))

      const block = program[i]

      switch (block.type) {
        case 'print':
          newOutput.push(`📢 ${block.value}`)
          break
        case 'variable':
          newOutput.push(`📦 Set ${block.value}`)
          break
        case 'math':
          if (block.value) {
            newOutput.push(`🧮 Result: ${block.value} = ${eval(block.value.replace('x', '10'))}`)
          }
          break
        case 'if':
          newOutput.push(`🔀 Checking: ${block.value}`)
          break
        case 'loop':
          newOutput.push(`🔄 Starting loop...`)
          for (let j = 0; j < 3; j++) {
            newOutput.push(`   Loop iteration ${j + 1}`)
          }
          break
      }

      setOutput([...newOutput])
    }

    setExecutingIndex(-1)
    setIsRunning(false)
  }

  const resetProgram = () => {
    setProgram([])
    setOutput([])
    setExecutingIndex(-1)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SandboxContainer
        title="Code Simulator"
        icon="💻"
        onRun={runProgram}
        onReset={resetProgram}
        isRunning={isRunning}
      >
        {/* Time Tracker */}
        <div className="glass-card p-4 mb-6 text-center">
          <div className="text-white/70 text-sm mb-1">Time Spent</div>
          <div className="text-2xl font-bold text-christmas-gold">
            {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Blocks */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">📚 Block Library</h3>
            <p className="text-white/70 text-sm mb-4">
              Drag blocks to the program area to build your code
            </p>
            <div className="space-y-3">
              {AVAILABLE_BLOCKS.map((block) => (
                <DraggableItem key={block.id} id={block.id}>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 rounded-lg p-4 cursor-grab active:cursor-grabbing">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{block.icon}</span>
                      <div>
                        <div className="text-white font-semibold text-sm">{block.label}</div>
                        <div className="text-white/60 text-xs font-mono">{block.value}</div>
                      </div>
                    </div>
                  </div>
                </DraggableItem>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded">
              <p className="text-white/80 text-sm">
                💡 <strong>Tip:</strong> Arrange blocks in order, then click "Run" to see your program execute!
              </p>
            </div>
          </div>

          {/* Program Area */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">⚙️ Your Program</h3>
            <DragDropZone id="program-area" className="min-h-[400px]">
              {program.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👇</div>
                  <p className="text-white/50">
                    Drop blocks here to build your program
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {program.map((block, index) => (
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
                            <div className="text-white/60 text-xs font-mono">{block.value}</div>
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
            <h3 className="text-xl font-bold text-white mb-4">📟 Output Console</h3>
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
                      transition={{ delay: index * 0.1 }}
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
                  ⏳ Executing...
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
                  ✅ Program completed successfully!
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Templates Section */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-xl font-bold text-white mb-4">📝 Try These Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              onClick={() => {
                setProgram([
                  { ...AVAILABLE_BLOCKS[0], id: 'temp-1' },
                  { ...AVAILABLE_BLOCKS[1], id: 'temp-2' },
                  { ...AVAILABLE_BLOCKS[2], id: 'temp-3' },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-white font-semibold mb-1">Simple Calculator</div>
              <div className="text-white/60 text-xs">Print, Variable, Math</div>
            </motion.button>

            <motion.button
              onClick={() => {
                setProgram([
                  { ...AVAILABLE_BLOCKS[1], id: 'temp-4' },
                  { ...AVAILABLE_BLOCKS[3], id: 'temp-5' },
                  { ...AVAILABLE_BLOCKS[0], id: 'temp-6' },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">🔀</div>
              <div className="text-white font-semibold mb-1">Conditional Logic</div>
              <div className="text-white/60 text-xs">Variable, If, Print</div>
            </motion.button>

            <motion.button
              onClick={() => {
                setProgram([
                  { ...AVAILABLE_BLOCKS[4], id: 'temp-7' },
                  { ...AVAILABLE_BLOCKS[0], id: 'temp-8' },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">🔄</div>
              <div className="text-white font-semibold mb-1">Loop Example</div>
              <div className="text-white/60 text-xs">Loop, Print</div>
            </motion.button>
          </div>
        </div>
      </SandboxContainer>
    </DndContext>
  )
}
