'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SandboxContainer from '@/components/Sandbox/SandboxContainer'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useUserStore } from '@/stores/userStore'
import { achievementManager } from '@/utils/achievementManager'

interface ContentBlock {
  id: string
  type: 'blog' | 'video' | 'social' | 'email'
  title: string
  date: string
  status: 'planned' | 'in-progress' | 'completed'
}

const CONTENT_TYPES = [
  { id: 'blog', label: 'Blog Post', icon: '📝', color: 'bg-blue-500' },
  { id: 'video', label: 'Video', icon: '🎥', color: 'bg-purple-500' },
  { id: 'social', label: 'Social Post', icon: '📱', color: 'bg-pink-500' },
  { id: 'email', label: 'Email', icon: '📧', color: 'bg-green-500' },
]

export default function ContentPlannerSandbox() {
  const [contentPlan, setContentPlan] = useState<ContentBlock[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [selectedType, setSelectedType] = useState<'blog' | 'video' | 'social' | 'email'>('blog')
  const [selectedDate, setSelectedDate] = useState('')
  const [timeSpent, setTimeSpent] = useState(0)
  const startTimeRef = useRef<number>(Date.now())

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
    if (contentPlan.length > 0) {
      const progressPercent = Math.min(100, contentPlan.length * 20)
      updateTopicProgress('content-creation', 'sandbox', progressPercent)
    }
  }, [contentPlan.length, updateTopicProgress])

  const addContent = () => {
    if (!newTitle || !selectedDate) return

    const newBlock: ContentBlock = {
      id: `content-${Date.now()}`,
      type: selectedType,
      title: newTitle,
      date: selectedDate,
      status: 'planned'
    }

    setContentPlan([...contentPlan, newBlock].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    setNewTitle('')
  }

  const updateStatus = (id: string, status: 'planned' | 'in-progress' | 'completed') => {
    setContentPlan(contentPlan.map(block => block.id === id ? { ...block, status } : block))
  }

  const deleteContent = (id: string) => {
    setContentPlan(contentPlan.filter(block => block.id !== id))
  }

  const resetPlan = () => {
    setContentPlan([])
    setNewTitle('')
    setSelectedDate('')
  }

  const stats = {
    total: contentPlan.length,
    planned: contentPlan.filter(b => b.status === 'planned').length,
    inProgress: contentPlan.filter(b => b.status === 'in-progress').length,
    completed: contentPlan.filter(b => b.status === 'completed').length,
  }

  return (
    <SandboxContainer title="Content Planner" icon="✍️" onRun={() => {}} onReset={resetPlan} isRunning={false}>
      <div className="glass-card p-4 mb-6 text-center">
        <div className="text-white/70 text-sm mb-1">Time Planning</div>
        <div className="text-2xl font-bold text-christmas-gold">
          {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">📅 Add Content</h3>

          <div className="space-y-4">
            <div>
              <label className="text-white text-sm mb-2 block">Content Type:</label>
              <div className="grid grid-cols-2 gap-2">
                {CONTENT_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`p-3 rounded-lg ${selectedType === type.id ? type.color : 'bg-white/10'} text-white text-sm`}
                  >
                    {type.icon} {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Title:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Content title..."
                className="w-full bg-white/10 text-white border-2 border-white/20 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">Publish Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white/10 text-white border-2 border-white/20 rounded-lg p-2"
              />
            </div>

            <motion.button
              onClick={addContent}
              disabled={!newTitle || !selectedDate}
              className={`btn w-full ${newTitle && selectedDate ? 'btn-primary' : 'opacity-50 cursor-not-allowed bg-white/10'}`}
              whileHover={newTitle && selectedDate ? { scale: 1.02 } : {}}
              whileTap={newTitle && selectedDate ? { scale: 0.98 } : {}}
            >
              Add to Calendar
            </motion.button>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded">
            <p className="text-white/80 text-sm">
              💡 <strong>Tip:</strong> Plan content 2-4 weeks ahead for best results!
            </p>
          </div>
        </div>

        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">📊 Content Calendar</h3>

          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-3 text-center">
              <div className="text-blue-400 text-sm">Total</div>
              <div className="text-white text-2xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-3 text-center">
              <div className="text-yellow-400 text-sm">Planned</div>
              <div className="text-white text-2xl font-bold">{stats.planned}</div>
            </div>
            <div className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-3 text-center">
              <div className="text-purple-400 text-sm">In Progress</div>
              <div className="text-white text-2xl font-bold">{stats.inProgress}</div>
            </div>
            <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-3 text-center">
              <div className="text-green-400 text-sm">Completed</div>
              <div className="text-white text-2xl font-bold">{stats.completed}</div>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {contentPlan.length === 0 ? (
              <div className="text-center py-12 text-white/50">
                <div className="text-6xl mb-4">📅</div>
                <p>No content planned yet. Add your first piece!</p>
              </div>
            ) : (
              contentPlan.map((block, index) => (
                <motion.div
                  key={block.id}
                  className="bg-white/5 border-2 border-white/20 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {CONTENT_TYPES.find(t => t.id === block.type)?.icon}
                      </span>
                      <div>
                        <div className="text-white font-semibold">{block.title}</div>
                        <div className="text-white/60 text-sm">{new Date(block.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteContent(block.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(block.id, 'planned')}
                      className={`flex-1 px-3 py-1 rounded text-sm ${
                        block.status === 'planned' ? 'bg-yellow-500 text-white' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      Planned
                    </button>
                    <button
                      onClick={() => updateStatus(block.id, 'in-progress')}
                      className={`flex-1 px-3 py-1 rounded text-sm ${
                        block.status === 'in-progress' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(block.id, 'completed')}
                      className={`flex-1 px-3 py-1 rounded text-sm ${
                        block.status === 'completed' ? 'bg-green-500 text-white' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </SandboxContainer>
  )
}
