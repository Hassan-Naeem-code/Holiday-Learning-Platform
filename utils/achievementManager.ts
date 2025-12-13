// Achievement Manager - Handles auto-unlocking achievements based on user actions

import { useUserStore } from '@/stores/userStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useGameStore } from '@/stores/gameStore'

export interface AchievementTrigger {
  id: string
  check: () => boolean
  message: string
}

class AchievementManager {
  private notificationCallback: ((achievement: { id: string; title: string; icon: string }) => void) | null = null

  setNotificationCallback(callback: (achievement: { id: string; title: string; icon: string }) => void) {
    this.notificationCallback = callback
  }

  checkAndUnlock(achievementId: string, title: string, icon: string) {
    const { user, unlockAchievement } = useUserStore.getState()

    if (!user.achievements.includes(achievementId)) {
      unlockAchievement(achievementId)

      // Show notification
      if (this.notificationCallback) {
        this.notificationCallback({ id: achievementId, title, icon })
      }

      return true
    }
    return false
  }

  // Check all achievements
  checkAll() {
    const achievements = this.getAllTriggers()

    achievements.forEach(achievement => {
      if (achievement.check()) {
        this.checkAndUnlock(achievement.id, achievement.message, this.getAchievementIcon(achievement.id))
      }
    })
  }

  private getAchievementIcon(id: string): string {
    const icons: { [key: string]: string } = {
      'first-steps': '🎯',
      'game-master': '🎮',
      'scholar': '📚',
      'speed-demon': '⚡',
      'perfect-score': '💯',
      'experimenter': '🔬',
      'completionist': '🏅',
      'legend': '👑',
      'speedrunner': '🏃',
      'thinker': '🧠',
      'streak-master': '🔥',
      'triple-threat': '🎭',
    }
    return icons[id] || '🏆'
  }

  private getAllTriggers(): AchievementTrigger[] {
    const { tutorialProgress, topicProgress } = useTutorialStore.getState()
    const { gameScores } = useGameStore.getState()
    const { user } = useUserStore.getState()

    return [
      // First Steps - Complete first tutorial
      {
        id: 'first-steps',
        check: () => Object.values(tutorialProgress).some(t => t.completed),
        message: 'First Steps',
      },

      // Game Master - Win any game on hard
      {
        id: 'game-master',
        check: () => {
          return Object.values(gameScores).some(game =>
            game.hard?.completed === true
          )
        },
        message: 'Game Master',
      },

      // Scholar - Complete all tutorials in one topic
      {
        id: 'scholar',
        check: () => {
          return Object.values(topicProgress).some(topic => topic.tutorial === 100)
        },
        message: 'Scholar',
      },

      // Speed Demon - Complete game in under 2 minutes (120 seconds)
      {
        id: 'speed-demon',
        check: () => {
          return Object.values(gameScores).some(game =>
            Object.values(game).some(score =>
              score && score.completed && score.timeInSeconds < 120
            )
          )
        },
        message: 'Speed Demon',
      },

      // Perfect Score - Win with 100% accuracy
      {
        id: 'perfect-score',
        check: () => {
          return Object.values(gameScores).some(game =>
            Object.values(game).some(score =>
              score && score.completed && score.accuracy === 100
            )
          )
        },
        message: 'Perfect Score',
      },

      // Completionist - Finish one entire topic all 3 ways
      {
        id: 'completionist',
        check: () => {
          return Object.values(topicProgress).some(topic =>
            topic.tutorial === 100 && topic.game === 100 && topic.sandbox === 100
          )
        },
        message: 'Completionist',
      },

      // Legend - Complete all 7 topics
      {
        id: 'legend',
        check: () => {
          const topics = Object.values(topicProgress)
          return topics.length === 7 && topics.every(topic =>
            topic.tutorial === 100 && topic.game === 100 && topic.sandbox === 100
          )
        },
        message: 'Legend',
      },

      // Speedrunner - Get time bonus in 5 games
      {
        id: 'speedrunner',
        check: () => {
          let speedBonusCount = 0
          Object.values(gameScores).forEach(game => {
            Object.values(game).forEach(score => {
              if (score && score.timeInSeconds < 180) { // Under 3 minutes
                speedBonusCount++
              }
            })
          })
          return speedBonusCount >= 5
        },
        message: 'Speedrunner',
      },

      // Thinker - Score 100% on tutorial quiz
      {
        id: 'thinker',
        check: () => {
          return Object.values(tutorialProgress).some(t => t.quizScore === 100)
        },
        message: 'Thinker',
      },

      // Streak Master - 7 day streak
      {
        id: 'streak-master',
        check: () => user.streak >= 7,
        message: 'Streak Master',
      },

      // Triple Threat - Tutorial + Game + Sandbox in one day (tracked by localStorage timestamp)
      {
        id: 'triple-threat',
        check: () => {
          // This would need day tracking - simplified check for now
          return Object.values(topicProgress).some(topic =>
            topic.tutorial > 0 && topic.game > 0 && topic.sandbox > 0
          )
        },
        message: 'Triple Threat',
      },
    ]
  }
}

export const achievementManager = new AchievementManager()
