// Exercise content module loader: enables lazy loading of exercise content
// This reduces initial bundle size by only loading content when needed

// Cache for loaded exercise module
let cachedExerciseModule: typeof import('../sandboxExercises') | null = null

// Lazy load the exercise content
const exerciseLoader = () => import('../sandboxExercises')

/**
 * Get sandbox exercises for a specific language
 * Uses lazy loading to reduce initial bundle size
 */
export async function getSandboxExercises(
  languageId: string,
  languageName: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'easy'
) {
  if (!cachedExerciseModule) {
    cachedExerciseModule = await exerciseLoader()
  }

  return cachedExerciseModule.generateSandboxExercises(
    languageId,
    languageName,
    difficulty
  )
}

/**
 * Preload exercise content for faster access
 * Call this when user is likely to access exercises soon
 */
export async function preloadExercises(): Promise<void> {
  if (!cachedExerciseModule) {
    cachedExerciseModule = await exerciseLoader()
  }
}

// Re-export types for convenience
export type { SandboxExercise, SandboxExerciseSet } from '../sandboxExercises'
