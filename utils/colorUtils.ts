/**
 * Color Utilities
 * Centralized color schemes and theme utilities
 * Eliminates duplicate color mappings across components
 */

import type { Difficulty } from './gameConstants'

// ==================== DIFFICULTY COLORS ====================

/**
 * Color mappings for difficulty levels
 * Provides consistent colors across the entire application
 */
export const DIFFICULTY_COLORS = {
  easy: {
    /** Background color class */
    bg: 'bg-green-500',

    /** Text color class */
    text: 'text-green-400',

    /** Border color class */
    border: 'border-green-400',

    /** Gradient class */
    gradient: 'from-green-500 to-emerald-600',

    /** Full gradient class */
    gradientFull: 'bg-gradient-to-r from-green-500 to-emerald-600',

    /** Hex color */
    hex: '#10B981',

    /** RGB color */
    rgb: 'rgb(16, 185, 129)',

    /** Hover gradient */
    hoverGradient: 'hover:from-green-600 hover:to-emerald-700',
  },

  medium: {
    bg: 'bg-yellow-500',
    text: 'text-orange-400',
    border: 'border-orange-400',
    gradient: 'from-yellow-500 to-orange-600',
    gradientFull: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    hex: '#F59E0B',
    rgb: 'rgb(245, 158, 11)',
    hoverGradient: 'hover:from-yellow-600 hover:to-orange-700',
  },

  hard: {
    bg: 'bg-red-500',
    text: 'text-red-400',
    border: 'border-red-400',
    gradient: 'from-red-500 to-pink-600',
    gradientFull: 'bg-gradient-to-r from-red-500 to-pink-600',
    hex: '#EF4444',
    rgb: 'rgb(239, 68, 68)',
    hoverGradient: 'hover:from-red-600 hover:to-pink-700',
  },
} as const

/**
 * Get difficulty color for a specific property
 */
export function getDifficultyColor(
  difficulty: Difficulty,
  type: 'bg' | 'text' | 'border' | 'gradient' | 'gradientFull' | 'hex' | 'rgb' | 'hoverGradient'
): string {
  return DIFFICULTY_COLORS[difficulty][type]
}

/**
 * Get all colors for a difficulty level
 */
export function getDifficultyColors(difficulty: Difficulty) {
  return DIFFICULTY_COLORS[difficulty]
}

// ==================== BRAND COLORS ====================

/**
 * Brand color palette (from logo)
 */
export const BRAND_COLORS = {
  purple: {
    dark: '#6B46C1',
    DEFAULT: '#7C3AED',
    light: '#A78BFA',
  },
  blue: {
    dark: '#3B82F6',
    DEFAULT: '#60A5FA',
    light: '#93C5FD',
  },
  gold: {
    dark: '#F59E0B',
    DEFAULT: '#FCD34D',
    light: '#FDE68A',
  },
} as const

/**
 * Tree colors for learning tree component
 */
export const TREE_COLORS = {
  green: {
    dark: '#059669',
    DEFAULT: '#10B981',
    light: '#6EE7B7',
  },
  brown: {
    dark: '#78350F',
    DEFAULT: '#92400E',
    light: '#B45309',
  },
} as const

// ==================== STATUS COLORS ====================

/**
 * Status colors for various states
 */
export const STATUS_COLORS = {
  success: {
    bg: 'bg-green-500',
    text: 'text-green-400',
    border: 'border-green-400',
    gradient: 'from-green-500 to-emerald-600',
  },
  error: {
    bg: 'bg-red-500',
    text: 'text-red-400',
    border: 'border-red-400',
    gradient: 'from-red-500 to-rose-600',
  },
  warning: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-400',
    border: 'border-yellow-400',
    gradient: 'from-yellow-500 to-orange-600',
  },
  info: {
    bg: 'bg-blue-500',
    text: 'text-blue-400',
    border: 'border-blue-400',
    gradient: 'from-blue-500 to-indigo-600',
  },
} as const

/**
 * Get status color for a specific property
 */
export function getStatusColor(
  status: 'success' | 'error' | 'warning' | 'info',
  type: 'bg' | 'text' | 'border' | 'gradient'
): string {
  return STATUS_COLORS[status][type]
}

// ==================== MODULE COLORS ====================

/**
 * Color schemes for technology modules
 */
