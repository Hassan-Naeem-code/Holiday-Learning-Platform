'use client'

import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'

export const mobileAppDevTutorial = {
  id: 'mobile-app-dev',
  title: 'Mobile App Development',
  icon: <Smartphone className="w-8 h-8" />,
  sections: [
    {
      title: 'Introduction to Mobile Apps',
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">What is a Mobile App?</h3>
            <p className="text-white/80 mb-4">
              A mobile app is software designed specifically to run on mobile devices like smartphones
              and tablets. Unlike websites, mobile apps are installed on the device and can access
              device features like camera, GPS, and notifications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-4xl mb-2">📱</div>
                <h4 className="text-white font-semibold mb-2">Native Apps</h4>
                <p className="text-white/70 text-sm">
                  Built for specific platforms (iOS or Android) using platform-specific languages
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-4xl mb-2">🌐</div>
                <h4 className="text-white font-semibold mb-2">Cross-Platform</h4>
                <p className="text-white/70 text-sm">
                  Write once, run everywhere. Apps that work on both iOS and Android
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-3">Why Learn Mobile App Development?</h3>
            <div className="space-y-2 text-white/80">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📈</span>
                <div>
                  <strong>High Demand:</strong> Billions of smartphone users worldwide
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💰</span>
                <div>
                  <strong>Profitable:</strong> App stores generate billions in revenue
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <strong>Creative:</strong> Build interactive experiences people use daily
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'App Components & UI',
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Building Blocks of Mobile Apps</h3>
            <p className="text-white/80 mb-4">
              Mobile apps are made of reusable components that create the user interface (UI).
              Understanding these components is key to building great apps.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div className="bg-blue-500/20 border-2 border-blue-500 p-3 rounded-lg text-center">
                <div className="text-3xl mb-1">🔘</div>
                <div className="text-white text-sm font-semibold">Button</div>
              </div>
              <div className="bg-green-500/20 border-2 border-green-500 p-3 rounded-lg text-center">
                <div className="text-3xl mb-1">📝</div>
                <div className="text-white text-sm font-semibold">Text Input</div>
              </div>
              <div className="bg-purple-500/20 border-2 border-purple-500 p-3 rounded-lg text-center">
                <div className="text-3xl mb-1">🖼️</div>
                <div className="text-white text-sm font-semibold">Image</div>
              </div>
              <div className="bg-orange-500/20 border-2 border-orange-500 p-3 rounded-lg text-center">
                <div className="text-3xl mb-1">📋</div>
                <div className="text-white text-sm font-semibold">List</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-3">Screen Navigation</h3>
            <p className="text-white/80 mb-4">
              Apps have multiple screens that users navigate between. Understanding navigation
              patterns is crucial for good user experience.
            </p>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center justify-around text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                  <div className="text-sm">Home</div>
                </div>
                <div className="text-2xl">→</div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2"></div>
                  <div className="text-sm">Profile</div>
                </div>
                <div className="text-2xl">→</div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                  <div className="text-sm">Settings</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Popular Frameworks',
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Mobile Development Frameworks</h3>
            <p className="text-white/80 mb-6">
              Choose the right framework based on your goals, team, and project requirements.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">⚛️ React Native</h4>
                <p className="text-white/70 text-sm mb-2">
                  Build mobile apps using React and JavaScript. Used by Facebook, Instagram, and Airbnb.
                </p>
                <div className="flex gap-2">
                  <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs">JavaScript</span>
                  <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs">Cross-platform</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">🎯 Flutter</h4>
                <p className="text-white/70 text-sm mb-2">
                  Google&apos;s UI toolkit for building natively compiled apps from a single codebase.
                </p>
                <div className="flex gap-2">
                  <span className="bg-purple-500/30 text-purple-200 px-2 py-1 rounded text-xs">Dart</span>
                  <span className="bg-purple-500/30 text-purple-200 px-2 py-1 rounded text-xs">Fast</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">🍎 Swift (iOS)</h4>
                <p className="text-white/70 text-sm mb-2">
                  Apple&apos;s modern language for building iOS and macOS apps with native performance.
                </p>
                <div className="flex gap-2">
                  <span className="bg-orange-500/30 text-orange-200 px-2 py-1 rounded text-xs">iOS Only</span>
                  <span className="bg-orange-500/30 text-orange-200 px-2 py-1 rounded text-xs">Native</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">🤖 Kotlin (Android)</h4>
                <p className="text-white/70 text-sm mb-2">
                  Modern language for Android development, officially supported by Google.
                </p>
                <div className="flex gap-2">
                  <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs">Android Only</span>
                  <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs">Native</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      title: 'Quiz Time!',
      content: null,
    },
  ],
  quiz: {
    questions: [
      {
        question: 'What is the main difference between native and cross-platform apps?',
        options: [
          'Native apps work offline, cross-platform apps need internet',
          'Native apps are built for specific platforms, cross-platform apps work on multiple platforms',
          'Native apps are free, cross-platform apps cost money',
          'There is no difference'
        ],
        correctAnswer: 1,
        explanation: 'Native apps are built specifically for one platform (iOS or Android), while cross-platform apps are written once and can run on multiple platforms.'
      },
      {
        question: 'Which framework uses the Dart programming language?',
        options: [
          'React Native',
          'Swift',
          'Flutter',
          'Kotlin'
        ],
        correctAnswer: 2,
        explanation: 'Flutter uses Dart as its programming language. It&apos;s Google&apos;s UI toolkit for building natively compiled applications.'
      },
      {
        question: 'What are the building blocks of mobile app user interfaces called?',
        options: [
          'Widgets',
          'Components',
          'Elements',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Mobile UI building blocks can be called widgets, components, or elements depending on the framework. They all refer to reusable UI pieces like buttons, text inputs, and images.'
      },
      {
        question: 'Which of these is NOT a common mobile UI component?',
        options: [
          'Button',
          'Text Input',
          'Database',
          'Image'
        ],
        correctAnswer: 2,
        explanation: 'Database is a backend data storage system, not a UI component. Buttons, text inputs, and images are all visible UI components users interact with.'
      },
      {
        question: 'Why is screen navigation important in mobile apps?',
        options: [
          'It makes apps run faster',
          'It provides good user experience by organizing content into different screens',
          'It&apos;s required by app stores',
          'It reduces app size'
        ],
        correctAnswer: 1,
        explanation: 'Screen navigation is crucial for user experience. It helps organize content logically and allows users to easily move between different parts of the app.'
      }
    ]
  }
}
