'use client'

import { useEffect } from 'react'
import { initConsoleProtection } from '@/utils/consoleProtection'

export default function ConsoleProtectionClient() {
  useEffect(() => {
    initConsoleProtection()
  }, [])

  return null
}
