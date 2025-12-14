'use client'

import { use } from 'react'
import CodeSimulator from '@/games/SoftwareDev/CodeSimulator'
import WebBuilderSandbox from '@/games/WebDev/WebBuilderSandbox'
import AppDesignerSandbox from '@/games/MobileApp/AppDesignerSandbox'
import AIPlaygroundSandbox from '@/games/AIML/AIPlaygroundSandbox'
import DataLabSandbox from '@/games/DataScience/DataLabSandbox'
import DesignStudioSandbox from '@/games/GraphicsDesign/DesignStudioSandbox'
import ContentPlannerSandbox from '@/games/ContentCreation/ContentPlannerSandbox'
import { notFound } from 'next/navigation'

const SANDBOXES: { [key: string]: any } = {
  'code-simulator': CodeSimulator,
  'web-builder-sandbox': WebBuilderSandbox,
  'app-designer-sandbox': AppDesignerSandbox,
  'ai-playground-sandbox': AIPlaygroundSandbox,
  'data-lab-sandbox': DataLabSandbox,
  'design-studio-sandbox': DesignStudioSandbox,
  'content-planner-sandbox': ContentPlannerSandbox,
}

export default function SandboxPage({
  params,
}: {
  params: Promise<{ sandboxId: string }>
}) {
  const { sandboxId } = use(params)
  const SandboxComponent = SANDBOXES[sandboxId]

  if (!SandboxComponent) {
    notFound()
  }

  return <SandboxComponent />
}
