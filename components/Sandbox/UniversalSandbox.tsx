'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, RotateCcw, Save, Download, Code2, Terminal, BookOpen, ChevronLeft, ChevronRight, Check, Trophy, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Language } from '@/utils/techModules'
import { useXP, XP_REWARDS } from '@/hooks/useXP'
import { generateSandboxExercises } from '@/utils/sandboxExercises'
import { executeCode, isPreviewOnly, generateHTMLPreview } from '@/utils/pistonService'
import { getSession } from '@/utils/sessionManager'
import { getLanguageProgress, updateSandboxProgress, initializeLanguageProgress, fillGlass, getUserProfile, getNextDifficulty } from '@/lib/firebaseService'
import { triggerProfileRefresh } from '@/components/Progress/GlobalLearningTree'
import confetti from 'canvas-confetti'
import Certificate from '@/components/Common/Certificate'
import { toast } from '@/components/Common/Toast'

// SandboxExercise type is used implicitly through the exercises array
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SandboxExercise } from '@/utils/sandboxExercises'

interface UniversalSandboxProps {
  language: Language
  moduleId: string
  languageId: string
}

const STARTER_CODE: { [key: string]: string } = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Start building your webpage here.</p>
</body>
</html>`,
  css: `/* Add your CSS styles here */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}`,
  javascript: `// Write your JavaScript code here
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Learner"));`,
  python: `# Write your Python code here
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("Learner"))`,
  react: `import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`,
}

