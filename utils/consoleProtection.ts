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
  if (typeof window === 'undefined') return

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
  })
}

export const blockKeyboardShortcuts = () => {
  if (typeof window === 'undefined') return

  document.addEventListener('keydown', (e) => {
    // Block F12
    if (e.key === 'F12') {
      e.preventDefault()
      return false
    }

    // Block Ctrl+Shift+I (Windows/Linux)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault()
      return false
    }

    // Block Cmd+Option+I (Mac)
    if (e.metaKey && e.altKey && e.key === 'i') {
      e.preventDefault()
      return false
    }

    // Block Ctrl+Shift+J (Console - Windows/Linux)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault()
      return false
    }

    // Block Cmd+Option+J (Console - Mac)
    if (e.metaKey && e.altKey && e.key === 'j') {
      e.preventDefault()
      return false
    }

    // Block Ctrl+U (View source - Windows/Linux)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault()
      return false
    }

    // Block Cmd+U (View source - Mac)
    if (e.metaKey && e.key === 'u') {
      e.preventDefault()
      return false
    }

    // Block Ctrl+Shift+C (Inspect element - Windows/Linux)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault()
      return false
    }

    // Block Cmd+Option+C (Inspect element - Mac)
    if (e.metaKey && e.altKey && e.key === 'c') {
      e.preventDefault()
      return false
    }
  })
}

export const detectDevTools = () => {
  if (typeof window === 'undefined') return

  const devtoolsDetector = () => {
    const threshold = 160
    const widthThreshold = window.outerWidth - window.innerWidth > threshold
    const heightThreshold = window.outerHeight - window.innerHeight > threshold

    if (widthThreshold || heightThreshold) {
      // DevTools likely open - redirect or take action
      document.body.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          padding: 20px;
        ">
          <div>
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">⚠️ Access Restricted</h1>
            <p style="font-size: 1.2rem; opacity: 0.9;">Developer tools are disabled for security reasons.</p>
            <p style="font-size: 1rem; opacity: 0.7; margin-top: 1rem;">Please close DevTools and refresh the page.</p>
          </div>
        </div>
      `
    }
  }

  // Check periodically
  setInterval(devtoolsDetector, 1000)

  // Alternative detection using toString trick
  const element = new Image()
  Object.defineProperty(element, 'id', {
    get: function () {
      // DevTools opened
      document.body.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          padding: 20px;
        ">
          <div>
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">⚠️ Access Restricted</h1>
            <p style="font-size: 1.2rem; opacity: 0.9;">Developer tools are disabled for security reasons.</p>
            <p style="font-size: 1rem; opacity: 0.7; margin-top: 1rem;">Please close DevTools and refresh the page.</p>
          </div>
        </div>
      `
      throw new Error('DevTools detected')
    },
  })

  // Trigger the getter
  setInterval(() => {
    console.log(element)
  }, 1000)
}

export const clearConsoleLoop = () => {
  if (typeof window === 'undefined') return

  setInterval(() => {
    try {
      console.clear()
    } catch (e) {
      // Silent fail
    }
  }, 100)
}

// Initialize all protections
export const initConsoleProtection = () => {
  if (typeof window === 'undefined') return
  
  // Only enable in production
  if (process.env.NODE_ENV === 'production') {
    disableConsole()
    blockContextMenu()
    blockKeyboardShortcuts()
    detectDevTools()
    clearConsoleLoop()
  }
}
