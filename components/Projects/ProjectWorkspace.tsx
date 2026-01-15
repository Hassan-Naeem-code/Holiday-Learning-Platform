'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Play, Check, ChevronRight, Lightbulb, Trophy, Eye, EyeOff } from 'lucide-react'
import { MiniProject } from '@/utils/miniProjects'
import { executeCode } from '@/utils/pistonService'
import { useXP } from '@/hooks/useXP'
import { getSession } from '@/utils/sessionManager'
import confetti from 'canvas-confetti'

interface ProjectWorkspaceProps {
  project: MiniProject
}

export default function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const router = useRouter()
  const userCode = getSession()
  const { awardXP } = useXP(userCode)

  // File management
  const [activeFileId, setActiveFileId] = useState(project.files[0].id)
  const [fileContents, setFileContents] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    project.files.forEach(file => {
      initial[file.id] = file.starterCode
    })
    return initial
  })

  // Step tracking
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  // Execution
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  // Completion
  const [projectComplete, setProjectComplete] = useState(false)

  const activeFile = project.files.find(f => f.id === activeFileId)!
  const currentStepData = project.steps[currentStep]

  // Update file content
  const updateFileContent = (content: string) => {
    setFileContents(prev => ({
      ...prev,
      [activeFileId]: content
    }))
  }

  // Check if current step is complete
  const checkStepCompletion = () => {
    const step = project.steps[currentStep]
    const fileContent = fileContents[step.targetFileId] || ''

    // Check if all validation keywords are present
    const isComplete = step.validation.every(keyword =>
      fileContent.toLowerCase().includes(keyword.toLowerCase())
    )

    if (isComplete && !completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep])

      // Check if project is complete
      if (completedSteps.length + 1 === project.steps.length) {
        completeProject()
      }
    }

    return isComplete
  }

  // Mark step as complete and move to next
  const handleNextStep = () => {
    if (checkStepCompletion()) {
      if (currentStep < project.steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setShowHint(false)
        setShowSolution(false)

        // Switch to target file for new step
        const nextStep = project.steps[currentStep + 1]
        setActiveFileId(nextStep.targetFileId)
      }
    }
  }

  // Complete the project
  const completeProject = () => {
    setProjectComplete(true)
    awardXP(project.xpReward, true)

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    })
  }

  // Run code
  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('Running...')

    // For web projects, generate a combined preview
    if (project.languages.includes('html')) {
      const htmlContent = fileContents['html'] || ''
      const cssContent = fileContents['css'] || ''
      const jsContent = fileContents['javascript'] || ''

      setOutput(`=== Preview Generated ===

HTML Structure: ${htmlContent.length} characters
CSS Styles: ${cssContent.length} characters
JavaScript: ${jsContent.length} characters

Your project is ready! Check the preview panel to see it in action.`)
      setIsRunning(false)
      return
    }

    // For non-web projects, execute via Piston
    try {
      const result = await executeCode(activeFile.language, fileContents[activeFileId])
      if (result.success) {
        setOutput(result.output)
      } else {
        setOutput(`Error: ${result.stderr || result.error || 'Execution failed'}`)
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsRunning(false)
    }
  }

  // Show solution for current step
  const handleShowSolution = () => {
    setShowSolution(true)
    const step = project.steps[currentStep]
    const solutionFile = project.files.find(f => f.id === step.targetFileId)
    if (solutionFile) {
      setFileContents(prev => ({
        ...prev,
        [step.targetFileId]: solutionFile.solution
      }))
    }
  }

  // Generate preview HTML
  const getPreviewHTML = () => {
    const htmlContent = fileContents['html'] || '<p>No HTML content</p>'
    const cssContent = fileContents['css'] || ''
    const jsContent = fileContents['javascript'] || ''

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent.replace(/<link[^>]*>|<script[^>]*>.*?<\/script>/gi, '')}
          <script>${jsContent}</script>
        </body>
      </html>
    `
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/projects')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{project.icon}</span>
                {project.title}
              </h1>
              <p className="text-sm text-gray-400">
                Step {currentStep + 1} of {project.steps.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Steps */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          {/* Current Step */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span className="px-2 py-1 bg-purple-600 text-white rounded">
                Step {currentStep + 1}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              {currentStepData.description}
            </p>

            {/* Hint */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-yellow-500 text-sm mb-2"
            >
              <Lightbulb className="w-4 h-4" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-sm text-yellow-200 mb-4"
                >
                  {currentStepData.hint}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Show Solution Button */}
            {!showSolution && (
              <button
                onClick={handleShowSolution}
                className="text-sm text-gray-500 hover:text-gray-300 mb-4"
              >
                Stuck? Show solution
              </button>
            )}

            {/* Next Step Button */}
            <button
              onClick={handleNextStep}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
            >
              {currentStep === project.steps.length - 1 ? (
                <>
                  <Check className="w-4 h-4" />
                  Complete Project
                </>
              ) : (
                <>
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Steps List */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">All Steps</h3>
            <div className="space-y-2">
              {project.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => {
                    setCurrentStep(index)
                    setActiveFileId(step.targetFileId)
                    setShowHint(false)
                    setShowSolution(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    index === currentStep
                      ? 'bg-purple-600/20 border border-purple-500'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    completedSteps.includes(index)
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-600 text-gray-300'
                  }`}>
                    {completedSteps.includes(index) ? <Check className="w-3 h-3" /> : index + 1}
                  </div>
                  <span className={`text-sm ${
                    index === currentStep ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Code Editor */}
        <div className="flex-1 flex flex-col">
          {/* File Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex gap-2">
            {project.files.map(file => (
              <button
                key={file.id}
                onClick={() => setActiveFileId(file.id)}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                  file.id === activeFileId
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 p-4 overflow-auto">
            <textarea
              value={fileContents[activeFileId]}
              onChange={(e) => updateFileContent(e.target.value)}
              className="w-full h-full bg-gray-950 text-gray-100 font-mono text-sm p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          {output && (
            <div className="bg-gray-950 border-t border-gray-700 p-4 max-h-48 overflow-auto">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Output</h3>
              <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
        </div>

        {/* Right Panel - Preview (for web projects) */}
        {project.languages.includes('html') && (
          <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="font-medium text-white">Preview</h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-gray-400 hover:text-white"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {showPreview && (
              <div className="flex-1 bg-white">
                <iframe
                  srcDoc={getPreviewHTML()}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {projectComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-10 text-center max-w-md"
            >
              <Trophy className="w-20 h-20 mx-auto text-white mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Project Complete!
              </h2>
              <p className="text-xl text-white/90 mb-2">
                You built: {project.title}
              </p>
              <p className="text-lg text-white/80 mb-6">
                +{project.xpReward} XP earned!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/projects')}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium"
                >
                  More Projects
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-3 bg-white text-orange-500 rounded-lg font-medium"
                >
                  Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
