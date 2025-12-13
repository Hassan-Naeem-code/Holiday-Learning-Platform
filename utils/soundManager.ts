// Sound Manager - Generates and plays sound effects using Web Audio API

class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', enabled.toString())
    }
  }

  isEnabled(): boolean {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('soundEnabled')
      if (stored !== null) {
        this.enabled = stored === 'true'
      }
    }
    return this.enabled
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.enabled || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  // Success sound (ascending notes)
  playSuccess() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(523.25, 0.1) // C5
    setTimeout(() => this.playTone(659.25, 0.1), 100) // E5
    setTimeout(() => this.playTone(783.99, 0.2), 200) // G5
  }

  // Error sound (descending buzz)
  playError() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(300, 0.1, 'sawtooth', 0.2)
    setTimeout(() => this.playTone(200, 0.2, 'sawtooth', 0.2), 100)
  }

  // Click sound (short blip)
  playClick() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(800, 0.05, 'square', 0.1)
  }

  // Win sound (celebratory)
  playWin() {
    if (!this.enabled || !this.audioContext) return
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    notes.forEach((note, index) => {
      setTimeout(() => this.playTone(note, 0.15), index * 100)
    })
  }

  // Lose sound (sad trombone)
  playLose() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(400, 0.2, 'sawtooth', 0.3)
    setTimeout(() => this.playTone(350, 0.3, 'sawtooth', 0.3), 200)
  }

  // Hint sound (gentle ping)
  playHint() {
    if (!this.enabled || !this.audioContext) return
    this.playTone(1000, 0.1)
    setTimeout(() => this.playTone(1200, 0.1), 100)
  }

  // Achievement unlock sound (fanfare)
  playAchievement() {
    if (!this.enabled || !this.audioContext) return
    const melody = [659.25, 783.99, 1046.50, 1318.51] // E5, G5, C6, E6
    melody.forEach((note, index) => {
      setTimeout(() => this.playTone(note, 0.2), index * 100)
    })
  }

  // Level up sound (ascending scale)
  playLevelUp() {
    if (!this.enabled || !this.audioContext) return
    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25] // C major scale
    scale.forEach((note, index) => {
      setTimeout(() => this.playTone(note, 0.08), index * 50)
    })
  }

  // Combo sound (quick beeps, pitch increases with combo)
  playCombo(comboCount: number) {
    if (!this.enabled || !this.audioContext) return
    const basePitch = 600
    const pitch = basePitch + (comboCount * 50)
    this.playTone(pitch, 0.08, 'square', 0.15)
  }
}

export const soundManager = new SoundManager()
