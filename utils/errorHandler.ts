/**
 * Error Handler Utilities
 * Centralized error handling for async operations
 * Provides consistent error handling, user feedback, and recovery mechanisms
 */

// ==================== ERROR TYPES ====================

/**
 * Custom error types for better error categorization
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

// ==================== ERROR HANDLER OPTIONS ====================

export interface ErrorHandlerOptions {
  /** Custom error message to show user */
  userMessage?: string

  /** Whether to log error to console */
  logError?: boolean

  /** Callback to execute on error */
  onError?: (error: Error) => void

  /** Callback to execute on success */
  onSuccess?: () => void

  /** Number of retry attempts (default: 0) */
  retryAttempts?: number

  /** Delay between retries in ms (default: 1000) */
  retryDelay?: number

  /** Whether to show user notification on error */
  showNotification?: boolean

  /** Fallback value to return on error */
  fallbackValue?: any
}

// ==================== ASYNC ERROR WRAPPER ====================

/**
 * Wraps an async function with comprehensive error handling
 * @param asyncFn - The async function to execute
 * @param options - Error handling options
 * @returns Promise with result or null on error
 *
 * @example
 * const data = await withErrorHandling(
 *   () => fetchUserData(userId),
 *   {
 *     userMessage: 'Failed to load user data',
 *     retryAttempts: 3,
 *     fallbackValue: null
 *   }
 * )
 */
export async function withErrorHandling<T>(
  asyncFn: () => Promise<T>,
  options: ErrorHandlerOptions = {}
): Promise<T | null> {
  const {
    userMessage,
    logError = true,
    onError,
    onSuccess,
    retryAttempts = 0,
    retryDelay = 1000,
    showNotification = false,
    fallbackValue = null,
  } = options

  let lastError: Error | null = null

  // Attempt execution with retries
  for (let attempt = 0; attempt <= retryAttempts; attempt++) {
    try {
      const result = await asyncFn()
      onSuccess?.()
      return result
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // Log error if enabled
      if (logError) {
        console.error(`[Attempt ${attempt + 1}/${retryAttempts + 1}] Error:`, lastError)
      }

      // If not the last attempt, wait before retrying
      if (attempt < retryAttempts) {
        await delay(retryDelay)
        continue
      }
    }
  }

  // All attempts failed
  const finalMessage = userMessage || lastError?.message || 'An unexpected error occurred'

  if (logError && lastError) {
    console.error('Final error after all retries:', lastError)
  }

  // Execute error callback
  if (onError && lastError) {
    onError(lastError)
  }

  // Show user notification if enabled
  if (showNotification) {
    // This could be integrated with a toast notification system
    console.warn('User notification:', finalMessage)
  }

  return fallbackValue
}

/**
 * Delay helper for retry logic
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ==================== FIREBASE ERROR HANDLING ====================

/**
 * Wraps Firebase operations with error handling
 */
export async function withFirebaseErrorHandling<T>(
  firebaseFn: () => Promise<T>,
  operation: string,
  options: Omit<ErrorHandlerOptions, 'userMessage'> = {}
): Promise<T | null> {
  return withErrorHandling(firebaseFn, {
    ...options,
    userMessage: `Failed to ${operation}. Please check your connection and try again.`,
    logError: true,
    retryAttempts: options.retryAttempts ?? 2, // Default 2 retries for Firebase
    retryDelay: options.retryDelay ?? 1000,
  })
}

// ==================== SPECIFIC ERROR HANDLERS ====================

/**
 * Handle user profile loading errors
 */
export async function loadUserProfileSafely(
  loadFn: () => Promise<any>
): Promise<any | null> {
  return withFirebaseErrorHandling(
    loadFn,
    'load user profile',
    {
      fallbackValue: null,
      onError: (error) => {
        console.error('Failed to load user profile:', error)
        // Could redirect to login page or show error modal
      },
    }
  )
}

/**
 * Handle game progress saving errors
 */
