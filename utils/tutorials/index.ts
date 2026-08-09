// Tutorial content module loader: enables lazy loading of tutorial content
// This reduces initial bundle size by only loading content when needed

export type TutorialCategory =
  | 'web'
  | 'mobile'
  | 'data'
  | 'backend'
  | 'devops'
  | 'game'
  | 'security'
  | 'blockchain'

export interface TutorialModule {
  category: TutorialCategory
  languages: string[]
  load: () => Promise<typeof import('../comprehensiveTutorialContent')>
}

// Lazy load the tutorial content
const tutorialLoader = () => import('../comprehensiveTutorialContent')

// Map of language IDs to their categories for efficient lookup
export const LANGUAGE_CATEGORIES: Record<string, TutorialCategory> = {
  // Web Development
  'html': 'web',
  'css': 'web',
  'javascript': 'web',
  'typescript': 'web',
  'react': 'web',
  'nextjs': 'web',
  'vue': 'web',
  'angular': 'web',

  // Mobile Development
  'react-native': 'mobile',
  'flutter': 'mobile',
  'swift': 'mobile',
  'kotlin': 'mobile',

  // Data Science
  'python': 'data',
  'r': 'data',
  'julia': 'data',
  'pandas': 'data',

  // Backend
  'nodejs': 'backend',
  'python-backend': 'backend',
  'java': 'backend',
  'go': 'backend',
  'rust': 'backend',
  'php': 'backend',
  'ruby': 'backend',
  'csharp': 'backend',

  // DevOps
  'docker': 'devops',
  'kubernetes': 'devops',
  'terraform': 'devops',
  'aws': 'devops',
  'github-actions': 'devops',

  // Game Development
  'unity': 'game',
  'unreal': 'game',
  'godot': 'game',

  // Security
  'penetration-testing': 'security',
  'network-security': 'security',
  'cryptography': 'security',

  // Blockchain
  'solidity': 'blockchain',
  'web3': 'blockchain',
  'ethereum': 'blockchain',
}

// Cache for loaded tutorial content
let cachedTutorialModule: typeof import('../comprehensiveTutorialContent') | null = null

/**
 * Get tutorial content for a specific language
 * Uses lazy loading to reduce initial bundle size
 */
export async function getTutorialContent(
  languageId: string,
  languageName: string,
  icon: string,
  description: string
) {
  if (!cachedTutorialModule) {
    cachedTutorialModule = await tutorialLoader()
  }

  return cachedTutorialModule.generateComprehensiveTutorial(
    languageId,
    languageName,
    icon,
    description
  )
}

/**
 * Preload tutorial content for faster access
 * Call this when user is likely to access tutorials soon
 */
export async function preloadTutorials(): Promise<void> {
  if (!cachedTutorialModule) {
    cachedTutorialModule = await tutorialLoader()
  }
}

/**
 * Get the category for a language
 */
export function getLanguageCategory(languageId: string): TutorialCategory {
  return LANGUAGE_CATEGORIES[languageId] || 'web'
}
