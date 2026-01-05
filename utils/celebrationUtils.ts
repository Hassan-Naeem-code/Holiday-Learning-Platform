/**
 * Celebration Utilities
 * Centralized confetti and celebration animations
 * Eliminates 17+ duplicate confetti configurations across the codebase
 */

import confetti from 'canvas-confetti'

// ==================== CONFETTI CONFIGURATIONS ====================

/**
 * Predefined confetti configurations for different celebration types
 */
export const CONFETTI_CONFIG = {
  /** Small celebration for minor achievements */
  SMALL: {
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#7C3AED', '#60A5FA', '#FCD34D'], // Brand colors
  },

  /** Medium celebration for regular achievements */
  MEDIUM: {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#7C3AED', '#60A5FA', '#FCD34D'],
  },

  /** Large celebration for major achievements */
  LARGE: {
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#7C3AED', '#60A5FA', '#FCD34D'],
  },

  /** Epic celebration for completing entire modules */
  EPIC: {
    particleCount: 300,
    spread: 120,
    origin: { y: 0.5 },
    colors: ['#7C3AED', '#60A5FA', '#FCD34D', '#10B981'],
    ticks: 200,
  },
}

// ==================== CELEBRATION TYPES ====================

export type CelebrationType = 'small' | 'medium' | 'large' | 'epic'

// ==================== CELEBRATION FUNCTIONS ====================

/**
 * Trigger a confetti celebration
 * @param type - Type of celebration (small, medium, large, epic)
 */
export function celebrate(type: CelebrationType = 'medium'): void {
  const config = CONFETTI_CONFIG[type.toUpperCase() as keyof typeof CONFETTI_CONFIG]
  confetti(config)
}

/**
 * Celebrate a correct answer in a game
 */
export function celebrateCorrectAnswer(): void {
  celebrate('small')
}

/**
 * Celebrate completing a lesson or exercise
 */
export function celebrateCompletion(): void {
  celebrate('medium')
}

/**
 * Celebrate earning a certificate or major achievement
 */
export function celebrateCertificate(): void {
  celebrate('large')
}

/**
 * Celebrate completing an entire module or major milestone
 */
export function celebrateEpicWin(): void {
  celebrate('epic')
}

/**
 * Celebrate a combo achievement with custom particle count
 * @param comboLevel - Current combo level (affects particle count)
 */
export function celebrateCombo(comboLevel: number): void {
  const particleCount = Math.min(50 + (comboLevel * 10), 150)

  confetti({
    particleCount,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#F59E0B', '#FCD34D', '#FDE68A'], // Gold colors for combo
  })
}

/**
 * Celebrate level up with ascending burst
 */
export function celebrateLevelUp(): void {
  // First burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#7C3AED', '#60A5FA'],
  })

  // Second burst slightly delayed
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FCD34D', '#F59E0B'],
    })
  }, 200)
}

/**
 * Celebrate streak milestone
 */
export function celebrateStreak(streakDays: number): void {
  const particleCount = Math.min(100 + (streakDays * 5), 200)

  confetti({
    particleCount,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#EF4444', '#F59E0B', '#FCD34D'], // Fire colors
  })
}

/**
 * Continuous confetti for epic celebrations
 * @param duration - Duration in milliseconds (default: 3000ms)
 */
export function celebrateContinuous(duration: number = 3000): void {
  const end = Date.now() + duration
  const colors = ['#7C3AED', '#60A5FA', '#FCD34D']

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}

/**
 * Custom confetti with specific configuration
 * @param config - Custom confetti configuration
 */
export function celebrateCustom(config: confetti.Options): void {
  confetti(config)
}

// ==================== CELEBRATION MESSAGES ====================

/**
 * Get a random celebration message
 */
export function getCelebrationMessage(type: 'correct' | 'complete' | 'certificate' | 'streak' | 'levelup'): string {
  const messages = {
    correct: [
      'Correct! 🎉',
      'Well done! ✨',
      'Perfect! 🌟',
      'Excellent! 🎯',
      'Amazing! 💫',
      'Brilliant! 🔥',
    ],
    complete: [
      'Congratulations! 🎊',
      'You did it! 🎉',
      'Mission accomplished! 🏆',
      'Fantastic work! ✨',
      'Outstanding! 🌟',
      'Incredible! 💪',
    ],
    certificate: [
      'Certificate earned! 📜',
      'Achievement unlocked! 🏆',
      'You\'re certified! 🎓',
      'Mastery achieved! 👑',
      'Expert level! 💎',
    ],
    streak: [
      'Streak continued! 🔥',
      'On fire! 🔥',
      'Keep it going! 🚀',
      'Unstoppable! ⚡',
      'Consistency is key! 💪',
    ],
    levelup: [
      'Level up! 📈',
      'New level unlocked! 🎯',
      'You\'re growing! 🌱',
      'Power up! ⚡',
      'Ascending! 🚀',
    ],
  }

  const options = messages[type]
  return options[Math.floor(Math.random() * options.length)]
}

// ==================== CELEBRATION PRESETS ====================

/**
 * All-in-one celebration for game completion
 */
export function celebrateGameComplete(score: number, total: number): void {
  const percentage = (score / total) * 100

  if (percentage >= 90) {
    celebrateEpicWin()
  } else if (percentage >= 75) {
    celebrateCertificate()
  } else {
    celebrateCompletion()
  }
}

/**
 * Celebrate based on achievement type
 */
export function celebrateAchievement(achievementType: 'first' | 'rare' | 'epic'): void {
  switch (achievementType) {
    case 'first':
      celebrate('small')
      break
    case 'rare':
      celebrate('large')
      break
    case 'epic':
      celebrateContinuous(3000)
      break
  }
}
