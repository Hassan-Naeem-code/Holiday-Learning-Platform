'use client'

import { use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getLanguageByModuleAndId } from '@/utils/techModules'
import UniversalGame from '@/components/Games/UniversalGame'

export default function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { gameId } = use(params)

  // Get difficulty from URL parameter
  const difficulty = (searchParams.get('difficulty') as 'easy' | 'medium' | 'hard') || 'easy'

  // Parse moduleId-languageId format
  const knownModules = [
    'web-development',
    'mobile-development',
    'data-science',
    'ai-ml',
    'game-development',
    'backend-development',
    'devops',
    'cybersecurity',
    'blockchain',
    'database',
  ]

  let moduleId: string | null = null
  let languageId: string | null = null

  // Find which module this route starts with
  for (const knownModule of knownModules) {
    if (gameId.startsWith(knownModule + '-')) {
      moduleId = knownModule
      languageId = gameId.substring(knownModule.length + 1)
      break
    }
  }

  if (!moduleId || !languageId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
          <p className="text-xl mb-6">Invalid route format: {gameId}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const language = getLanguageByModuleAndId(moduleId, languageId)

  if (!language) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
          <p className="text-xl mb-6">
            Could not find game for {gameId}
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <UniversalGame
      language={language}
      moduleId={moduleId}
      languageId={languageId}
      difficulty={difficulty}
    />
  )
}