export const MODULE_COLORS = {
  'web-development': {
    color: '#10B981',
    gradient: 'from-green-500 to-emerald-700',
    icon: '🌐',
  },
  'mobile-development': {
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-purple-700',
    icon: '📱',
  },
  'data-science': {
    color: '#3B82F6',
    gradient: 'from-blue-500 to-blue-700',
    icon: '📊',
  },
  'ai-ml': {
    color: '#EC4899',
    gradient: 'from-pink-500 to-rose-700',
    icon: '🤖',
  },
  'game-development': {
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-700',
    icon: '🎮',
  },
  'backend-development': {
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-700',
    icon: '🔧',
  },
  'devops': {
    color: '#6366F1',
    gradient: 'from-indigo-500 to-violet-700',
    icon: '☁️',
  },
  'cybersecurity': {
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-700',
    icon: '🛡️',
  },
  'blockchain': {
    color: '#F97316',
    gradient: 'from-orange-500 to-amber-700',
    icon: '⛓️',
  },
  'database': {
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-700',
    icon: '💾',
  },
} as const

/**
 * Get module color scheme
 */
export function getModuleColor(moduleId: string) {
  return MODULE_COLORS[moduleId as keyof typeof MODULE_COLORS] || {
    color: '#7C3AED',
    gradient: 'from-purple-500 to-purple-700',
    icon: '💻',
  }
}

// ==================== LEARNING GOAL COLORS ====================

/**
 * Colors for different learning goals
 */
export const GOAL_COLORS = {
  career: {
    gradient: 'from-purple-600 to-blue-600',
    icon: '💼',
    accent: '#7C3AED',
  },
  hobby: {
    gradient: 'from-pink-500 to-orange-500',
    icon: '🎨',
    accent: '#EC4899',
  },
  school: {
    gradient: 'from-blue-500 to-indigo-600',
    icon: '🎓',
    accent: '#3B82F6',
  },
} as const

/**
 * Get goal color scheme
 */
export function getGoalColor(goal: 'career' | 'hobby' | 'school') {
  return GOAL_COLORS[goal]
}

// ==================== TREE STAGE COLORS ====================

/**
 * Colors for different tree growth stages
 */
export const TREE_STAGE_COLORS = {
  seedling: {
    trunk: '#92400E',
    leaves: '#6EE7B7',
    glow: '#10B981',
  },
  sapling: {
    trunk: '#92400E',
    leaves: '#10B981',
    glow: '#059669',
  },
  growing: {
    trunk: '#78350F',
    leaves: '#10B981',
    glow: '#059669',
  },
  mature: {
    trunk: '#78350F',
    leaves: '#059669',
    glow: '#047857',
  },
  flourishing: {
    trunk: '#78350F',
    leaves: '#059669',
    glow: '#FCD34D',
  },
} as const

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get contrast color (white or black) based on background
 */
export function getContrastColor(hexColor: string): '#FFFFFF' | '#000000' {
  // Remove # if present
  const hex = hexColor.replace('#', '')

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

/**
 * Convert hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Get button classes based on completion state
 */
export function getButtonClasses(
  isCompleted: boolean,
  colorGradient: string = 'from-blue-500 to-blue-600'
): string {
  if (isCompleted) {
    return 'bg-gray-300 cursor-not-allowed opacity-60 text-gray-600'
  }
  return `bg-gradient-to-r ${colorGradient} text-white hover:shadow-lg hover:scale-105 transition-all`
}

/**
 * Get card hover effect classes
 */
export function getCardHoverClasses(isClickable: boolean = true): string {
  if (!isClickable) {
    return 'opacity-70'
  }
  return 'hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer'
}

/**
 * Get progress bar color based on percentage
 */
export function getProgressBarColor(percentage: number): string {
  if (percentage >= 75) return 'bg-green-500'
  if (percentage >= 50) return 'bg-yellow-500'
  if (percentage >= 25) return 'bg-orange-500'
  return 'bg-red-500'
}

/**
 * Get XP badge color based on amount
 */
export function getXPBadgeColor(xp: number): string {
  if (xp >= 500) return 'from-purple-500 to-pink-500'
  if (xp >= 300) return 'from-blue-500 to-indigo-500'
  if (xp >= 100) return 'from-green-500 to-emerald-500'
  if (xp >= 50) return 'from-yellow-500 to-orange-500'
  return 'from-gray-400 to-gray-500'
}
