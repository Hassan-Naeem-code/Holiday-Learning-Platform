'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, SkipForward, SkipBack, Pause, Play } from 'lucide-react'

const PLAYLIST = [
  {
    title: 'All I Want for Christmas Is You',
    artist: 'Mariah Carey',
    // User needs to add actual file to /public/music/ folder
    src: '/music/all-i-want-for-christmas.mp3',
  },
  {
    title: 'Christmas/Sarajevo 12/24',
    artist: 'Trans-Siberian Orchestra',
    src: '/music/sarajevo-1224.mp3',
  },
  {
    title: 'We Wish You a Merry Christmas',
    artist: 'Traditional',
    src: '/music/we-wish-you-merry-christmas.mp3',
  },
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [showControls, setShowControls] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load music preference from localStorage
  useEffect(() => {
    const savedMusicState = localStorage.getItem('musicEnabled')
    if (savedMusicState === 'true') {
      setIsPlaying(true)
    }

    const savedVolume = localStorage.getItem('musicVolume')
    if (savedVolume) {
      setVolume(parseFloat(savedVolume))
    }
  }, [])

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clean up previous audio if exists
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current.removeEventListener('ended', handleNextTrack)
        audioRef.current.load() // Reset the audio element
      }

      // Create new audio element with current track
      const audio = new Audio()
      audio.src = PLAYLIST[currentTrackIndex].src
      audio.loop = false
      audio.volume = volume
      audioRef.current = audio

      // When track ends, play next
      const onEnded = () => handleNextTrack()
      audio.addEventListener('ended', onEnded)

      // When track can play
      const onCanPlay = () => {
        setIsLoaded(true)
        // If was playing, continue playing new track
        if (isPlaying) {
          audio.play().catch((error) => {
            console.warn('Playback prevented:', error)
          })
        }
      }
      audio.addEventListener('canplay', onCanPlay)

      // Error handling
      const onError = () => {
        console.warn('Audio file not found:', PLAYLIST[currentTrackIndex].src)
        console.warn('Please add MP3 files to /public/music/ folder')
        setIsLoaded(false)
      }
      audio.addEventListener('error', onError)

      setIsLoaded(false)
      audio.load() // Start loading the new track

      return () => {
        if (audio) {
          audio.pause()
          audio.src = ''
          audio.removeEventListener('ended', onEnded)
          audio.removeEventListener('canplay', onCanPlay)
          audio.removeEventListener('error', onError)
        }
      }
    }
  }, [currentTrackIndex])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current && isLoaded) {
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('Playback prevented:', error)
          })
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, isLoaded])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      localStorage.setItem('musicVolume', volume.toString())
    }
  }, [volume])

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length)
  }

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length)
  }

  const togglePlay = () => {
    const newState = !isPlaying
    setIsPlaying(newState)
    localStorage.setItem('musicEnabled', newState.toString())
  }

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0)
    } else {
      setVolume(0.5)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Music Button */}
      <motion.div
        className="relative"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        {/* Main Toggle Button */}
        <motion.button
          onClick={togglePlay}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-lg border-2 transition-all ${
            isPlaying
              ? 'bg-gradient-to-r from-red-500 to-green-600 border-white/30'
              : 'bg-white/20 border-white/10 hover:bg-white/30'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={
            isPlaying
              ? {
                  boxShadow: [
                    '0 0 20px rgba(255, 0, 0, 0.5)',
                    '0 0 40px rgba(0, 255, 0, 0.5)',
                    '0 0 20px rgba(255, 0, 0, 0.5)',
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isPlaying ? (
            <Volume2 className="w-8 h-8 text-white" />
          ) : (
            <VolumeX className="w-8 h-8 text-white" />
          )}
        </motion.button>

        {/* Christmas Icon Decoration */}
        <motion.div
          className="absolute -top-2 -right-2 text-2xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span>🎄</span>
        </motion.div>

        {/* Expanded Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-20 right-0 bg-gradient-to-br from-red-600 via-green-700 to-red-600 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20 min-w-[280px]"
            >
              {/* Song Info */}
              <div className="mb-4 text-center">
                <p className="text-white font-bold text-sm mb-1">
                  {PLAYLIST[currentTrackIndex].title}
                </p>
                <p className="text-white/70 text-xs">
                  {PLAYLIST[currentTrackIndex].artist}
                </p>
                <p className="text-white/50 text-xs mt-1">
                  Track {currentTrackIndex + 1} of {PLAYLIST.length}
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <motion.button
                  onClick={handlePreviousTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <SkipBack className="w-5 h-5 text-white" />
                </motion.button>

                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/30 p-3 rounded-lg hover:bg-white/40 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleNextTrack}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <button onClick={toggleMute} className="text-white/80 hover:text-white">
                  {volume > 0 ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
                  }}
                />
                <span className="text-white text-xs w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>

              {/* Status */}
              {!isLoaded && (
                <p className="text-yellow-300 text-xs text-center mt-2">
                  ⚠️ Add MP3 files to /public/music/
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playing Indicator */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-white rounded-full"
                  animate={{
                    height: ['4px', '12px', '4px'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
