export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  color: string
  gradient: string
  tutorialId: string
  gameId: string
  sandboxId: string
}

export const TOPICS: Topic[] = [
  {
    id: 'software-dev',
    title: 'Software Development',
    description: 'Learn programming fundamentals through variables, functions, loops, and algorithms',
    icon: '💻',
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-700',
    tutorialId: 'software-dev-tutorial',
    gameId: 'code-block-game',
    sandboxId: 'code-simulator',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Build beautiful websites with HTML, CSS, and responsive design principles',
    icon: '🌐',
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-700',
    tutorialId: 'web-dev-tutorial',
    gameId: 'html-builder-game',
    sandboxId: 'web-builder-sandbox',
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'Design and build mobile apps with intuitive user flows and interactions',
    icon: '📱',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-700',
    tutorialId: 'mobile-app-tutorial',
    gameId: 'user-flow-game',
    sandboxId: 'app-designer-sandbox',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Understand neural networks, training, and how AI makes predictions',
    icon: '🤖',
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-700',
    tutorialId: 'ai-ml-tutorial',
    gameId: 'neural-network-game',
    sandboxId: 'ai-playground-sandbox',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Transform raw data into insights through analysis and visualization',
    icon: '📊',
    color: '#F59E0B',
    gradient: 'from-orange-500 to-amber-700',
    tutorialId: 'data-science-tutorial',
    gameId: 'data-pipeline-game',
    sandboxId: 'data-lab-sandbox',
  },
  {
    id: 'graphics-design',
    title: 'Graphics Design',
    description: 'Master color theory, composition, and visual hierarchy in design',
    icon: '🎨',
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-600',
    tutorialId: 'graphics-design-tutorial',
    gameId: 'design-matcher-game',
    sandboxId: 'design-studio-sandbox',
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    description: 'Plan and create engaging content strategies across multiple platforms',
    icon: '📝',
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-700',
    tutorialId: 'content-creation-tutorial',
    gameId: 'content-mixer-game',
    sandboxId: 'content-planner-sandbox',
  },
]

export const getTopicById = (id: string): Topic | undefined => {
  return TOPICS.find((topic) => topic.id === id)
}
