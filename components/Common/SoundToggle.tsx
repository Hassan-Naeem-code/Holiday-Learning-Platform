'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { soundManager } from '@/utils/soundManager'

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    setEnabled(soundManager.isEnabled())
  }, [])

  const toggleSound = () => {
    const newState = !enabled
    setEnabled(newState)
    soundManager.setEnabled(newState)

    // Play test sound if enabling
    if (newState) {
      soundManager.playClick()
    }
  }

  return (
    <motion.button
      onClick={toggleSound}
      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={enabled ? 'Mute sounds' : 'Enable sounds'}
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
      aria-pressed={enabled}
    >
      {enabled ? (
        <Volume2 className="w-5 h-5 text-white" />
      ) : (
        <VolumeX className="w-5 h-5 text-white/50" />
      )}
    </motion.button>
  )
}
