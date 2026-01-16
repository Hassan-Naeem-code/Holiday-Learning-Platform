'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Code2, Play, Rocket, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Tutorial } from '@/utils/comprehensiveTutorialContent'
import { Language } from '@/utils/techModules'
import {
  getLanguageProgress,
  initializeLanguageProgress,
  updateTutorialProgress,
} from '@/lib/firebaseService'
import { getSession } from '@/utils/sessionManager'
import { executeCode, isPreviewOnly } from '@/utils/pistonService'
import { triggerProfileRefresh } from '@/components/Progress/GlobalLearningTree'

interface InteractiveTutorialProps {
  tutorial: Tutorial
  language: Language
  moduleId: string
  languageId: string
}

export default function InteractiveTutorial({
  tutorial,
  language,
  moduleId,
  languageId,
}: InteractiveTutorialProps) {
  const router = useRouter()
  const [showIntro, setShowIntro] = useState(true) // Start with intro screen
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const [editorCode, setEditorCode] = useState('')
  const [output, setOutput] = useState('')
  const [userCode, setUserCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)

  const sections = tutorial.sections ?? []
  const totalSections = sections.length
  const section = sections[currentSection]
  const isFirstSection = currentSection === 0
  const isLastSection = currentSection === totalSections - 1
  const languageKey = `${moduleId}-${languageId}`
  const isWebLanguage = ['html', 'css', 'javascript'].includes(languageId)

  // Generate live preview HTML for web languages
  const getLivePreviewHTML = () => {
    if (languageId === 'html') {
      return editorCode
    } else if (languageId === 'css') {
      return `<!DOCTYPE html>
<html><head><style>${editorCode}</style></head>
<body>
  <h1>CSS Preview</h1>
  <p>This paragraph demonstrates your styles.</p>
  <div class="container"><div class="box">Box 1</div><div class="box">Box 2</div></div>
  <button>Button</button>
  <a href="#">Link</a>
</body></html>`
    } else if (languageId === 'javascript') {
      return `<!DOCTYPE html>
<html><head>
<style>body{font-family:sans-serif;padding:20px;background:#1a1a2e;color:#eee}
#output{background:#16213e;border-radius:8px;padding:15px;margin-top:20px}
.log{color:#00ff88;margin:5px 0;font-family:monospace}.error{color:#ff6b6b}</style>
</head><body>
<h3 style="color:#e94560">JavaScript Output</h3>
<div id="output"></div>
<script>
const output=document.getElementById('output');
const log=console.log;console.log=(...a)=>{
const d=document.createElement('div');d.className='log';
d.textContent='> '+a.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ');
output.appendChild(d);log.apply(console,a)};
console.error=(...a)=>{const d=document.createElement('div');d.className='log error';
d.textContent='❌ '+a.join(' ');output.appendChild(d)};
try{${editorCode}}catch(e){console.error(e.message)}
</script></body></html>`
    }
    return ''
  }

  // Load code example when section changes
  useEffect(() => {
    if (section?.codeExample) {
      setEditorCode(section.codeExample.replace(/\\n/g, '\n'))
      setOutput('') // Clear output on section change
    }
  }, [currentSection, section])

  // Load saved progress (resume) or initialize
  useEffect(() => {
    const loadProgress = async () => {
      const code = getSession()
      if (!code) {
        setIsLoading(false)
        return
      }

      setUserCode(code)

      try {
        const progress = await getLanguageProgress(code, languageKey)

        if (progress?.tutorialProgress) {
          const saved = progress.tutorialProgress
          const boundedSection = Math.min(Math.max(saved.currentSection, 0), Math.max(totalSections - 1, 0))
          setCurrentSection(boundedSection)
          setCompletedSections(saved.completedSections ?? [])
          // Skip intro if user has already started the tutorial
          if (saved.currentSection > 0 || (saved.completedSections && saved.completedSections.length > 0)) {
            setShowIntro(false)
          }
        } else {
          // Initialize if missing
          await initializeLanguageProgress(code, languageKey, 'easy', totalSections, 10)
          setCompletedSections([])
        }
      } catch (error) {
        console.error('Error loading tutorial progress:', error)
      }

      setIsLoading(false)
    }

    loadProgress()
  }, [languageKey, totalSections, languageId])

  const handleNext = () => {
    if (!isLastSection) {
      const next = currentSection + 1
      const updatedCompleted = Array.from(new Set([...completedSections, currentSection])).sort((a, b) => a - b)
      setCurrentSection(next)
      setCompletedSections(updatedCompleted)
      saveProgress(next, updatedCompleted)
    }
  }

  const handlePrevious = () => {
    if (!isFirstSection) {
      const prev = currentSection - 1
      setCurrentSection(prev)
      saveProgress(prev, completedSections)
    }
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('Running code...')

    try {
      // For preview-only languages (HTML/CSS), show preview message
      if (isPreviewOnly(languageId)) {
        setOutput('✓ Preview updated! Check the live preview panel to see your rendered output.')
        setIsRunning(false)
        return
      }

      // Execute code via Piston API
      const result = await executeCode(languageId, editorCode)

      if (result.success) {
        let outputText = `✓ ${language.name} - Execution Complete\n`
        if (result.executionTime) {
          outputText += `⏱ Time: ${result.executionTime}ms\n`
        }
        outputText += `\n${result.output}`

        if (result.stderr && result.stderr.trim()) {
          outputText += `\n\n⚠️ Warnings:\n${result.stderr}`
        }

        setOutput(outputText)
      } else {
        let errorText = `❌ ${language.name} - Error\n\n`
        if (result.stderr) {
          errorText += result.stderr
        } else if (result.error) {
          errorText += result.error
        } else {
          errorText += 'An unknown error occurred'
        }
        setOutput(errorText)
      }
    } catch (error) {
      setOutput(`❌ Error executing code\n\n${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsRunning(false)
    }
  }

  const saveProgress = async (newSection: number, completed: number[]) => {
    if (!userCode) return
    try {
      const isCompleted = completed.length >= totalSections
      await updateTutorialProgress(userCode, languageKey, newSection, completed, isCompleted)
      // Trigger profile refresh for real-time progress updates
      triggerProfileRefresh()
    } catch (error) {
      console.error('Error saving tutorial progress:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6">
          {/* Book icon with pulse animation */}
          <div className="text-7xl animate-pulse">📚</div>

          {/* Modern Animated Spinner */}
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full animate-pulse"></div>
          </div>

          {/* Animated text */}
          <p className="text-white text-xl font-semibold animate-pulse">
            Loading your tutorial...
          </p>

          {/* Animated dots */}
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
        </div>
      </div>
    )
  }

  // Handle empty tutorial
  if (totalSections === 0 || !section) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-white text-3xl font-bold mb-4">Tutorial Not Available</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all"
            aria-label="Go back to dashboard"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Introduction Screen (W3Schools style - shown before lessons)
  if (showIntro && sections.length > 0) {
    const introSection = sections[0] // Get the first section which has the intro content

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push(`/module/${moduleId}`)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                aria-label="Go back to module page"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="text-3xl">{language.icon}</div>
                <div>
                  <h1 className="text-white font-bold text-lg md:text-xl">{language.name}</h1>
                  <p className="text-white/60 text-xs md:text-sm">Complete Tutorial</p>
                </div>
              </div>

              <div className="text-white/80 text-sm">
                Introduction
              </div>
            </div>
          </div>
        </div>

        {/* Introduction Content */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12"
          >
            {/* Welcome Icon */}
            <div className="flex justify-center mb-8">
              <div className="text-7xl md:text-8xl">{language.icon}</div>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-p:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-200 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold prose-code:text-gray-900 dark:prose-code:text-gray-100">
              <ReactMarkdown>{introSection.content}</ReactMarkdown>
            </div>

            {/* Code Example */}
            {introSection.codeExample && (
              <div className="mt-8 bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5 text-green-400" />
                  <h3 className="text-white font-semibold">Example Code</h3>
                </div>
                <pre className="text-green-400 font-mono text-sm">
                  <code>{introSection.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Start Tutorial Button */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowIntro(false)}
                className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                Start Tutorial - {totalSections} Lessons
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Features Preview */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{totalSections} Lessons</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">From basics to advanced</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Interactive Code</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Try examples yourself</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Hands-on Practice</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn by doing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push(`/module/${moduleId}`)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-3xl">{language.icon}</div>
              <div>
                <h1 className="text-white font-bold text-lg md:text-xl">{language.name} Tutorial</h1>
                <p className="text-white/60 text-xs md:text-sm">Learn from basics to advanced</p>
              </div>
            </div>

            <div className="text-white/80 text-sm">
              {currentSection + 1} / {totalSections}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-140px)] lg:h-[calc(100vh-140px)]">
        {/* Left: Learning Content */}
        <div className="overflow-y-auto bg-white dark:bg-gray-800 order-1 lg:order-1 max-h-[50vh] lg:max-h-none">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12"
          >
            {/* Section Title */}
            <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Lesson {currentSection + 1}</div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-gray-800 dark:text-gray-100">{section.title}</h2>
              </div>
            </div>

            {/* Content - Rendered with Markdown */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-h2:text-xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold prose-ul:my-4 prose-ol:my-4 prose-code:text-gray-900 dark:prose-code:text-gray-100">
              <ReactMarkdown>{(section.content && section.content.trim().length >= 200) ? section.content : `## What You'll Learn\n${section.title}\n\n## Lesson Overview\nThis section is being enriched. Explore the concepts of ${section.title} with clear guidance, examples, and practice tasks.\n\n### Example\n\n\`\`\`txt\n${section.title} example\n\`\`\`\n\n### Best Practices\n- Use small, focused examples\n- Practice iteratively\n- Keep code readable\n\n### Practice\n- Write a small demo using ${section.title}\n- Add one improvement (like validation or styling)`}</ReactMarkdown>

              {/* Syntax Box */}
              {section.syntax && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base">Syntax</h3>
                  </div>
                  <code className="text-blue-700 dark:text-blue-300 font-mono text-sm block bg-white dark:bg-gray-900 p-3 rounded">
                    {section.syntax}
                  </code>
                </div>
              )}

              {/* Usage Box */}
              {section.usage && (
                <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 text-base">When to use:</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{section.usage}</p>
                </div>
              )}

              {/* Example Box */}
              {section.codeExample && (
                <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-base">Example:</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code>{section.codeExample}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 gap-3">
              <button
                onClick={handlePrevious}
                disabled={isFirstSection}
                aria-label={isFirstSection ? 'No previous section' : `Go to previous section`}
                aria-disabled={isFirstSection}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 2xl:px-8 py-2 sm:py-2.5 md:py-3 2xl:py-4 rounded-lg sm:rounded-xl font-semibold transition-all text-xs sm:text-sm md:text-base 2xl:text-lg ${
                  isFirstSection
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:shadow-lg'
                }`}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
                <span className="hidden xs:inline">Previous</span>
                <span className="xs:hidden">Prev</span>
              </button>

              <button
                onClick={handleNext}
                disabled={isLastSection}
                aria-label={isLastSection ? 'No more sections' : `Go to next section`}
                aria-disabled={isLastSection}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 2xl:px-8 py-2 sm:py-2.5 md:py-3 2xl:py-4 rounded-lg sm:rounded-xl font-semibold transition-all text-xs sm:text-sm md:text-base 2xl:text-lg ${
                  isLastSection
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg'
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right: Code Editor & Preview */}
        <div className="bg-gray-900 flex flex-col order-2 lg:order-2 min-h-[50vh] lg:min-h-0">
          <div className="bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-700 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-white">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
              <span className="font-semibold text-sm sm:text-base 2xl:text-lg">Try it Yourself</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Live Preview Toggle for web languages */}
              {isWebLanguage && (
                <button
                  onClick={() => setShowLivePreview(!showLivePreview)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-xs sm:text-sm 2xl:text-base"
                  title={showLivePreview ? 'Hide preview' : 'Show preview'}
                  aria-label={showLivePreview ? 'Switch to code editor view' : 'Switch to live preview'}
                  aria-pressed={showLivePreview}
                >
                  {showLivePreview ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  <span className="hidden xs:inline">{showLivePreview ? 'Code' : 'Preview'}</span>
                </button>
              )}
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white rounded-lg transition-colors font-semibold text-xs sm:text-sm 2xl:text-base"
                aria-label={isRunning ? 'Code is running' : 'Run code'}
                aria-busy={isRunning}
              >
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" />
                {isRunning ? 'Running...' : 'Run'}
              </button>
            </div>
          </div>

          {/* Editor or Live Preview */}
          {isWebLanguage && showLivePreview ? (
            /* Live Preview for HTML/CSS/JS */
            <div className="flex-1 bg-white min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0">
              <iframe
                srcDoc={getLivePreviewHTML()}
                className="w-full h-full border-0 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] 2xl:min-h-[500px]"
                title="Live Preview"
                sandbox="allow-scripts"
              />
            </div>
          ) : (
            /* Code Editor */
            <textarea
              value={editorCode}
              onChange={(e) => setEditorCode(e.target.value)}
              className="flex-1 bg-gray-900 text-green-400 font-mono text-sm sm:text-sm 2xl:text-base p-3 sm:p-4 2xl:p-6 resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 min-h-[250px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[400px] 2xl:min-h-[500px] leading-relaxed"
              placeholder="// Write your code here..."
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              data-gramm="false"
              aria-label={`Code editor for ${language.name} tutorial`}
            />
          )}

          {/* Output */}
          {output && !showLivePreview && (
            <div className="bg-gray-950 border-t border-gray-700 p-3 sm:p-4 2xl:p-5 max-h-32 sm:max-h-40 md:max-h-48 2xl:max-h-64 overflow-y-auto">
              <div className="text-gray-400 text-[10px] sm:text-xs 2xl:text-sm mb-1.5 sm:mb-2 font-semibold">OUTPUT:</div>
              <pre className="text-gray-300 text-xs sm:text-sm 2xl:text-base font-mono whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
