import { motion } from 'framer-motion'
import AnimatedDiagram from '@/components/Tutorials/AnimatedDiagram'
import QuizComponent, { QuizQuestion } from '@/components/Tutorials/QuizComponent'
import { TutorialSection } from '@/components/Tutorials/TutorialPlayer'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'

export const webDevTutorial = {
  title: 'Building Web Pages',
  icon: '🌐',
  sections: [
    {
      id: 1,
      title: 'What is a Web Page?',
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-white">
            A web page is like a digital document made of three key ingredients: HTML (structure), CSS (style), and JavaScript (interactivity).
          </p>

          <AnimatedDiagram>
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-4xl mb-2">🏗️</div>
                <div className="text-white font-bold mb-2">HTML</div>
                <div className="text-white/70 text-sm">Structure & Content</div>
              </motion.div>

              <motion.div
                className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl mb-2">🎨</div>
                <div className="text-white font-bold mb-2">CSS</div>
                <div className="text-white/70 text-sm">Design & Layout</div>
              </motion.div>

              <motion.div
                className="bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-white font-bold mb-2">JavaScript</div>
                <div className="text-white/70 text-sm">Interactivity</div>
              </motion.div>
            </div>
          </AnimatedDiagram>
        </div>
      ),
    },
    {
      id: 2,
      title: 'HTML: The Building Blocks',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-white">
            HTML uses tags to define different parts of a webpage. Think of tags like containers that hold content.
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 font-mono text-sm">
            <div className="text-blue-400">&lt;h1&gt;<span className="text-white">Welcome!</span>&lt;/h1&gt;</div>
            <div className="text-blue-400 mt-2">&lt;p&gt;<span className="text-white">This is a paragraph</span>&lt;/p&gt;</div>
            <div className="text-blue-400 mt-2">&lt;button&gt;<span className="text-white">Click Me</span>&lt;/button&gt;</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl mb-2">📄</div>
              <div className="text-white font-semibold">Common Tags</div>
              <div className="text-white/70 text-sm mt-2">h1-h6, p, div, span, img, a, button</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl mb-2">🔗</div>
              <div className="text-white font-semibold">Attributes</div>
              <div className="text-white/70 text-sm mt-2">href, src, class, id, style</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'CSS: Making it Beautiful',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-white">
            CSS controls how HTML elements look - colors, sizes, layouts, and animations.
          </p>

          <div className="bg-gray-900/50 rounded-lg p-6 font-mono text-sm">
            <div className="text-purple-400">button {'{'}</div>
            <div className="ml-4 text-white">background: blue;</div>
            <div className="ml-4 text-white">color: white;</div>
            <div className="ml-4 text-white">padding: 10px;</div>
            <div className="text-purple-400">{'}'}</div>
          </div>

          <AnimatedDiagram delay={0.2}>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/10 border border-white/30 rounded flex items-center justify-center mb-2">
                  <span className="text-white">Plain</span>
                </div>
                <span className="text-white/70 text-sm">No CSS</span>
              </div>

              <span className="text-3xl text-white">→</span>

              <div className="text-center">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-2 shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-white font-bold">Styled!</span>
                </motion.div>
                <span className="text-white/70 text-sm">With CSS</span>
              </div>
            </div>
          </AnimatedDiagram>
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
            question: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
            correctAnswer: 0,
            explanation: 'HTML stands for Hyper Text Markup Language - it structures web content.'
          },
          {
            question: 'What is CSS used for?',
            options: ['Adding interactivity', 'Styling and layout', 'Database management', 'Server configuration'],
            correctAnswer: 1,
            explanation: 'CSS (Cascading Style Sheets) controls the visual presentation of web pages.'
          },
          {
            question: 'Which tag creates a clickable link?',
            options: ['<link>', '<a>', '<button>', '<click>'],
            correctAnswer: 1,
            explanation: 'The <a> (anchor) tag creates hyperlinks to other pages or resources.'
          },
        ]

        const handleQuizComplete = (score: number) => {
          const { addXP } = useUserStore.getState()
          const { completeTutorial } = useTutorialStore.getState()

          const xpReward = score === 100 ? 100 : score >= 80 ? 50 : 25
          addXP(xpReward)
          completeTutorial('web-dev-tutorial', score)

          if (score === 100) {
            setTimeout(() => achievementManager.checkAll(), 1000)
          }
        }

        return <QuizComponent questions={quizQuestions} onComplete={handleQuizComplete} />
      })(),
    },
  ] as TutorialSection[],
}
