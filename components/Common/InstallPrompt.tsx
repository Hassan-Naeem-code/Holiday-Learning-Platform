'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show the install button
      setShowPrompt(true)
      // console.log('PWA install prompt event fired')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Check if app is already installed
    window.addEventListener('appinstalled', () => {
      // console.log('PWA was installed')
      setShowPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', () => {})
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // console.log('Install prompt not available')
      return
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      // console.log(`User response to the install prompt: ${outcome}`)

      // We've used the prompt, and can't use it again
      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during PWA installation:', error)
    }
  }

  if (!showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg mb-1">Install CodeLikeBasics</h3>
          <p className="text-sm text-gray-100">
            Add to your home screen for instant access and offline support!
          </p>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="flex-shrink-0 text-gray-200 hover:text-white text-xl"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleInstallClick}
          className="flex-1 bg-white text-purple-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition-colors"
        >
          Install
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="flex-1 bg-purple-700 text-white font-semibold py-2 px-4 rounded hover:bg-purple-800 transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  )
}
