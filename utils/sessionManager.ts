/**
 * Session Manager
 * Provides secure session handling with validation and integrity checks
 */

const SESSION_KEY = 'userSession'
const SESSION_TIMESTAMP_KEY = 'sessionTimestamp'
const SESSION_VALIDITY_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface SessionData {
  userCode: string
  createdAt: number
  lastActive: number
  checksum: string
}

/**
 * Generate a checksum for session data
 */
function generateChecksum(userCode: string, timestamp: number): string {
  const data = `${userCode}${timestamp}${process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''}`
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(36)
}

/**
 * Validate user code format
 */
function isValidUserCode(code: string): boolean {
  // User codes must be in format: XXXX-XXXX (uppercase alphanumeric with hyphen)
  return /^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)
}

/**
 * Create a new session
 */
export function createSession(userCode: string): boolean {
  try {
    if (!isValidUserCode(userCode)) {
      console.error('Invalid user code format')
      return false
    }

    const now = Date.now()
    const checksum = generateChecksum(userCode, now)

    const sessionData: SessionData = {
      userCode,
      createdAt: now,
      lastActive: now,
      checksum,
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
    localStorage.setItem(SESSION_TIMESTAMP_KEY, now.toString())

    // Dispatch custom event for same-tab listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('session-changed', { detail: { authenticated: true } }))
    }

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

/**
 * Get current session
 * Returns null if session is invalid, expired, or tampered with
 */
export function getSession(): string | null {
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY)
    const timestampStr = localStorage.getItem(SESSION_TIMESTAMP_KEY)

    if (!sessionStr || !timestampStr) {
      return null
    }

    const session: SessionData = JSON.parse(sessionStr)
    const timestamp = parseInt(timestampStr)

    // Validate user code format
    if (!isValidUserCode(session.userCode)) {
      console.warn('Session has invalid user code format')
      clearSession()
      return null
    }

    // Check if session is expired
    const now = Date.now()
    if (now - timestamp > SESSION_VALIDITY_MS) {
      console.warn('Session expired')
      clearSession()
      return null
    }

    // Verify checksum (integrity check)
    const expectedChecksum = generateChecksum(session.userCode, session.createdAt)
    if (session.checksum !== expectedChecksum) {
      console.warn('Session integrity check failed: possible tampering')
      clearSession()
      return null
    }

    // Update last active timestamp
    session.lastActive = now
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))

    return session.userCode
  } catch (error) {
    console.error('Error reading session:', error)
    clearSession()
    return null
  }
}

/**
 * Update session activity
 */
export function updateSessionActivity(): void {
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY)
    if (!sessionStr) return

    const session: SessionData = JSON.parse(sessionStr)
    session.lastActive = Date.now()
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch (error) {
    console.error('Error updating session activity:', error)
  }
}

/**
 * Clear session
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(SESSION_TIMESTAMP_KEY)
    localStorage.removeItem('userCode') // Remove old unsecure key if exists

    // Dispatch custom event for same-tab listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('session-changed', { detail: { authenticated: false } }))
    }
  } catch (error) {
    console.error('Error clearing session:', error)
  }
}

/**
 * Validate session and return user code
 * Redirects to home if session is invalid
 */
export function validateSession(redirectToHome: () => void): string | null {
  const userCode = getSession()

  if (!userCode) {
    clearSession()
    redirectToHome()
    return null
  }

  return userCode
}

/**
 * Migrate old localStorage 'userCode' to new secure session format
 */
export function migrateOldSession(): boolean {
  try {
    // Check if already using new format
    if (localStorage.getItem(SESSION_KEY)) {
      return true
    }

    // Check for old format
    const oldUserCode = localStorage.getItem('userCode')
    if (oldUserCode && isValidUserCode(oldUserCode)) {
      // console.log('Migrating old session to new format')
      createSession(oldUserCode)
      localStorage.removeItem('userCode') // Remove old key
      return true
    }

    return false
  } catch (error) {
    console.error('Error migrating session:', error)
    return false
  }
}

/**
 * Check if user has an active session
 */
export function hasActiveSession(): boolean {
  return getSession() !== null
}

/**
 * Get remaining session time in milliseconds
 * Returns 0 if session is expired or invalid
 */
export function getSessionRemainingTime(): number {
  try {
    const timestampStr = localStorage.getItem(SESSION_TIMESTAMP_KEY)
    if (!timestampStr) return 0

    const timestamp = parseInt(timestampStr)
    const now = Date.now()
    const elapsed = now - timestamp
    const remaining = SESSION_VALIDITY_MS - elapsed

    return remaining > 0 ? remaining : 0
  } catch {
    return 0
  }
}

/**
 * Check if session is about to expire (within warning threshold)
 * @param warningThresholdMs: Time before expiration to start warning (default: 5 minutes)
 */
export function isSessionExpiringSoon(warningThresholdMs: number = 5 * 60 * 1000): boolean {
  const remaining = getSessionRemainingTime()
  return remaining > 0 && remaining <= warningThresholdMs
}

/**
 * Extend session by updating the timestamp
 * This effectively gives the user another 24 hours
 */
export function extendSession(): boolean {
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY)
    if (!sessionStr) return false

    const session: SessionData = JSON.parse(sessionStr)

    // Validate session first
    if (!isValidUserCode(session.userCode)) return false

    const now = Date.now()
    const newChecksum = generateChecksum(session.userCode, session.createdAt)

    // Verify integrity
    if (session.checksum !== newChecksum) return false

    // Update timestamps
    session.lastActive = now
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    localStorage.setItem(SESSION_TIMESTAMP_KEY, now.toString())

    return true
  } catch {
    return false
  }
}

// Session expiration warning callback type
export type SessionExpirationCallback = (remainingMs: number) => void

// Store for expiration watchers
let expirationWatcher: NodeJS.Timeout | null = null
let expirationCallbacks: SessionExpirationCallback[] = []

/**
 * Start watching for session expiration
 * Calls registered callbacks when session is about to expire
 */
export function startSessionExpirationWatcher(
  checkIntervalMs: number = 60 * 1000, // Check every minute
  warningThresholdMs: number = 5 * 60 * 1000 // Warn 5 minutes before expiration
): void {
  // Clear existing watcher
  stopSessionExpirationWatcher()

  expirationWatcher = setInterval(() => {
    const remaining = getSessionRemainingTime()

    if (remaining === 0) {
      // Session expired
      expirationCallbacks.forEach(cb => cb(0))
      stopSessionExpirationWatcher()
    } else if (remaining <= warningThresholdMs) {
      // Session expiring soon
      expirationCallbacks.forEach(cb => cb(remaining))
    }
  }, checkIntervalMs)
}

/**
 * Stop watching for session expiration
 */
export function stopSessionExpirationWatcher(): void {
  if (expirationWatcher) {
    clearInterval(expirationWatcher)
    expirationWatcher = null
  }
}

/**
 * Register a callback for session expiration warnings
 */
export function onSessionExpiring(callback: SessionExpirationCallback): () => void {
  expirationCallbacks.push(callback)

  // Return cleanup function
  return () => {
    expirationCallbacks = expirationCallbacks.filter(cb => cb !== callback)
  }
}
