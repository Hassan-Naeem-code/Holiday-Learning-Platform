import { motion } from 'framer-motion'
import AnimatedDiagram from '@/components/Tutorials/AnimatedDiagram'
import QuizComponent, { QuizQuestion } from '@/components/Tutorials/QuizComponent'
import { TutorialSection } from '@/components/Tutorials/TutorialPlayer'
import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { achievementManager } from '@/utils/achievementManager'

export const contentCreationTutorial = {
  title: 'Content Creation Mastery',
  icon: '✍️',
  sections: [
    {
      id: 1,
      title: 'Content Strategy',
      estimatedTime: '3 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Great content doesn't happen by accident! A solid content strategy helps you create
            meaningful content that resonates with your audience and achieves your goals.
          </p>

          <AnimatedDiagram>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-white font-semibold mb-2">Know Your Audience</div>
                <div className="text-white/70 text-sm">
                  Understand who you're creating content for
                </div>
              </motion.div>

              <motion.div
                className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl mb-2">📊</div>
                <div className="text-white font-semibold mb-2">Set Clear Goals</div>
                <div className="text-white/70 text-sm">
                  Define what success looks like
                </div>
              </motion.div>

              <motion.div
                className="bg-green-500/20 border-2 border-green-500 rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl mb-2">📅</div>
                <div className="text-white font-semibold mb-2">Plan Ahead</div>
                <div className="text-white/70 text-sm">
                  Create a content calendar
                </div>
              </motion.div>
            </div>
          </AnimatedDiagram>

          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-blue-400">Key Idea:</strong> Successful content starts with strategy.
              Know your audience, set goals, and plan your content systematically.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-bold text-white">Content Strategy Framework:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">❓</span>
                  <span className="text-white font-semibold">Why?</span>
                </div>
                <p className="text-white/70 text-sm">Define your purpose and goals</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">👥</span>
                  <span className="text-white font-semibold">Who?</span>
                </div>
                <p className="text-white/70 text-sm">Identify your target audience</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">📝</span>
                  <span className="text-white font-semibold">What?</span>
                </div>
                <p className="text-white/70 text-sm">Choose topics and formats</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">📅</span>
                  <span className="text-white font-semibold">When?</span>
                </div>
                <p className="text-white/70 text-sm">Schedule publishing times</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Writing for Engagement',
      estimatedTime: '4 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Engaging content grabs attention and keeps people reading! Learn the secrets
            to writing content that your audience loves and shares.
          </p>

          <AnimatedDiagram>
            <div className="space-y-4">
              <div className="text-center text-white font-bold text-lg mb-4">
                The AIDA Formula
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                  className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-3xl mb-2">👀</div>
                  <div className="text-white font-semibold mb-2">Attention</div>
                  <div className="text-white/70 text-sm">
                    Grab their focus
                  </div>
                </motion.div>

                <motion.div
                  className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-3xl mb-2">💡</div>
                  <div className="text-white font-semibold mb-2">Interest</div>
                  <div className="text-white/70 text-sm">
                    Keep them reading
                  </div>
                </motion.div>

                <motion.div
                  className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-3xl mb-2">💖</div>
                  <div className="text-white font-semibold mb-2">Desire</div>
                  <div className="text-white/70 text-sm">
                    Make them want it
                  </div>
                </motion.div>

                <motion.div
                  className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="text-white font-semibold mb-2">Action</div>
                  <div className="text-white/70 text-sm">
                    Tell them what to do
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedDiagram>

          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Writing Tips for Engagement:</h4>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Start with a Hook</div>
                    <div className="text-white/70 text-sm">
                      Open with something surprising, interesting, or valuable
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Use Simple Language</div>
                    <div className="text-white/70 text-sm">
                      Write like you talk - clear, conversational, easy to understand
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📖</span>
                  <div>
                    <div className="text-white font-semibold mb-1">Tell Stories</div>
                    <div className="text-white/70 text-sm">
                      Stories connect emotionally and are more memorable
                    </div>
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
      title: 'Content Types & Formats',
      estimatedTime: '5 min',
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            Different content types serve different purposes! Understanding when to use
            blog posts, videos, infographics, and more helps you reach your audience effectively.
          </p>

          <AnimatedDiagram>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl mb-2">📝</div>
                <div className="text-white font-semibold mb-2">Blog Posts</div>
                <div className="text-white/70 text-sm mb-2">
                  Great for: SEO, detailed explanations, tutorials
                </div>
                <div className="text-green-400 text-xs">Best for building authority</div>
              </motion.div>

              <motion.div
                className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl mb-2">🎥</div>
                <div className="text-white font-semibold mb-2">Videos</div>
                <div className="text-white/70 text-sm mb-2">
                  Great for: Demonstrations, entertainment, viral potential
                </div>
                <div className="text-purple-400 text-xs">Best for engagement</div>
              </motion.div>

              <motion.div
                className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl mb-2">📊</div>
                <div className="text-white font-semibold mb-2">Infographics</div>
                <div className="text-white/70 text-sm mb-2">
                  Great for: Data visualization, quick facts, shareability
                </div>
                <div className="text-green-400 text-xs">Best for sharing</div>
              </motion.div>

              <motion.div
                className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-3xl mb-2">📱</div>
                <div className="text-white font-semibold mb-2">Social Posts</div>
                <div className="text-white/70 text-sm mb-2">
                  Great for: Quick updates, community building, conversations
                </div>
                <div className="text-orange-400 text-xs">Best for reach</div>
              </motion.div>
            </div>
          </AnimatedDiagram>

          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-white/90">
              <strong className="text-yellow-400">Pro Tip:</strong> Repurpose content across formats!
              Turn a blog post into a video, infographic, and social posts to maximize value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-green-400 font-semibold mb-2">✓ Content Best Practices:</div>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Know your audience preferences</li>
                <li>• Use clear, compelling headlines</li>
                <li>• Include visuals and formatting</li>
                <li>• Add clear calls-to-action</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-red-400 font-semibold mb-2">✗ Avoid These Mistakes:</div>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Writing without a purpose</li>
                <li>• Ignoring SEO basics</li>
                <li>• Inconsistent posting</li>
                <li>• No promotion strategy</li>
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
            question: 'What is the first step in content strategy?',
            options: [
              'Write the content',
              'Know your audience',
              'Choose a format',
              'Publish immediately'
            ],
            correctAnswer: 1,
            explanation: 'Understanding your audience is the foundation of any content strategy. You need to know who you\'re creating for.'
          },
          {
            question: 'What does AIDA stand for in content writing?',
            options: [
              'Attention, Interest, Desire, Action',
              'Article, Image, Design, Analytics',
              'Author, Idea, Draft, Approval',
              'Audience, Intent, Distribution, Analysis'
            ],
            correctAnswer: 0,
            explanation: 'AIDA is a copywriting formula: Attention, Interest, Desire, Action. It helps structure engaging content.'
          },
          {
            question: 'Which content type is best for SEO and detailed explanations?',
            options: [
              'Social posts',
              'Videos',
              'Blog posts',
              'Infographics'
            ],
            correctAnswer: 2,
            explanation: 'Blog posts are excellent for SEO, detailed explanations, and building authority on topics.'
          },
          {
            question: 'What is content repurposing?',
            options: [
              'Deleting old content',
              'Using the same content across different formats',
              'Copying other people\'s content',
              'Writing content faster'
            ],
            correctAnswer: 1,
            explanation: 'Content repurposing means transforming one piece of content into multiple formats to maximize its value.'
          },
          {
            question: 'Which is a best practice for content creation?',
            options: [
              'Post randomly without planning',
              'Use clickbait headlines',
              'Include clear calls-to-action',
              'Never use visuals'
            ],
            correctAnswer: 2,
            explanation: 'Including clear calls-to-action guides your audience on what to do next, making your content more effective.'
          }
        ]

        const handleQuizComplete = (score: number) => {
          const { addXP } = useUserStore.getState()
          const { completeTutorial } = useTutorialStore.getState()

          const xpReward = score === 100 ? 100 : score >= 80 ? 50 : 25
          addXP(xpReward)

          completeTutorial('content-creation-tutorial', score)

          if (score === 100) {
            setTimeout(() => achievementManager.checkAll(), 1000)
          }
        }

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">✍️</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Test Your Content Knowledge?
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
              You've mastered the essentials of Content Creation!
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
                <li>• Content strategy framework</li>
                <li>• AIDA formula for engagement</li>
                <li>• Different content types</li>
                <li>• Best practices & mistakes to avoid</li>
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
                <li>• Play the Content Mixer game</li>
                <li>• Try the Content Planner sandbox</li>
                <li>• Create your content calendar</li>
                <li>• Start producing content</li>
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
