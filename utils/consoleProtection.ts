/**
 * Console Protection Utility
 * Disables console access and detects DevTools opening attempts
 */

export const disableConsole = () => {
  if (typeof window === 'undefined') return

  // Disable console methods
  const noop = () => {}
  const consoleProps = [
    'log',
    'debug',
    'info',
    'warn',
    'error',
    'assert',
    'dir',
    'dirxml',
    'trace',
    'group',
    'groupCollapsed',
    'groupEnd',
    'profile',
    'profileEnd',
    'count',
    'clear',
    'time',
    'timeEnd',
    'timeStamp',
    'table',
    'exception',
  ] as const

  consoleProps.forEach((prop) => {
    try {
      ;(console as any)[prop] = noop
    } catch (e) {
      // Silent fail if console is read-only
    }
  })
}

export const blockContextMenu = () => {
  // No-op: blocking context menu harms accessibility and UX
}

export const blockKeyboardShortcuts = () => {
  // No-op: blocking shortcuts causes false positives and frustrates users
}

export const detectDevTools = () => {
  if (typeof window === 'undefined') return

  // Heuristic-only, non-blocking notice in console
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  if (isMobile) return // avoid false positives on mobile

  let consecutiveDetections = 0
  const devtoolsDetector = () => {
    const threshold = 160
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold

    if (widthThreshold || heightThreshold) {
      consecutiveDetections++
      if (consecutiveDetections >= 3) {
        // eslint-disable-next-line no-console
        console.warn('Developer tools appear to be open. Be mindful of sensitive data.')
      }
    } else {
      consecutiveDetections = 0
    }
  }

  setInterval(devtoolsDetector, 1000)
}

export const clearConsoleLoop = () => {
  // No-op: clearing console repeatedly is disruptive
}

// Initialize all protections
export const initConsoleProtection = () => {
  if (typeof window === 'undefined') return
  
  // Only enable in production
  const enabledFlag = (process.env.NEXT_PUBLIC_CONSOLE_PROTECTION ?? 'false') === 'true'
  if (process.env.NODE_ENV === 'production' && enabledFlag) {
    // Minimal protections only, non-blocking
    disableConsole()
    detectDevTools()
  }
}
