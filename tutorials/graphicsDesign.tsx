import { motion } from 'framer-motion'
import AnimatedDiagram from '@/components/Tutorials/AnimatedDiagram'
import QuizComponent, { QuizQuestion } from '@/components/Tutorials/QuizComponent'
import { TutorialSection } from '@/components/Tutorials/TutorialPlayer'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'

export const graphicsDesignTutorial = {
  title: 'Graphics Design Principles',
  icon: '🎨',
  sections: [
    {
      id: 1,
      title: 'Design Principles',
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Great design isn't just about making things look pretty - it's about communication!
            Good design principles help your message stand out and be understood easily.
          </p>

          <AnimatedDiagram>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl mb-2">⚖️</div>
                <div className="text-white font-semibold mb-2">Balance</div>
                <div className="text-white/70 text-sm">
                  Distribute visual weight evenly across your design
                </div>
              </motion.div>

              <motion.div
                className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-white font-semibold mb-2">Contrast</div>
                <div className="text-white/70 text-sm">
                  Make important elements stand out from the rest
                </div>
              </motion.div>

              <motion.div
                className="bg-green-500/20 border-2 border-green-500 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl mb-2">📐</div>
                <div className="text-white font-semibold mb-2">Alignment</div>
                <div className="text-white/70 text-sm">
                  Line up elements to create order and organization
                </div>
              </motion.div>

              <motion.div
                className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-3xl mb-2">🔄</div>
                <div className="text-white font-semibold mb-2">Repetition</div>
                <div className="text-white/70 text-sm">
                  Repeat visual elements for unity and consistency
                </div>
              </motion.div>
            </div>
          </AnimatedDiagram>

          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-blue-400">Key Idea:</strong> These four principles (Balance, Contrast, Alignment, Repetition) form the foundation of effective visual design.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Color Theory',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Colors are powerful! They can evoke emotions, create mood, and guide attention.
            Understanding color theory helps you choose the perfect palette for your designs.
          </p>

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="text-center text-white font-bold text-lg mb-4">
                The Color Wheel
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative w-64 h-64 rounded-full bg-gradient-conic from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-red-500"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="text-white font-semibold mb-2">Primary Colors</div>
                  <div className="flex space-x-2 mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded"></div>
                    <div className="w-8 h-8 bg-yellow-500 rounded"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                  </div>
                  <div className="text-white/70 text-sm">Cannot be created by mixing</div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl mb-2">🌈</div>
                  <div className="text-white font-semibold mb-2">Secondary Colors</div>
                  <div className="flex space-x-2 mb-2">
                    <div className="w-8 h-8 bg-orange-500 rounded"></div>
                    <div className="w-8 h-8 bg-green-500 rounded"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded"></div>
                  </div>
                  <div className="text-white/70 text-sm">Mix two primary colors</div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl mb-2">✨</div>
                  <div className="text-white font-semibold mb-2">Complementary</div>
                  <div className="flex space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded"></div>
                  </div>
                  <div className="text-white/70 text-sm">Opposite on color wheel</div>
                </div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Color Psychology:</h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-500/20 border-l-4 border-red-500 p-3 rounded">
                <span className="text-white font-semibold">Red:</span>
                <span className="text-white/70 text-sm ml-2">Energy, Passion, Urgency</span>
              </div>
              <div className="bg-blue-500/20 border-l-4 border-blue-500 p-3 rounded">
                <span className="text-white font-semibold">Blue:</span>
                <span className="text-white/70 text-sm ml-2">Trust, Calm, Professional</span>
              </div>
              <div className="bg-green-500/20 border-l-4 border-green-500 p-3 rounded">
                <span className="text-white font-semibold">Green:</span>
                <span className="text-white/70 text-sm ml-2">Growth, Nature, Health</span>
              </div>
              <div className="bg-yellow-500/20 border-l-4 border-yellow-500 p-3 rounded">
                <span className="text-white font-semibold">Yellow:</span>
                <span className="text-white/70 text-sm ml-2">Optimism, Clarity, Warmth</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Typography',
      estimatedTime: '5 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Typography is the art of arranging text. The right font can make your design sing,
            while the wrong one can ruin even the best layout. Let's explore the basics!
          </p>

          <AnimatedDiagram>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-3xl font-serif mb-2">Aa</div>
                  <div className="text-white font-semibold mb-2">Serif</div>
                  <div className="text-white/70 text-sm">
                    Classic, Traditional, Formal
                  </div>
                </motion.div>

                <motion.div
                  className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-3xl font-sans mb-2">Aa</div>
                  <div className="text-white font-semibold mb-2">Sans-Serif</div>
                  <div className="text-white/70 text-sm">
                    Modern, Clean, Minimal
                  </div>
                </motion.div>

                <motion.div
                  className="bg-green-500/20 border-2 border-green-500 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-3xl font-mono mb-2">Aa</div>
                  <div className="text-white font-semibold mb-2">Monospace</div>
                  <div className="text-white/70 text-sm">
                    Code, Technical, Precise
                  </div>
                </motion.div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-white font-bold text-lg mb-4">Typography Hierarchy</h4>
                <div className="space-y-3">
                  <div className="text-4xl font-bold text-white">Main Heading</div>
                  <div className="text-2xl font-semibold text-white/90">Subheading</div>
                  <div className="text-lg text-white/80">
                    Body text is comfortable to read and provides detailed information.
                    It should be clear and easy on the eyes.
                  </div>
                  <div className="text-sm text-white/60">Small text for captions and notes</div>
                </div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-yellow-400">Pro Tip:</strong> Limit yourself to 2-3 fonts maximum in a design.
              Too many fonts create visual chaos!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-green-400 font-semibold mb-2">✓ Do:</div>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Use hierarchy for clarity</li>
                <li>• Ensure good contrast</li>
                <li>• Keep line length readable</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-red-400 font-semibold mb-2">✗ Don't:</div>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Use too many fonts</li>
                <li>• Make text too small</li>
                <li>• Ignore spacing</li>
              </ul>
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
            question: 'Which design principle involves distributing visual weight evenly?',
            options: [
              'Contrast',
              'Balance',
              'Repetition',
              'Alignment'
            ],
            correctAnswer: 1,
            explanation: 'Balance is about distributing visual weight evenly across your design to create stability.'
          },
          {
            question: 'What are the three primary colors?',
            options: [
              'Red, Green, Blue',
              'Red, Yellow, Blue',
              'Orange, Purple, Green',
              'Red, Yellow, Green'
            ],
            correctAnswer: 1,
            explanation: 'The three primary colors are Red, Yellow, and Blue. They cannot be created by mixing other colors.'
          },
          {
            question: 'What does blue color typically represent?',
            options: [
              'Energy and passion',
              'Growth and nature',
              'Trust and calm',
              'Warning and caution'
            ],
            correctAnswer: 2,
            explanation: 'Blue typically represents trust, calmness, and professionalism, which is why many corporate brands use it.'
          },
          {
            question: 'Which font type is best for modern, clean designs?',
            options: [
              'Serif',
              'Script',
              'Sans-Serif',
              'Decorative'
            ],
            correctAnswer: 2,
            explanation: 'Sans-Serif fonts are modern, clean, and minimal, making them perfect for contemporary designs.'
          },
          {
            question: 'How many fonts should you typically use in a design?',
            options: [
              '1 font only',
              '2-3 fonts maximum',
              '5-6 fonts for variety',
              'As many as possible'
            ],
            correctAnswer: 1,
            explanation: 'Limit yourself to 2-3 fonts maximum in a design. Too many fonts create visual chaos and confusion.'
          }
        ]

        const handleQuizComplete = (score: number) => {
          const { addXP } = useUserStore.getState()
          const { completeTutorial } = useTutorialStore.getState()

          const xpReward = score === 100 ? 100 : score >= 80 ? 50 : 25
          addXP(xpReward)

          completeTutorial('graphics-design-tutorial', score)

          if (score === 100) {
            setTimeout(() => achievementManager.checkAll(), 1000)
          }
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Test Your Design Knowledge?
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
              You've learned the fundamentals of Graphics Design!
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
                <li>• 4 key design principles</li>
                <li>• Color theory and psychology</li>
                <li>• Typography fundamentals</li>
                <li>• Visual hierarchy basics</li>
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
                <li>• Play the Design Matcher game</li>
                <li>• Try the Design Studio sandbox</li>
                <li>• Create your own designs</li>
                <li>• Experiment with colors</li>
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
