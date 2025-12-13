import { motion } from 'framer-motion'
import AnimatedDiagram from '@/components/Tutorials/AnimatedDiagram'
import InteractiveSlider from '@/components/Tutorials/InteractiveSlider'
import QuizComponent, { QuizQuestion } from '@/components/Tutorials/QuizComponent'
import { TutorialSection } from '@/components/Tutorials/TutorialPlayer'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'

export const softwareDevTutorial = {
  title: 'How Programming Works',
  icon: '💻',
  sections: [
    {
      id: 1,
      title: 'Introduction: What is Programming?',
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Think of a program like a recipe. You give the computer step-by-step instructions,
            just like a chef follows a recipe. The computer executes each step in order to create
            the final result.
          </p>

          <AnimatedDiagram>
            <div className="text-center space-y-4">
              <motion.div
                className="inline-block bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-4xl mb-2">👨‍💻</div>
                <div className="text-white font-semibold">Programmer</div>
              </motion.div>

              <motion.div
                className="text-3xl"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>

              <motion.div
                className="inline-block bg-purple-500/20 border-2 border-purple-500 rounded-lg p-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="text-4xl mb-2">💻</div>
                <div className="text-white font-semibold">Computer</div>
              </motion.div>

              <motion.div
                className="text-3xl"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                →
              </motion.div>

              <motion.div
                className="inline-block bg-green-500/20 border-2 border-green-500 rounded-lg p-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="text-4xl mb-2">✨</div>
                <div className="text-white font-semibold">Result</div>
              </motion.div>
            </div>
          </AnimatedDiagram>

          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-blue-400">Key Idea:</strong> Programming is about breaking
              down complex tasks into simple, clear instructions that a computer can understand
              and execute.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Variables: Storing Information',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Variables are containers that store information. Think of them as labeled boxes
            where you can put different types of data.
          </p>

          <AnimatedDiagram>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl mb-2">📦</div>
                <div className="text-white font-semibold mb-2">name</div>
                <div className="bg-white/10 rounded px-3 py-2 text-green-400 font-mono">
                  "Alice"
                </div>
              </motion.div>

              <motion.div
                className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl mb-2">📦</div>
                <div className="text-white font-semibold mb-2">age</div>
                <div className="bg-white/10 rounded px-3 py-2 text-blue-400 font-mono">
                  25
                </div>
              </motion.div>

              <motion.div
                className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl mb-2">📦</div>
                <div className="text-white font-semibold mb-2">isStudent</div>
                <div className="bg-white/10 rounded px-3 py-2 text-purple-400 font-mono">
                  true
                </div>
              </motion.div>
            </div>
          </AnimatedDiagram>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Types of Data:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">📝</span>
                  <span className="text-white font-semibold">Text (String)</span>
                </div>
                <code className="text-green-400 font-mono text-sm">"Hello World"</code>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🔢</span>
                  <span className="text-white font-semibold">Number</span>
                </div>
                <code className="text-blue-400 font-mono text-sm">42, 3.14</code>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">✓</span>
                  <span className="text-white font-semibold">Boolean</span>
                </div>
                <code className="text-purple-400 font-mono text-sm">true, false</code>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">📋</span>
                  <span className="text-white font-semibold">List (Array)</span>
                </div>
                <code className="text-orange-400 font-mono text-sm">[1, 2, 3, 4]</code>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Functions: Reusable Code Blocks',
      estimatedTime: '5 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Functions are reusable blocks of code that perform specific tasks. Think of them
            as mini-recipes you can use multiple times without rewriting the same code.
          </p>

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-pink-500 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">⚙️</div>
                  <div className="text-white font-bold text-xl">Function: greet</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="bg-blue-500/30 rounded-lg px-4 py-2 text-white font-mono"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Input: "Bob"
                    </motion.div>
                    <span className="text-2xl">→</span>
                    <div className="flex-1 bg-white/5 rounded-lg p-3">
                      <code className="text-green-400 text-sm">
                        return "Hello, " + name + "!"
                      </code>
                    </div>
                    <span className="text-2xl">→</span>
                    <motion.div
                      className="bg-green-500/30 rounded-lg px-4 py-2 text-white font-mono"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      "Hello, Bob!"
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-yellow-400">Analogy:</strong> A function is like a vending
              machine. You input money (parameters), the machine processes it, and you get a
              snack (return value).
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-4">Example: Add Two Numbers</h4>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-purple-400">function <span className="text-blue-400">add</span>(<span className="text-orange-400">a, b</span>) {'{'}</div>
              <div className="ml-4 text-white">return a + b;</div>
              <div className="text-purple-400">{'}'}</div>
              <div className="mt-4 text-gray-400">// Usage:</div>
              <div className="text-white">result = <span className="text-blue-400">add</span>(5, 3)  <span className="text-gray-400">// Returns 8</span></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Loops: Repeating Actions',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Loops allow you to repeat code multiple times without writing it over and over.
            They're perfect for tasks that need to be done repeatedly.
          </p>

          <InteractiveSlider
            label="Set number of repetitions:"
            min={1}
            max={10}
            defaultValue={3}
            renderValue={(value) => (
              <div className="flex flex-col items-center">
                <span>{value} times</span>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: value }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="text-2xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      🔄
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          />

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="text-center text-white font-bold text-lg mb-4">
                Loop Flow Visualization
              </div>

              <div className="flex items-center justify-center space-x-4">
                <motion.div
                  className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <div className="text-white font-semibold">START</div>
                  <div className="text-sm text-white/70">i = 1</div>
                </motion.div>

                <span className="text-2xl text-white">→</span>

                <motion.div
                  className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4 text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
                >
                  <div className="text-white font-semibold">CHECK</div>
                  <div className="text-sm text-white/70">i ≤ 5?</div>
                </motion.div>

                <span className="text-2xl text-white">→</span>

                <motion.div
                  className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4 text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 1 }}
                >
                  <div className="text-white font-semibold">EXECUTE</div>
                  <div className="text-sm text-white/70">Print i</div>
                </motion.div>

                <span className="text-2xl text-white">→</span>

                <motion.div
                  className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, delay: 1.5 }}
                >
                  <div className="text-white font-semibold">UPDATE</div>
                  <div className="text-sm text-white/70">i = i + 1</div>
                </motion.div>
              </div>

              <div className="text-center text-white/70 text-sm mt-4">
                ↻ Loop continues until condition is false
              </div>
            </div>
          </AnimatedDiagram>

          <div className="bg-white/5 rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-4">Real-World Example: Washing Dishes</h4>
            <div className="space-y-2 text-white/90">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">1️⃣</span>
                <span>while (dishes remain)</span>
              </div>
              <div className="flex items-center space-x-3 ml-8">
                <span className="text-2xl">🍽️</span>
                <span>Grab a dish</span>
              </div>
              <div className="flex items-center space-x-3 ml-8">
                <span className="text-2xl">🧼</span>
                <span>Wash it</span>
              </div>
              <div className="flex items-center space-x-3 ml-8">
                <span className="text-2xl">💧</span>
                <span>Rinse it</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">✅</span>
                <span>Repeat until no dishes left!</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Quiz: Test Your Knowledge',
      estimatedTime: '5 min',
      content: (() => {
        const quizQuestions: QuizQuestion[] = [
          {
            question: 'What is a variable in programming?',
            options: [
              'A storage container for data',
              'A type of loop',
              'A mathematical formula',
              'A programming language'
            ],
            correctAnswer: 0,
            explanation: 'Variables are containers that store information, like labeled boxes for data.'
          },
          {
            question: 'What is the main purpose of a function?',
            options: [
              'To display colors',
              'To create reusable blocks of code',
              'To slow down the program',
              'To delete variables'
            ],
            correctAnswer: 1,
            explanation: 'Functions let you write code once and reuse it many times, making programs more organized.'
          },
          {
            question: 'What does a loop do?',
            options: [
              'Stops the program',
              'Repeats code multiple times',
              'Deletes old code',
              'Creates new variables'
            ],
            correctAnswer: 1,
            explanation: 'Loops repeat code multiple times without having to write it over and over.'
          },
          {
            question: 'Which is an example of a Boolean value?',
            options: [
              '"Hello World"',
              '42',
              'true',
              '[1, 2, 3]'
            ],
            correctAnswer: 2,
            explanation: 'Boolean values are either true or false, used for yes/no decisions.'
          },
          {
            question: 'What happens when a program executes?',
            options: [
              'Nothing at all',
              'It runs instructions line by line',
              'It deletes itself',
              'It creates new code'
            ],
            correctAnswer: 1,
            explanation: 'Programs execute by running instructions one at a time, in order, from top to bottom.'
          }
        ]

        const handleQuizComplete = (score: number) => {
          const { addXP } = useUserStore.getState()
          const { completeTutorial } = useTutorialStore.getState()

          // Award XP based on score
          const xpReward = score === 100 ? 100 : score >= 80 ? 50 : 25
          addXP(xpReward)

          // Mark tutorial as complete with quiz score
          completeTutorial('software-dev-tutorial', score)

          // Check for "Thinker" achievement (100% quiz score)
          if (score === 100) {
            setTimeout(() => achievementManager.checkAll(), 1000)
          }
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🧠</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Test Your Knowledge?
              </h3>
              <p className="text-white/80">
                Answer 5 questions to see how much you&apos;ve learned!
              </p>
            </div>

            <QuizComponent questions={quizQuestions} onComplete={handleQuizComplete} />
          </div>
        )
      })(),
    },
    {
      id: 6,
      title: 'Key Takeaways & Next Steps',
      estimatedTime: '2 min',
      content: (
        <div className="space-y-6">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-3xl font-bold text-white mb-2">Congratulations!</h3>
            <p className="text-white/80 text-lg">
              You've learned the core concepts of programming
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl mb-3">✅</div>
              <h4 className="text-xl font-bold text-white mb-2">What You Learned:</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Programs execute line by line</li>
                <li>• Variables store data</li>
                <li>• Functions organize reusable code</li>
                <li>• Loops save repetition</li>
              </ul>
            </motion.div>

            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl mb-3">🎮</div>
              <h4 className="text-xl font-bold text-white mb-2">What's Next:</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Play the Code Block Constructor game</li>
                <li>• Try the Code Simulator sandbox</li>
                <li>• Practice building algorithms</li>
                <li>• Explore other topics</li>
              </ul>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-christmas-gold/20 to-yellow-500/20 border-2 border-christmas-gold rounded-lg p-6 text-center">
            <p className="text-white text-lg font-semibold">
              🌟 You earned <span className="text-christmas-gold text-2xl">+50 XP</span> for completing this tutorial!
            </p>
          </div>
        </div>
      ),
    },
  ] as TutorialSection[],
}
