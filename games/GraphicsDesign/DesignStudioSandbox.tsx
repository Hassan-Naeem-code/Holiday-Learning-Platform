'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SandboxContainer from '@/components/Sandbox/SandboxContainer'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useUserStore } from '@/stores/userStore'
import { achievementManager } from '@/utils/achievementManager'

interface DesignElement {
  id: string
  type: 'rectangle' | 'circle' | 'text'
  x: number
  y: number
  width: number
  height: number
  color: string
  text?: string
}

export default function DesignStudioSandbox() {
  const [elements, setElements] = useState<DesignElement[]>([])
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [selectedTool, setSelectedTool] = useState<'rectangle' | 'circle' | 'text'>('rectangle')
  const [timeSpent, setTimeSpent] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const canvasRef = useRef<HTMLDivElement>(null)

  const { updateTopicProgress } = useTutorialStore()
  const { addXP } = useUserStore()

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      setTimeSpent(elapsed)
      if (elapsed % 300 === 0 && elapsed > 0) addXP(20)
      if (elapsed >= 1800) achievementManager.checkAll()
    }, 1000)
    return () => clearInterval(interval)
  }, [addXP])

  useEffect(() => {
    if (elements.length > 0) {
      const progressPercent = Math.min(100, elements.length * 10)
      updateTopicProgress('graphics-design', 'sandbox', progressPercent)
    }
  }, [elements.length, updateTopicProgress])

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newElement: DesignElement = {
      id: `element-${Date.now()}`,
      type: selectedTool,
      x,
      y,
      width: selectedTool === 'circle' ? 80 : 120,
      height: selectedTool === 'circle' ? 80 : 80,
      color: selectedColor,
      text: selectedTool === 'text' ? 'Text' : undefined
    }

    setElements([...elements, newElement])
  }

  const removeElement = (id: string) => {
    setElements(elements.filter(e => e.id !== id))
  }

  const clearCanvas = () => {
    setElements([])
  }

  const colors = ['#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#000000', '#FFFFFF']

  return (
    <SandboxContainer title="Design Studio" icon="🎨" onRun={() => {}} onReset={clearCanvas} isRunning={false}>
      <div className="glass-card p-4 mb-6 text-center">
        <div className="text-white/70 text-sm mb-1">Time Creating</div>
        <div className="text-2xl font-bold text-christmas-gold">
          {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">🎨 Tools</h3>
          <div className="space-y-3">
            <button onClick={() => setSelectedTool('rectangle')} className={`w-full p-3 rounded-lg ${selectedTool === 'rectangle' ? 'bg-blue-500' : 'bg-white/10'} text-white`}>
              ◼️ Rectangle
            </button>
            <button onClick={() => setSelectedTool('circle')} className={`w-full p-3 rounded-lg ${selectedTool === 'circle' ? 'bg-blue-500' : 'bg-white/10'} text-white`}>
              ⭕ Circle
            </button>
            <button onClick={() => setSelectedTool('text')} className={`w-full p-3 rounded-lg ${selectedTool === 'text' ? 'bg-blue-500' : 'bg-white/10'} text-white`}>
              📝 Text
            </button>
          </div>

          <h3 className="text-xl font-bold text-white mb-4 mt-6">🎨 Colors</h3>
          <div className="grid grid-cols-3 gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-full h-12 rounded-lg border-2 ${selectedColor === color ? 'border-christmas-gold scale-110' : 'border-white/20'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="glass-card p-6 lg:col-span-3">
          <h3 className="text-xl font-bold text-white mb-4">🖼️ Canvas</h3>
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="relative bg-white rounded-lg cursor-crosshair"
            style={{ height: '500px' }}
          >
            {elements.map(element => (
              <motion.div
                key={element.id}
                className="absolute group"
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  backgroundColor: element.type !== 'text' ? element.color : 'transparent',
                  borderRadius: element.type === 'circle' ? '50%' : '4px',
                  color: element.type === 'text' ? element.color : 'transparent',
                  fontSize: element.type === 'text' ? '24px' : '0',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {element.text}
                <button
                  onClick={(e) => { e.stopPropagation(); removeElement(element.id); }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </motion.div>
            ))}
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎨</div>
                  <p>Click to add design elements</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SandboxContainer>
  )
}
