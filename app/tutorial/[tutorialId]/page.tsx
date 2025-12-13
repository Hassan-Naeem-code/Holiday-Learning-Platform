'use client'

import { use } from 'react'
import TutorialPlayer from '@/components/Tutorials/TutorialPlayer'
import { softwareDevTutorial } from '@/tutorials/softwareDev'
import { webDevTutorial } from '@/tutorials/webDevComplete'
import { notFound } from 'next/navigation'

const TUTORIALS: { [key: string]: any } = {
  'software-dev-tutorial': softwareDevTutorial,
  'web-dev-tutorial': webDevTutorial,
  // More tutorials will be added
}

export default function TutorialPage({
  params,
}: {
  params: Promise<{ tutorialId: string }>
}) {
  const { tutorialId } = use(params)
  const tutorial = TUTORIALS[tutorialId]

  if (!tutorial) {
    notFound()
  }

  return <TutorialPlayer {...tutorial} tutorialId={tutorialId} />
}
