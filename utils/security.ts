// Security utilities for input validation, sanitization, and anti-cheat

import DOMPurify from 'isomorphic-dompurify'

// Input Validation
export const validateInput = {
  // Validate string length
  string: (input: string, minLength: number = 0, maxLength: number = 1000): boolean => {
    if (typeof input !== 'string') return false
    return input.length >= minLength && input.length <= maxLength
  },

  // Validate number range
  number: (input: number, min: number = 0, max: number = Number.MAX_SAFE_INTEGER): boolean => {
    if (typeof input !== 'number' || isNaN(input)) return false
    return input >= min && input <= max
  },

  // Validate against XSS patterns
  noXSS: (input: string): boolean => {
    const xssPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
    ]
    return !xssPatterns.some(pattern => pattern.test(input))
  },

  // Validate object structure
  object: (input: any, allowedKeys: string[]): boolean => {
    if (typeof input !== 'object' || input === null) return false
    const keys = Object.keys(input)
    return keys.every(key => allowedKeys.includes(key))
  },
}

// Sanitization
export const sanitize = {
  // Sanitize HTML using DOMPurify
  html: (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
      ALLOWED_ATTR: [],
    })
  },

  // Sanitize string (remove special characters)
  string: (input: string): string => {
    return input.replace(/[<>\"']/g, '')
  },

  // Sanitize number
  number: (input: any): number => {
    const num = Number(input)
    return isNaN(num) ? 0 : num
  },
}

// localStorage Integrity Check
export const storageIntegrity = {
  // Generate checksum for data
  generateChecksum: (data: any): string => {
    const str = JSON.stringify(data)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return hash.toString(36)
  },

  // Verify data hasn't been tampered with
  verify: (data: any, storedChecksum: string): boolean => {
    const currentChecksum = storageIntegrity.generateChecksum(data)
    return currentChecksum === storedChecksum
  },

  // Validate score ranges
  validateScore: (score: number, gameId: string): boolean => {
    const maxScores: { [key: string]: number } = {
      'code-block-game': 1000,
      'html-builder-game': 1000,
      // Add more games
    }

    const maxScore = maxScores[gameId] || 1000
    return score >= 0 && score <= maxScore
  },

  // Validate XP is reasonable
  validateXP: (xp: number): boolean => {
    // Max 10000 XP (should take significant time to earn)
    return xp >= 0 && xp <= 10000
  },

  // Validate achievement IDs
  validateAchievements: (achievements: string[]): boolean => {
    const validAchievements = [
      'first-steps', 'game-master', 'scholar', 'speed-demon',
      'perfect-score', 'experimenter', 'completionist', 'legend',
      'speedrunner', 'thinker', 'streak-master', 'triple-threat'
    ]

    return achievements.every(id => validAchievements.includes(id))
  },
}

// Rate Limiting
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map()

  check(key: string, maxAttempts: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now()
    const record = this.attempts.get(key)

    if (!record || now > record.resetTime) {
      // New window
      this.attempts.set(key, {
        count: 1,
        resetTime: now + windowMs,
      })
      return true
    }

    if (record.count >= maxAttempts) {
      return false // Rate limit exceeded
    }

    record.count++
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

export const rateLimiter = new RateLimiter()

// Anti-Cheat Mechanisms
export const antiCheat = {
  // Detect suspicious activity patterns
  detectSuspiciousActivity: (gameScores: any): boolean => {
    // Check for impossibly high scores in short time
    const scores = Object.values(gameScores).flat()
    // @ts-ignore
    const perfectScores = scores.filter((s: any) => s?.accuracy === 100)

    // Suspicious if more than 5 perfect scores
    if (perfectScores.length > 5) {
      console.warn('Suspicious: Too many perfect scores')
      return true
    }

    return false
  },

  // Validate timing (prevent instant completions)
  validateTiming: (startTime: number, endTime: number, minExpectedTime: number = 1000): boolean => {
    const elapsed = endTime - startTime
    if (elapsed < minExpectedTime) {
      console.warn('Suspicious: Completed too quickly')
      return false
    }
    return true
  },

  // Detect localStorage manipulation
  detectTampering: (): boolean => {
    try {
      const keys = Object.keys(localStorage)
      const suspiciousKeys = keys.filter(key =>
        !key.startsWith('holiday_learning_') &&
        !key.includes('react') &&
        !key.includes('next')
      )

      // Check for unusual data sizes
      let totalSize = 0
      keys.forEach(key => {
        const item = localStorage.getItem(key) || ''
        totalSize += item.length
      })

      // Suspicious if localStorage > 5MB for this app
      if (totalSize > 5 * 1024 * 1024) {
        console.warn('Suspicious: localStorage size too large')
        return true
      }

      return false
    } catch {
      return false
    }
  },
}

// Content Security Policy headers (for Next.js config)
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}
