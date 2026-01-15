// Security utilities for input validation and sanitization

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