export default function UniversalSandbox({ language, moduleId, languageId }: UniversalSandboxProps) {
  const router = useRouter()
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  // Exercise system - memoize to prevent recreation on every render
  const exercises = useMemo(() =>
    generateSandboxExercises(languageId, language.name, currentDifficulty).exercises,
    [languageId, language.name, currentDifficulty]
  )
  const [exerciseMode, setExerciseMode] = useState(true)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [userSubmissions, setUserSubmissions] = useState<{ [key: number]: string }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [allDifficultiesCompleted, setAllDifficultiesCompleted] = useState(false)

  const currentExercise = exercises[currentExerciseIndex]
  const languageKey = `${moduleId}-${languageId}`

  const [code, setCode] = useState(
    exerciseMode && currentExercise
      ? currentExercise.starterCode
      : STARTER_CODE[languageId] || `// ${language.name} Sandbox\n// Write your ${language.name} code here\n\nconsole.log("Hello from ${language.name}");`
  )
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [showLivePreview, setShowLivePreview] = useState(true)

  // Check if current language supports live preview (HTML/CSS/JS)
  const isWebLanguage = ['html', 'css', 'javascript'].includes(languageId)

  // Generate live preview HTML for W3Schools-style rendering
  const getLivePreviewHTML = () => {
    if (languageId === 'html') {
      // For HTML, render the code directly
      return code
    } else if (languageId === 'css') {
      // For CSS, show it with sample HTML
      return `<!DOCTYPE html>
<html>
<head>
  <style>${code}</style>
</head>
<body>
  <h1>CSS Preview</h1>
  <p>This is a paragraph to demonstrate your CSS styles.</p>
  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>
  <button>Click me</button>
  <a href="#">Sample Link</a>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
  </ul>
</body>
</html>`
    } else if (languageId === 'javascript') {
      // For JavaScript, create an HTML wrapper with console output capture
      return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #1a1a2e; color: #eee; }
    #output { background: #16213e; border: 1px solid #0f3460; border-radius: 8px; padding: 15px; margin-top: 20px; }
    .log { color: #00ff88; margin: 5px 0; font-family: monospace; }
    .error { color: #ff6b6b; }
    .warn { color: #feca57; }
    h3 { color: #e94560; margin-bottom: 10px; }
  </style>
</head>
<body>
  <h3>JavaScript Output</h3>
  <div id="output"></div>
  <script>
    const output = document.getElementById('output');
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      const div = document.createElement('div');
      div.className = 'log';
      div.textContent = '> ' + args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      output.appendChild(div);
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      const div = document.createElement('div');
      div.className = 'log error';
      div.textContent = '❌ ' + args.join(' ');
      output.appendChild(div);
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const div = document.createElement('div');
      div.className = 'log warn';
      div.textContent = '⚠️ ' + args.join(' ');
      output.appendChild(div);
      originalWarn.apply(console, args);
    };

    try {
      ${code}
    } catch (error) {
      console.error(error.message);
    }
  </script>
</body>
</html>`
    }
    return ''
  }

  const userCode = typeof window !== 'undefined' ? getSession() : null
  const { awardXP } = useXP(userCode)

  // Load saved progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (!userCode) {
        setIsLoading(false)
        return
      }

      try {
        // Get user profile for name
        const profile = await getUserProfile(userCode)
        if (profile) {
          setUserName(profile.name)
        }

        // Load progress
        const progress = await getLanguageProgress(userCode, languageKey)

        // Initialize if missing, otherwise use saved difficulty & progress
        if (!progress) {
          await initializeLanguageProgress(userCode, languageKey, 'easy', 8, 8)
        }

        // Determine current difficulty level
        const completedDifficulties = progress?.completedDifficulties?.sandbox || []
        const nextDiff = getNextDifficulty(completedDifficulties)
        
        if (!nextDiff) {
          // All difficulties completed
          setAllDifficultiesCompleted(true)
          setCurrentDifficulty('easy') // keep UI consistent
        } else {
          setCurrentDifficulty(nextDiff)
        }

        // Load progress for current difficulty
        if (progress?.sandboxProgress) {
          const difficultyProgress = progress.sandboxProgress[nextDiff || 'easy']
          if (difficultyProgress) {
            setCurrentExerciseIndex(difficultyProgress.currentExercise || 0)
            setCompletedExercises(difficultyProgress.completedExercises || [])
          }
        }
      } catch (error) {
        console.error('Error loading sandbox progress:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProgress()
  }, [userCode, languageKey])

  // Update code when exercise changes
  useEffect(() => {
    if (exerciseMode && currentExercise) {
      setCode(currentExercise.starterCode)
      setOutput('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExerciseIndex, exerciseMode])

  // Save user's code and move to next exercise
  const handleNextSubmission = async () => {
    if (!exerciseMode || !currentExercise) return

    // Save current code submission
    setUserSubmissions(prev => ({
      ...prev,
      [currentExerciseIndex]: code
    }))

    // If this is the last exercise, validate all submissions
    if (currentExerciseIndex === exercises.length - 1) {
      await handleFinalSubmission()
    } else {
      // Move to next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setOutput('')
    }
  }

  // Validate all submissions at the end
  const handleFinalSubmission = async () => {
    if (!userCode) return

    setIsSubmitting(true)
    setOutput('Validating all your submissions...')

    // Include current code
    const allSubmissions = {
      ...userSubmissions,
      [currentExerciseIndex]: code
    }

    // Check each submission
    const results: boolean[] = []
    const correctExercises: number[] = []

    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i]
      const userCode = allSubmissions[i] || ''

      // Validate the code
      const codeNormalized = userCode.trim().replace(/\s+/g, ' ')
      const solutionNormalized = exercise.solution.trim().replace(/\s+/g, ' ')
      const similarity = calculateSimilarity(codeNormalized, solutionNormalized)
      const passed = similarity > 0.7 || codeNormalized.includes(solutionNormalized)

      results.push(passed)
      if (passed) {
        correctExercises.push(i)
      }
    }

    // Calculate final score
    const correctCount = results.filter(r => r).length
    const totalCount = exercises.length
    const scorePercentage = (correctCount / totalCount) * 100
    const hasPassedThreshold = scorePercentage >= 75

    // Update completed exercises
    setCompletedExercises(correctExercises)

    // Save progress
    try {
      await updateSandboxProgress(userCode, languageKey, currentDifficulty, currentExerciseIndex, correctExercises, exercises.length)

      // Award XP based on performance
      const xpEarned = correctCount * XP_REWARDS.SANDBOX_EXECUTE
      await awardXP(xpEarned, false)

      if (hasPassedThreshold) {
        // Passed! Award bonus and certificate
        await awardXP(XP_REWARDS.SANDBOX_COMPLETE, false)
        await fillGlass(userCode)

        setShowCelebration(true)

        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        })

        setTimeout(() => {
          setShowCelebration(false)
          setShowCertificate(true)
        }, 4000)

        setOutput(`🎉 Congratulations! You scored ${Math.round(scorePercentage)}%!\n\n✅ Correct: ${correctCount}/${totalCount} exercises\n\n+${xpEarned + XP_REWARDS.SANDBOX_COMPLETE} XP earned!\n\nYour certificate is being generated...`)
      } else {
        // Failed to meet threshold
        setOutput(`📊 Results:\n\n✅ Correct: ${correctCount}/${totalCount} (${Math.round(scorePercentage)}%)\n❌ Incorrect: ${totalCount - correctCount}\n\n+${xpEarned} XP earned\n\nYou need 75%+ to earn the certificate. Review the exercises and try again!`)
      }

      triggerProfileRefresh()
    } catch (error) {
      console.error('Error saving sandbox progress:', error)
      setOutput('Failed to save your results. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    if (longer.length === 0) return 1.0
    const editDistance = getEditDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  }

  const getEditDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = []
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    return matrix[str2.length][str1.length]
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('// Running code...\n')

    try {
      // Check if this is a preview-only language (HTML/CSS)
      if (isPreviewOnly(languageId)) {
        const preview = generateHTMLPreview(code || '', languageId)
        setOutput(preview)
        setIsRunning(false)
        return
      }

      // Execute code via Piston API
      const result = await executeCode(languageId, code || '')

      if (result.success) {
        let outputText = `// ${language.name} - Execution Result\n`
        if (result.executionTime) {
          outputText += `// Execution time: ${result.executionTime}ms\n`
        }
        outputText += `\n${result.output}`

        if (result.stderr && result.stderr.trim()) {
          outputText += `\n\n// Warnings:\n${result.stderr}`
        }

        setOutput(outputText)
      } else {
        let errorText = `// ${language.name} - Error\n\n`
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
      setOutput(`// Error executing code\n\n${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleNextExercise = async () => {
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1
      setCurrentExerciseIndex(nextIndex)

      // Save progress
      if (userCode) {
        try {
          await updateSandboxProgress(userCode, languageKey, currentDifficulty, nextIndex, completedExercises, exercises.length)
        } catch (error) {
          console.error('Error saving sandbox progress:', error)
        }
      }
    }
  }

  const handlePreviousExercise = async () => {
    if (currentExerciseIndex > 0) {
      const prevIndex = currentExerciseIndex - 1
      setCurrentExerciseIndex(prevIndex)

      // Save progress
      if (userCode) {
        try {
          await updateSandboxProgress(userCode, languageKey, currentDifficulty, prevIndex, completedExercises, exercises.length)
        } catch (error) {
          console.error('Error saving sandbox progress:', error)
        }
      }
    }
  }

  const handleReset = () => {
    if (exerciseMode && currentExercise) {
      setCode(currentExercise.starterCode)
    } else {
      setCode(
        STARTER_CODE[languageId] || `// ${language.name} Sandbox\n// Write your ${language.name} code here\n\nconsole.log("Hello from ${language.name}!");`
      )
    }
    setOutput('')
  }

  const handleSave = () => {
    localStorage.setItem(`sandbox-${moduleId}-${languageId}`, code)
    toast.success('Code saved to browser storage!')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${languageId}-code.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Show loading screen while fetching progress
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="text-white text-2xl">Loading exercises...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 pb-10">
      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center shadow-2xl max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto text-white mb-4 sm:mb-5 md:mb-6" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-4">
                You completed all {language.name} {currentDifficulty} exercises!
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/80">
                +{XP_REWARDS.SANDBOX_COMPLETE} XP Bonus!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && userName && (
          <Certificate
            userName={userName}
            languageName={language.name}
            difficulty={currentDifficulty}
            type="tutorial"
            onClose={() => {
              setShowCertificate(false)
              // Redirect back to module after closing certificate
              router.push(`/module/${moduleId}`)
            }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-6">
        {/* All Difficulties Completed Message */}
        {allDifficultiesCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white"
          >
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">All Levels Mastered! 🏆</h2>
            <p className="text-lg mb-4">
              You&apos;ve completed Easy, Medium, and Hard sandbox exercises!
            </p>
            <button
              onClick={() => router.push(`/module/${moduleId}`)}
              className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Back to Module
            </button>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-5 flex-wrap gap-2 md:gap-4">
          <motion.button
            onClick={() => router.push(`/module/${moduleId}`)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-1 md:gap-2 text-white/80 hover:text-white bg-white/10 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Back to {language.name}</span>
            <span className="sm:hidden">Back</span>
          </motion.button>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 2xl:gap-6 bg-white/10 backdrop-blur-lg rounded-xl 2xl:rounded-2xl px-3 sm:px-4 md:px-6 2xl:px-8 py-2 md:py-3 2xl:py-4 flex-wrap">
            <div className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl">{language.icon}</div>
            <div>
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold text-white leading-tight">{language.name} Sandbox</h1>
              <p className="text-white/70 text-xs sm:text-sm 2xl:text-base leading-tight">
                {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level
              </p>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mb-3 md:mb-5 flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <button
            onClick={() => setExerciseMode(!exerciseMode)}
            disabled={allDifficultiesCompleted}
            className={`px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all text-sm md:text-base ${
              exerciseMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            } ${allDifficultiesCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
            {exerciseMode ? 'Practice Mode' : 'Free Sandbox'}
          </button>
          {exerciseMode && !allDifficultiesCompleted && (
            <div className="text-white/80 text-xs sm:text-sm font-semibold">
              ✓ Completed: {completedExercises.length}/{exercises.length}
            </div>
          )}
        </div>

        {/* Exercise Panel */}
        {exerciseMode && currentExercise && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 md:mb-6 border border-purple-400/30"
          >
            <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{currentExercise.title}</h2>
                  {completedExercises.includes(currentExerciseIndex) && (
                    <div className="bg-green-500 text-white px-2 md:px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                      <Check className="w-3 h-3 md:w-4 md:h-4" />
                      Completed
                    </div>
                  )}
                </div>
                <p className="text-white/90 mb-3 text-sm sm:text-base">{currentExercise.description}</p>
                <div className="bg-white/10 rounded-xl p-3 md:p-4 mb-3 md:mb-4">
                  <p className="text-white font-semibold mb-2 text-xs sm:text-sm md:text-base">📝 Instructions:</p>
                  <p className="text-white/90 text-xs sm:text-sm md:text-base">{currentExercise.instructions}</p>
                </div>

                <div className="bg-emerald-500/15 border border-emerald-400/40 rounded-xl p-3 md:p-4 mb-3 md:mb-4 text-white/90 text-xs sm:text-sm md:text-base">
                  🎯 Complete all exercises and submit. Your answers will be graded at the end. Score 75%+ to earn your certificate!
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col gap-1.5 md:gap-2 ml-2 sm:ml-3 md:ml-4">
                <button
                  onClick={handlePreviousExercise}
                  disabled={currentExerciseIndex === 0}
                  className="p-1.5 md:p-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <div className="text-white text-center text-xs sm:text-sm">
                  {currentExerciseIndex + 1}/{exercises.length}
                </div>
                <button
                  onClick={handleNextExercise}
                  disabled={currentExerciseIndex === exercises.length - 1}
                  className="p-1.5 md:p-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Toolbar */}
        {!allDifficultiesCompleted && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 md:p-4 mb-4 md:mb-6 flex items-center justify-between flex-wrap gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 text-xs sm:text-sm md:text-base"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5" />
              {isRunning ? 'Running...' : 'Test Run'}
            </button>

            {exerciseMode && (
              <button
                onClick={handleNextSubmission}
                disabled={isSubmitting}
                className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 text-xs sm:text-sm md:text-base"
              >
                <Check className="w-4 h-4 md:w-5 md:h-5" />
                {isSubmitting ? 'Submitting...' : currentExerciseIndex === exercises.length - 1 ? 'Finish & Submit' : 'Next'}
              </button>
            )}

            <button
              onClick={handleReset}
              className="flex items-center gap-1 md:gap-2 bg-white/10 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-white/20 transition-all text-xs sm:text-sm md:text-base"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 md:gap-2 bg-blue-500/20 text-blue-300 px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-blue-500/30 transition-all text-xs sm:text-sm md:text-base"
            >
              <Save className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 md:gap-2 bg-purple-500/20 text-purple-300 px-3 md:px-4 py-2 md:py-3 rounded-xl hover:bg-purple-500/30 transition-all text-xs sm:text-sm md:text-base"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
        )}

        {/* Editor and Output */}
        {!allDifficultiesCompleted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6 2xl:gap-8">
          {/* Code Editor */}
          <div className="bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-3 sm:px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 border-b border-gray-700">
              <Code2 className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base">Code Editor</span>
              <span className="ml-auto text-gray-400 text-xs sm:text-sm">
                {code.split('\n').length} lines
              </span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-72 sm:h-80 md:h-[400px] lg:h-[500px] xl:h-[550px] 2xl:h-[650px] bg-gray-900 text-green-400 font-mono text-sm sm:text-sm md:text-base 2xl:text-lg p-3 sm:p-4 md:p-6 2xl:p-8 focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none leading-relaxed"
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              data-gramm="false"
              placeholder={`Write your ${language.name} code here...`}
              aria-label={`Code editor for ${language.name}`}
            />
          </div>

          {/* Output Panel - With Live Preview for Web Languages */}
          <div className="bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gray-800 px-3 sm:px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 border-b border-gray-700">
              <Terminal className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
                {isWebLanguage && showLivePreview ? 'Live Preview' : 'Output'}
              </span>

              {/* Toggle button for live preview (web languages only) */}
              {isWebLanguage && (
                <button
                  onClick={() => setShowLivePreview(!showLivePreview)}
                  className="ml-2 flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs text-white/80 hover:text-white transition-all"
                  title={showLivePreview ? 'Show text output' : 'Show live preview'}
                  aria-label={showLivePreview ? 'Switch to text output view' : 'Switch to live preview'}
                  aria-pressed={showLivePreview}
                >
                  {showLivePreview ? (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span className="hidden sm:inline">Text</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      <span className="hidden sm:inline">Preview</span>
                    </>
                  )}
                </button>
              )}

              {isRunning && (
                <span className="ml-auto text-yellow-400 text-xs sm:text-sm animate-pulse">
                  Executing...
                </span>
              )}
            </div>

            {/* Live Preview iframe for web languages */}
            {isWebLanguage && showLivePreview ? (
              <div className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] xl:h-[550px] 2xl:h-[650px] bg-white">
                <iframe
                  srcDoc={getLivePreviewHTML()}
                  className="w-full h-full border-0"
                  title="Live Preview"
                  sandbox="allow-scripts"
                />
              </div>
            ) : (
              /* Text output for non-web languages or when preview is off */
              <div className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] xl:h-[550px] 2xl:h-[650px] bg-gray-900 text-gray-300 font-mono text-xs sm:text-sm md:text-base 2xl:text-lg p-3 sm:p-4 md:p-6 2xl:p-8 overflow-auto whitespace-pre-wrap">
                {output || (isWebLanguage
                  ? '// Toggle to "Live Preview" to see your code rendered in real-time, or click "Test Run" to execute.'
                  : '// Click "Test Run" to see the output here...'
                )}
              </div>
            )}
          </div>
        </div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 md:mt-6 bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6"
        >
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-white">
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">🎯 Experiment Freely</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Try different {language.name} syntax and see instant results. No setup required!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">💾 Save Your Work</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Save your code to browser storage or download it to your computer.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2">⭐ Earn XP</h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Every time you run code, you earn {XP_REWARDS.SANDBOX_EXECUTE} XP. Keep experimenting!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


