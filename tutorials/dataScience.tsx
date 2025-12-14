import { motion } from 'framer-motion'
import AnimatedDiagram from '@/components/Tutorials/AnimatedDiagram'
import InteractiveSlider from '@/components/Tutorials/InteractiveSlider'
import QuizComponent, { QuizQuestion } from '@/components/Tutorials/QuizComponent'
import { TutorialSection } from '@/components/Tutorials/TutorialPlayer'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'

export const dataScienceTutorial = {
  title: 'Data Science Fundamentals',
  icon: '📊',
  sections: [
    {
      id: 1,
      title: 'What is Data Science?',
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Data Science is like being a detective for numbers! It's about discovering hidden patterns,
            making predictions, and turning raw data into valuable insights that help make better decisions.
          </p>

          <AnimatedDiagram>
            <div className="text-center space-y-4">
              <motion.div
                className="inline-block bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-4xl mb-2">📊</div>
                <div className="text-white font-semibold">Raw Data</div>
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
                <div className="text-4xl mb-2">🔬</div>
                <div className="text-white font-semibold">Analysis</div>
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
                <div className="text-4xl mb-2">💡</div>
                <div className="text-white font-semibold">Insights</div>
              </motion.div>
            </div>
          </AnimatedDiagram>

          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-blue-400">Key Idea:</strong> Data Science combines statistics,
              programming, and domain knowledge to extract meaningful information from data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🛒</span>
                <span className="text-white font-semibold">E-commerce</span>
              </div>
              <p className="text-white/70 text-sm">Recommend products based on browsing history</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🏥</span>
                <span className="text-white font-semibold">Healthcare</span>
              </div>
              <p className="text-white/70 text-sm">Predict disease outbreaks and patient outcomes</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">💰</span>
                <span className="text-white font-semibold">Finance</span>
              </div>
              <p className="text-white/70 text-sm">Detect fraud and assess credit risk</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🌤️</span>
                <span className="text-white font-semibold">Weather</span>
              </div>
              <p className="text-white/70 text-sm">Forecast weather patterns accurately</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Data Analysis Process',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Data analysis follows a systematic process to turn messy data into clear insights.
            Think of it as cooking - you need the right ingredients (data), preparation (cleaning),
            and techniques (analysis) to create something valuable!
          </p>

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="text-center text-white font-bold text-lg mb-4">
                The Data Analysis Pipeline
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                  className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-3xl mb-2">📥</div>
                  <div className="text-white font-semibold mb-2">1. Collect</div>
                  <div className="text-white/70 text-sm">
                    Gather data from various sources
                  </div>
                </motion.div>

                <motion.div
                  className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-3xl mb-2">🧹</div>
                  <div className="text-white font-semibold mb-2">2. Clean</div>
                  <div className="text-white/70 text-sm">
                    Remove errors and inconsistencies
                  </div>
                </motion.div>

                <motion.div
                  className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-3xl mb-2">🔍</div>
                  <div className="text-white font-semibold mb-2">3. Analyze</div>
                  <div className="text-white/70 text-sm">
                    Find patterns and relationships
                  </div>
                </motion.div>

                <motion.div
                  className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-white font-semibold mb-2">4. Visualize</div>
                  <div className="text-white/70 text-sm">
                    Present findings clearly
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Common Data Operations:</h4>

            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="text-white font-semibold mb-1">Filter</div>
                  <div className="text-white/70 text-sm">
                    Select specific rows based on conditions (e.g., show only sales &gt; $100)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📊</span>
                <div>
                  <div className="text-white font-semibold mb-1">Sort</div>
                  <div className="text-white/70 text-sm">
                    Arrange data in order (e.g., sort customers by purchase amount)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">➕</span>
                <div>
                  <div className="text-white font-semibold mb-1">Aggregate</div>
                  <div className="text-white/70 text-sm">
                    Combine data (e.g., calculate total sales, average age)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Data Visualization',
      estimatedTime: '5 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Data visualization turns numbers into pictures! A good chart can reveal patterns instantly
            that would take hours to find in spreadsheets. It's like turning a phone book into a map!
          </p>

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="text-center text-white font-bold text-lg mb-4">
                Popular Chart Types
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-white font-semibold mb-2">Bar Chart</div>
                  <div className="text-white/70 text-sm mb-3">
                    Compare different categories
                  </div>
                  <div className="flex items-end space-x-2 h-20">
                    <div className="flex-1 bg-blue-400 rounded-t" style={{ height: '60%' }}></div>
                    <div className="flex-1 bg-blue-400 rounded-t" style={{ height: '85%' }}></div>
                    <div className="flex-1 bg-blue-400 rounded-t" style={{ height: '45%' }}></div>
                    <div className="flex-1 bg-blue-400 rounded-t" style={{ height: '100%' }}></div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-white font-semibold mb-2">Line Chart</div>
                  <div className="text-white/70 text-sm mb-3">
                    Show trends over time
                  </div>
                  <div className="relative h-20">
                    <svg className="w-full h-full" viewBox="0 0 100 50">
                      <polyline
                        points="0,40 25,30 50,20 75,15 100,10"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-3xl mb-2">🥧</div>
                  <div className="text-white font-semibold mb-2">Pie Chart</div>
                  <div className="text-white/70 text-sm mb-3">
                    Show parts of a whole
                  </div>
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-3xl mb-2">📉</div>
                  <div className="text-white font-semibold mb-2">Scatter Plot</div>
                  <div className="text-white/70 text-sm mb-3">
                    Find relationships between variables
                  </div>
                  <div className="relative h-20">
                    <div className="absolute" style={{ left: '20%', top: '40%', width: '6px', height: '6px', backgroundColor: '#fb923c', borderRadius: '50%' }}></div>
                    <div className="absolute" style={{ left: '40%', top: '30%', width: '6px', height: '6px', backgroundColor: '#fb923c', borderRadius: '50%' }}></div>
                    <div className="absolute" style={{ left: '60%', top: '20%', width: '6px', height: '6px', backgroundColor: '#fb923c', borderRadius: '50%' }}></div>
                    <div className="absolute" style={{ left: '80%', top: '10%', width: '6px', height: '6px', backgroundColor: '#fb923c', borderRadius: '50%' }}></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-yellow-400">Best Practice:</strong> Choose the right chart for your data!
              Bar charts for comparisons, line charts for trends, pie charts for proportions.
            </p>
          </div>

          <InteractiveSlider
            label="Dataset size:"
            min={10}
            max={1000}
            defaultValue={100}
            renderValue={(value) => (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-christmas-gold">{value} rows</span>
                <div className="mt-2 text-white/70 text-sm">
                  {value < 100 ? 'Small dataset' : value < 500 ? 'Medium dataset' : 'Large dataset'}
                </div>
              </div>
            )}
          />
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
            question: 'What is the first step in the data analysis process?',
            options: [
              'Visualize the data',
              'Collect the data',
              'Clean the data',
              'Analyze the data'
            ],
            correctAnswer: 1,
            explanation: 'You must first collect data from various sources before you can clean, analyze, or visualize it.'
          },
          {
            question: 'Which chart type is best for showing trends over time?',
            options: [
              'Pie chart',
              'Bar chart',
              'Line chart',
              'Scatter plot'
            ],
            correctAnswer: 2,
            explanation: 'Line charts are perfect for showing how values change over time, making trends easy to spot.'
          },
          {
            question: 'What does "filtering" data mean?',
            options: [
              'Deleting all the data',
              'Selecting specific rows based on conditions',
              'Changing the data format',
              'Making the data colorful'
            ],
            correctAnswer: 1,
            explanation: 'Filtering selects specific rows that meet certain criteria, like showing only sales above a certain amount.'
          },
          {
            question: 'Which is NOT a common data operation?',
            options: [
              'Filter',
              'Sort',
              'Dance',
              'Aggregate'
            ],
            correctAnswer: 2,
            explanation: 'Filter, sort, and aggregate are all common data operations. Dancing is fun but not a data operation!'
          },
          {
            question: 'What does data visualization help us do?',
            options: [
              'Make data look pretty',
              'Turn numbers into pictures to reveal patterns',
              'Delete unwanted data',
              'Create more data'
            ],
            correctAnswer: 1,
            explanation: 'Data visualization converts numbers into visual representations, making patterns and insights much easier to understand.'
          }
        ]

        const handleQuizComplete = (score: number) => {
          const { addXP } = useUserStore.getState()
          const { completeTutorial } = useTutorialStore.getState()

          const xpReward = score === 100 ? 100 : score >= 80 ? 50 : 25
          addXP(xpReward)

          completeTutorial('data-science-tutorial', score)

          if (score === 100) {
            setTimeout(() => achievementManager.checkAll(), 1000)
          }
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">📊</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Test Your Data Science Knowledge?
              </h3>
              <p className="text-white/80">
                Answer 5 questions to see how much you've learned!
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
              You've mastered the basics of Data Science!
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
                <li>• Data Science finds patterns in data</li>
                <li>• Analysis has 4 steps: Collect, Clean, Analyze, Visualize</li>
                <li>• Different charts for different purposes</li>
                <li>• Data operations: filter, sort, aggregate</li>
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
                <li>• Play the Data Pipeline game</li>
                <li>• Try the Data Lab sandbox</li>
                <li>• Practice analyzing datasets</li>
                <li>• Create your own visualizations</li>
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
