'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock, Zap, Code2 } from 'lucide-react'
import { MINI_PROJECTS, MiniProject } from '@/utils/miniProjects'

export default function ProjectsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')

  const filteredProjects = filter === 'all'
    ? MINI_PROJECTS
    : MINI_PROJECTS.filter(p => p.difficulty === filter)

  const getDifficultyColor = (difficulty: MiniProject['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pb-20">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mini Projects
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Build real things and learn by doing. Each project guides you step-by-step.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === level
                  ? 'bg-white text-gray-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${project.color} p-1 rounded-2xl`}>
                <div className="bg-gray-900 rounded-2xl p-6 h-full hover:bg-gray-800/90 transition-colors">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{project.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-white/50 text-xs">
                      <Clock className="w-3 h-3" />
                      {project.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400 text-xs">
                      <Zap className="w-3 h-3" />
                      {project.xpReward} XP
                    </span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-white/40" />
                    <div className="flex gap-2">
                      {project.languages.map(lang => (
                        <span key={lang} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                          {lang.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Steps indicator */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50">{project.steps.length} steps</span>
                      <span className="text-white/70 font-medium group-hover:text-white transition-colors">
                        Start Project →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-white/50 py-20">
            No projects found for this difficulty level.
          </div>
        )}
      </div>
    </div>
  )
}