export async function saveGameProgressSafely(
  saveFn: () => Promise<void>
): Promise<boolean> {
  const result = await withFirebaseErrorHandling(
    saveFn,
    'save game progress',
    {
      fallbackValue: false,
      retryAttempts: 3, // More retries for save operations
      onError: (error) => {
        console.error('Failed to save game progress:', error)
        // Could show "Progress not saved" notification
      },
    }
  )

  return result !== null
}

/**
 * Handle XP updates with optimistic UI
 */
export async function updateXPSafely(
  updateFn: () => Promise<void>,
  rollbackFn: () => void
): Promise<boolean> {
  const result = await withFirebaseErrorHandling(
    updateFn,
    'update XP',
    {
      fallbackValue: false,
      retryAttempts: 2,
      onError: (error) => {
        console.error('Failed to update XP, rolling back:', error)
        rollbackFn() // Rollback optimistic update
      },
    }
  )

  return result !== null
}

// ==================== ERROR RECOVERY ====================

/**
 * Check if error is a network error
 */
export function isNetworkError(error: Error): boolean {
  return (
    error instanceof NetworkError ||
    error.message.includes('network') ||
    error.message.includes('fetch') ||
    error.message.includes('timeout')
  )
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: Error): boolean {
  return (
    error instanceof AuthenticationError ||
    error.message.includes('authentication') ||
    error.message.includes('unauthorized') ||
    error.message.includes('permission')
  )
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: Error): string {
  if (isNetworkError(error)) {
    return 'Network connection issue. Please check your internet and try again.'
  }

  if (isAuthError(error)) {
    return 'Authentication error. Please log in again.'
  }

  if (error instanceof ValidationError) {
    return error.message
  }

  if (error instanceof DatabaseError) {
    return 'Database error. Please try again later.'
  }

  return 'An unexpected error occurred. Please try again.'
}

// ==================== OFFLINE DETECTION ====================

/**
 * Check if user is online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true
}

/**
 * Execute function only if online
 */
export async function executeIfOnline<T>(
  fn: () => Promise<T>,
  offlineFallback?: T
): Promise<T | undefined> {
  if (!isOnline()) {
    console.warn('Operation attempted while offline')
    return offlineFallback
  }

  return fn()
}

/**
 * Wait for online connection
 */
export function waitForOnline(timeout: number = 30000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isOnline()) {
      resolve(true)
      return
    }

    const checkInterval = setInterval(() => {
      if (isOnline()) {
        clearInterval(checkInterval)
        clearTimeout(timeoutHandle)
        resolve(true)
      }
    }, 1000)

    const timeoutHandle = setTimeout(() => {
      clearInterval(checkInterval)
      resolve(false)
    }, timeout)
  })
}

// ==================== ERROR LOGGING ====================

/**
 * Log error with context
 */
export function logErrorWithContext(
  error: Error,
  context: Record<string, any>
): void {
  console.error('Error occurred:', {
    message: error.message,
    name: error.name,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  })

  // In production, this would send to error tracking service (e.g., Sentry)
}

/**
 * Create error boundary handler
 */
export function createErrorBoundaryHandler(componentName: string) {
  return (error: Error, errorInfo: React.ErrorInfo) => {
    logErrorWithContext(error, {
      component: componentName,
      componentStack: errorInfo.componentStack,
    })
  }
}

// ==================== TYPE GUARDS ====================

/**
 * Type guard for Error objects
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error
}

/**
 * Type guard for Error with specific message pattern
 */
export function hasErrorMessage(error: unknown, pattern: string): boolean {
  return isError(error) && error.message.includes(pattern)
}

// ==================== PROMISE UTILITIES ====================

/**
 * Execute promises with timeout
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string = 'Operation timed out'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
  })

  return Promise.race([promise, timeoutPromise])
}

/**
 * Execute multiple promises and handle individual failures
 */
export async function executeAllSafely<T>(
  promises: Promise<T>[],
  options: ErrorHandlerOptions = {}
): Promise<Array<T | null>> {
  return Promise.all(
    promises.map((promise) =>
      withErrorHandling(() => promise, options)
    )
  )
}
