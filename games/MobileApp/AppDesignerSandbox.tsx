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

interface UIComponent {
  id: string
  type: 'button' | 'image' | 'text' | 'list' | 'input'
  label: string
  icon: string
  props?: any
}

const AVAILABLE_COMPONENTS: UIComponent[] = [
  { id: 'button-1', type: 'button', label: 'Button', icon: '🔘', props: { text: 'Click Me' } },
  { id: 'image-1', type: 'image', label: 'Image', icon: '🖼️', props: { src: 'placeholder' } },
  { id: 'text-1', type: 'text', label: 'Text', icon: '📝', props: { content: 'Hello World' } },
  { id: 'list-1', type: 'list', label: 'List', icon: '📋', props: { items: 3 } },
  { id: 'input-1', type: 'input', label: 'Text Input', icon: '⌨️', props: { placeholder: 'Enter text...' } },
]

export default function AppDesignerSandbox() {
  const [components, setComponents] = useState<UIComponent[]>([])
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

  // Update progress when components are added
  useEffect(() => {
    if (components.length > 0) {
      const progressPercent = Math.min(100, components.length * 15)
      updateTopicProgress('mobile-app', 'sandbox', progressPercent)
    }
  }, [components.length, updateTopicProgress])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const componentId = active.id as string
    const component = AVAILABLE_COMPONENTS.find(c => c.id === componentId)

    if (component && over.id === 'canvas-area') {
      setComponents([...components, { ...component, id: `${component.id}-${Date.now()}` }])
    }
  }

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index))
  }

  const updateComponentProp = (index: number, key: string, value: any) => {
    const newComponents = [...components]
    newComponents[index].props = { ...newComponents[index].props, [key]: value }
    setComponents(newComponents)
  }

  const resetCanvas = () => {
    setComponents([])
  }

  const renderComponent = (component: UIComponent, index: number) => {
    switch (component.type) {
      case 'button':
        return (
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
            {component.props?.text || 'Button'}
          </button>
        )
      case 'image':
        return (
          <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center text-4xl">
            🖼️
          </div>
        )
      case 'text':
        return (
          <p className="text-gray-800 text-lg">
            {component.props?.content || 'Text'}
          </p>
        )
      case 'list':
        return (
          <ul className="list-disc list-inside text-gray-800">
            {Array.from({ length: component.props?.items || 3 }).map((_, i) => (
              <li key={i}>List item {i + 1}</li>
            ))}
          </ul>
        )
      case 'input':
        return (
          <input
            type="text"
            placeholder={component.props?.placeholder || 'Enter text...'}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-64"
          />
        )
      default:
        return null
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SandboxContainer
        title="App Designer"
        icon="📱"
        onRun={() => {}}
        onReset={resetCanvas}
        isRunning={false}
      >
        {/* Time Tracker */}
        <div className="glass-card p-4 mb-6 text-center">
          <div className="text-white/70 text-sm mb-1">Time Spent Designing</div>
          <div className="text-2xl font-bold text-christmas-gold">
            {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Component Library */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">🎨 UI Components</h3>
            <p className="text-white/70 text-sm mb-4">
              Drag components to the canvas to build your app interface
            </p>
            <div className="space-y-3">
              {AVAILABLE_COMPONENTS.map((component) => (
                <DraggableItem key={component.id} id={component.id}>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-lg p-4 cursor-grab active:cursor-grabbing">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{component.icon}</span>
                      <div>
                        <div className="text-white font-semibold text-sm">{component.label}</div>
                        <div className="text-white/60 text-xs">{component.type}</div>
                      </div>
                    </div>
                  </div>
                </DraggableItem>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-500/10 border-l-4 border-purple-500 rounded">
              <p className="text-white/80 text-sm">
                💡 <strong>Tip:</strong> Build a complete app screen with buttons, text, images, and inputs!
              </p>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="glass-card p-6 lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">📱 App Preview</h3>

            {/* Phone Frame */}
            <div className="mx-auto" style={{ maxWidth: '375px' }}>
              <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
                {/* Phone Notch */}
                <div className="bg-black rounded-t-3xl h-8 flex items-center justify-center">
                  <div className="w-32 h-6 bg-gray-900 rounded-full"></div>
                </div>

                {/* Phone Screen */}
                <DragDropZone id="canvas-area" className="bg-white rounded-lg min-h-[600px] p-6">
                  {components.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <div className="text-6xl mb-4">📱</div>
                      <p className="text-center">Drop UI components here to build your app screen</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {components.map((component, index) => (
                        <motion.div
                          key={component.id}
                          className="relative group"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <div className="border-2 border-dashed border-transparent group-hover:border-blue-400 rounded-lg p-3 relative">
                            {renderComponent(component, index)}

                            <button
                              onClick={() => removeComponent(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Component Editor */}
                          <div className="mt-2 bg-gray-50 rounded p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {component.type === 'button' && (
                              <input
                                type="text"
                                value={component.props?.text || ''}
                                onChange={(e) => updateComponentProp(index, 'text', e.target.value)}
                                placeholder="Button text"
                                className="w-full border border-gray-300 rounded px-2 py-1"
                              />
                            )}
                            {component.type === 'text' && (
                              <input
                                type="text"
                                value={component.props?.content || ''}
                                onChange={(e) => updateComponentProp(index, 'content', e.target.value)}
                                placeholder="Text content"
                                className="w-full border border-gray-300 rounded px-2 py-1"
                              />
                            )}
                            {component.type === 'list' && (
                              <input
                                type="number"
                                value={component.props?.items || 3}
                                onChange={(e) => updateComponentProp(index, 'items', parseInt(e.target.value))}
                                placeholder="Number of items"
                                min="1"
                                max="10"
                                className="w-full border border-gray-300 rounded px-2 py-1"
                              />
                            )}
                            {component.type === 'input' && (
                              <input
                                type="text"
                                value={component.props?.placeholder || ''}
                                onChange={(e) => updateComponentProp(index, 'placeholder', e.target.value)}
                                placeholder="Placeholder text"
                                className="w-full border border-gray-300 rounded px-2 py-1"
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </DragDropZone>

                {/* Phone Bottom */}
                <div className="bg-black rounded-b-3xl h-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-xl font-bold text-white mb-4">📝 Quick Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              onClick={() => {
                setComponents([
                  { ...AVAILABLE_COMPONENTS[2], id: 'temp-1', props: { content: 'Welcome to My App!' } },
                  { ...AVAILABLE_COMPONENTS[4], id: 'temp-2', props: { placeholder: 'Email' } },
                  { ...AVAILABLE_COMPONENTS[4], id: 'temp-3', props: { placeholder: 'Password' } },
                  { ...AVAILABLE_COMPONENTS[0], id: 'temp-4', props: { text: 'Sign In' } },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">🔐</div>
              <div className="text-white font-semibold mb-1">Login Screen</div>
              <div className="text-white/60 text-xs">Text, 2 Inputs, Button</div>
            </motion.button>

            <motion.button
              onClick={() => {
                setComponents([
                  { ...AVAILABLE_COMPONENTS[2], id: 'temp-5', props: { content: 'My Profile' } },
                  { ...AVAILABLE_COMPONENTS[1], id: 'temp-6' },
                  { ...AVAILABLE_COMPONENTS[2], id: 'temp-7', props: { content: 'John Doe' } },
                  { ...AVAILABLE_COMPONENTS[0], id: 'temp-8', props: { text: 'Edit Profile' } },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="text-white font-semibold mb-1">Profile Screen</div>
              <div className="text-white/60 text-xs">Image, Text, Button</div>
            </motion.button>

            <motion.button
              onClick={() => {
                setComponents([
                  { ...AVAILABLE_COMPONENTS[2], id: 'temp-9', props: { content: 'My Items' } },
                  { ...AVAILABLE_COMPONENTS[3], id: 'temp-10', props: { items: 5 } },
                  { ...AVAILABLE_COMPONENTS[0], id: 'temp-11', props: { text: 'Add New' } },
                ])
              }}
              className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="text-white font-semibold mb-1">List Screen</div>
              <div className="text-white/60 text-xs">Text, List, Button</div>
            </motion.button>
          </div>
        </div>
      </SandboxContainer>
    </DndContext>
  )
}
