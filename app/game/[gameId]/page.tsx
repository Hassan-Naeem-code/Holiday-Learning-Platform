'use client'

import { use } from 'react'
import CodeBlockGame from '@/games/SoftwareDev/CodeBlockGame'
import HTMLBuilderGame from '@/games/WebDev/HTMLBuilderGame'
import UserFlowGame from '@/games/MobileApp/UserFlowGame'
import NeuralNetworkGame from '@/games/AIML/NeuralNetworkGame'
import DataPipelineGame from '@/games/DataScience/DataPipelineGame'
import DesignMatcherGame from '@/games/GraphicsDesign/DesignMatcherGame'
import ContentMixerGame from '@/games/ContentCreation/ContentMixerGame'
import { notFound } from 'next/navigation'

const GAMES: { [key: string]: any } = {
  'code-block-game': CodeBlockGame,
  'html-builder-game': HTMLBuilderGame,
  'user-flow-game': UserFlowGame,
  'neural-network-game': NeuralNetworkGame,
  'data-pipeline-game': DataPipelineGame,
  'design-matcher-game': DesignMatcherGame,
  'content-mixer-game': ContentMixerGame,
}

export default function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>
}) {
  const { gameId } = use(params)
  const GameComponent = GAMES[gameId]

  if (!GameComponent) {
    notFound()
  }

  return <GameComponent />
}
