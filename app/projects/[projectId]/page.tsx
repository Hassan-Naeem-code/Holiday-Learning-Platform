'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProjectById } from '@/utils/miniProjects'
import ProjectWorkspace from '@/components/Projects/ProjectWorkspace'
import { ArrowLeft } from 'lucide-react'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  const [isLoading, setIsLoading] = useState(true)

  const project = getProjectById(projectId)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="text-white text-xl">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
        <div className="text-white text-xl mb-4">Project not found</div>
        <button
          onClick={() => router.push('/projects')}
          className="flex items-center gap-2 text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>
      </div>
    )
  }

  return <ProjectWorkspace project={project} />
}
