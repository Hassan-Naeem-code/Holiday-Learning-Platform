import { motion } from 'framer-motion'
import AnimatedDiagram from '@/components/Tutorials/AnimatedDiagram'
import InteractiveSlider from '@/components/Tutorials/InteractiveSlider'
import QuizComponent, { QuizQuestion } from '@/components/Tutorials/QuizComponent'
import { TutorialSection } from '@/components/Tutorials/TutorialPlayer'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'

export const aiMachineLearningTutorial = {
  title: 'AI & Machine Learning Basics',
  icon: '🤖',
  sections: [
    {
      id: 1,
      title: 'Introduction to Artificial Intelligence',
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Artificial Intelligence (AI) is like teaching computers to think and learn like humans!
            Instead of following strict instructions, AI can adapt, recognize patterns, and make decisions.
          </p>

          <AnimatedDiagram>
            <div className="text-center space-y-4">
              <motion.div
                className="inline-block bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-4xl mb-2">📊</div>
                <div className="text-white font-semibold">Data</div>
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
                <div className="text-4xl mb-2">🤖</div>
                <div className="text-white font-semibold">AI Model</div>
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
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-white font-semibold">Predictions</div>
              </motion.div>
            </div>
          </AnimatedDiagram>

          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-blue-400">Key Idea:</strong> AI learns from examples (data)
              to make predictions or decisions without being explicitly programmed for every scenario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🗣️</span>
                <span className="text-white font-semibold">Voice Assistants</span>
              </div>
              <p className="text-white/70 text-sm">Siri, Alexa understand your speech</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🎬</span>
                <span className="text-white font-semibold">Recommendations</span>
              </div>
              <p className="text-white/70 text-sm">Netflix suggests shows you'll like</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🚗</span>
                <span className="text-white font-semibold">Self-Driving Cars</span>
              </div>
              <p className="text-white/70 text-sm">Cars navigate without drivers</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">📸</span>
                <span className="text-white font-semibold">Face Recognition</span>
              </div>
              <p className="text-white/70 text-sm">Your phone unlocks with your face</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Machine Learning is a type of AI where computers learn from experience.
            Think of it like teaching a child to recognize animals - the more examples you show,
            the better they get at identifying new ones!
          </p>

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="text-center text-white font-bold text-lg mb-4">
                How Machine Learning Works
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-white font-semibold mb-2">Step 1: Training</div>
                  <div className="text-white/70 text-sm">
                    Feed the model lots of examples with answers
                  </div>
                </motion.div>

                <motion.div
                  className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-3xl mb-2">🧠</div>
                  <div className="text-white font-semibold mb-2">Step 2: Learning</div>
                  <div className="text-white/70 text-sm">
                    Model finds patterns in the data
                  </div>
                </motion.div>

                <motion.div
                  className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-white font-semibold mb-2">Step 3: Predicting</div>
                  <div className="text-white/70 text-sm">
                    Model makes predictions on new data
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Types of Machine Learning:</h4>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">✓</span>
                <div>
                  <div className="text-white font-semibold mb-1">Supervised Learning</div>
                  <div className="text-white/70 text-sm">
                    Learning with labeled examples (like flashcards with answers)
                  </div>
                  <div className="text-green-400 text-xs mt-1">Example: Email spam detection</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="text-white font-semibold mb-1">Unsupervised Learning</div>
                  <div className="text-white/70 text-sm">
                    Finding patterns without labeled examples
                  </div>
                  <div className="text-purple-400 text-xs mt-1">Example: Customer grouping</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-2 border-orange-500 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <div className="text-white font-semibold mb-1">Reinforcement Learning</div>
                  <div className="text-white/70 text-sm">
                    Learning through trial and error with rewards
                  </div>
                  <div className="text-orange-400 text-xs mt-1">Example: Game-playing AI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Neural Networks: AI\'s Brain',
      estimatedTime: '5 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Neural Networks are inspired by the human brain! They're made of layers of connected
            nodes (like brain cells) that process information and learn patterns.
          </p>

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="text-center text-white font-bold text-lg mb-4">
                Neural Network Structure
              </div>

              <div className="flex items-center justify-around">
                <div className="text-center">
                  <motion.div
                    className="bg-blue-500/30 rounded-lg p-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                  </motion.div>
                  <div className="text-white text-sm mt-2">Input Layer</div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    className="text-3xl"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>

                <div className="text-center">
                  <motion.div
                    className="bg-purple-500/30 rounded-lg p-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                  </motion.div>
                  <div className="text-white text-sm mt-2">Hidden Layers</div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    className="text-3xl"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    →
                  </motion.div>
                </div>

                <div className="text-center">
                  <motion.div
                    className="bg-green-500/30 rounded-lg p-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </motion.div>
                  <div className="text-white text-sm mt-2">Output Layer</div>
                </div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-yellow-400">Analogy:</strong> Think of a neural network as a
              team where each member (node) receives information, processes it, and passes it to the
              next member. The final member makes the decision!
            </p>
          </div>

          <InteractiveSlider
            label="Number of hidden layers:"
            min={1}
            max={5}
            defaultValue={2}
            renderValue={(value) => (
              <div className="flex flex-col items-center">
                <span>{value} layer{value > 1 ? 's' : ''}</span>
                <div className="mt-2 flex gap-2">
                  {Array.from({ length: value }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-12 bg-purple-500/30 rounded-lg border-2 border-purple-500 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-white text-xs font-bold">{i + 1}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-white/60 text-sm mt-2">
                  More layers = More complex patterns!
                </div>
              </div>
            )}
          />

          <div className="bg-white/5 rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-4">Real-World Applications:</h4>
            <div className="space-y-3 text-white/90">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🖼️</span>
                <span><strong>Image Recognition:</strong> Identifying objects in photos</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <span><strong>Natural Language:</strong> Understanding and generating text</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎵</span>
                <span><strong>Music Generation:</strong> Creating original compositions</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏥</span>
                <span><strong>Medical Diagnosis:</strong> Detecting diseases from scans</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Quiz: Test Your Knowledge',
      estimatedTime: '5 min',
      content: (() => {
        const quizQuestions: QuizQuestion[] = [
          {
            question: 'What is Artificial Intelligence?',
            options: [
              'Teaching computers to follow strict instructions',
              'Teaching computers to think and learn like humans',
              'A type of video game',
              'A programming language'
            ],
            correctAnswer: 1,
            explanation: 'AI is about teaching computers to think, learn, and make decisions like humans, not just follow instructions.'
          },
          {
            question: 'What does a machine learning model need to learn?',
            options: [
              'Just time',
              'Data with examples',
              'A new computer',
              'Social media accounts'
            ],
            correctAnswer: 1,
            explanation: 'Machine learning models learn from data - the more examples they see, the better they become at making predictions.'
          },
          {
            question: 'Which type of learning uses labeled examples?',
            options: [
              'Unsupervised Learning',
              'Reinforcement Learning',
              'Supervised Learning',
              'Random Learning'
            ],
            correctAnswer: 2,
            explanation: 'Supervised learning uses labeled data (examples with correct answers) to train models, like flashcards with answers.'
          },
          {
            question: 'What are neural networks inspired by?',
            options: [
              'The internet',
              'The human brain',
              'Computer chips',
              'Social networks'
            ],
            correctAnswer: 1,
            explanation: 'Neural networks are inspired by the human brain, with layers of connected nodes that process information like brain cells.'
          },
          {
            question: 'Which is NOT a real-world AI application?',
            options: [
              'Voice assistants like Siri',
              'Netflix recommendations',
              'Time travel',
              'Face recognition'
            ],
            correctAnswer: 2,
            explanation: 'Voice assistants, recommendations, and face recognition are all real AI applications. Time travel is science fiction!'
          }
        ]

        const handleQuizComplete = (score: number) => {
          const { addXP } = useUserStore.getState()
          const { completeTutorial } = useTutorialStore.getState()

          const xpReward = score === 100 ? 100 : score >= 80 ? 50 : 25
          addXP(xpReward)

          completeTutorial('ai-ml-tutorial', score)

          if (score === 100) {
            setTimeout(() => achievementManager.checkAll(), 1000)
          }
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🧠</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Test Your AI Knowledge?
              </h3>
              <p className="text-white/80">
                Answer 5 questions to see how much you've learned about AI and Machine Learning!
              </p>
            </div>

            <QuizComponent questions={quizQuestions} onComplete={handleQuizComplete} />
          </div>
        )
      })(),
    },
    {
      id: 5,
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
              You've learned the fundamentals of AI and Machine Learning!
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
                <li>• AI teaches computers to think</li>
                <li>• Machine Learning learns from data</li>
                <li>• Neural Networks mimic the brain</li>
                <li>• AI is all around us daily</li>
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
                <li>• Play the Neural Network game</li>
                <li>• Try the AI Playground sandbox</li>
                <li>• Experiment with training models</li>
                <li>• Explore other AI topics</li>
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
