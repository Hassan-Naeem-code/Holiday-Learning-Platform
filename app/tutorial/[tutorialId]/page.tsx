'use client'

import { use } from 'react'
import TutorialPlayer from '@/components/Tutorials/TutorialPlayer'
import { softwareDevTutorial } from '@/tutorials/softwareDev'
import { webDevTutorial } from '@/tutorials/webDevComplete'
import { mobileAppDevTutorial } from '@/tutorials/mobileAppDev'
import { aiMachineLearningTutorial } from '@/tutorials/aiMachineLearning'
import { dataScienceTutorial } from '@/tutorials/dataScience'
import { graphicsDesignTutorial } from '@/tutorials/graphicsDesign'
import { contentCreationTutorial } from '@/tutorials/contentCreation'
import { notFound } from 'next/navigation'

const TUTORIALS: { [key: string]: any } = {
  'software-dev-tutorial': softwareDevTutorial,
  'web-dev-tutorial': webDevTutorial,
  'mobile-app-tutorial': mobileAppDevTutorial,
  'ai-ml-tutorial': aiMachineLearningTutorial,
  'data-science-tutorial': dataScienceTutorial,
  'graphics-design-tutorial': graphicsDesignTutorial,
  'content-creation-tutorial': contentCreationTutorial,
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
