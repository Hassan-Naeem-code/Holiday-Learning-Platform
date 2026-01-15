'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Trophy, BookOpen, LogOut, Hammer } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'
import { clearSession, getSession } from '@/utils/sessionManager'

export default function Navbar() {
  const router = useRouter()
  const { user, loadFromStorage } = useUserStore()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  // Check authentication on mount and listen for storage changes
  useEffect(() => {
    const checkAuth = () => {
      const session = getSession()
      setIsAuthenticated(!!session)
    }

    // Initial check
    loadFromStorage()
    checkAuth()

    // Listen for storage changes (instant update when session changes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_session' || e.key === null) {
        checkAuth()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    // Also poll less frequently as a fallback (every 30 seconds instead of 1 second)
    const interval = setInterval(checkAuth, 30000)

    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadFromStorage])

  const handleSwitchAccount = () => {
    // Clear session and redirect to onboarding
    clearSession()
    setIsAuthenticated(false)
    router.push('/')
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/projects', label: 'Projects', icon: Hammer },
    { href: '/progress', label: 'Progress', icon: Trophy },
    { href: '/achievements', label: 'Achievements', icon: BookOpen },
  ]

  if (!isAuthenticated) return null

  return (
    <motion.nav
      className="glass-card mx-2 sm:mx-4 mt-2 sm:mt-4 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 relative z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-1 sm:space-x-2 xl:space-x-3 group">
          <motion.div
            className="relative w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/logo.png"
              alt="CodeLikeBasics Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </motion.div>
          <span className="text-sm sm:text-base xl:text-lg 2xl:text-xl font-bold text-white group-hover:text-christmas-gold transition-colors">
            CodeLikeBasics
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden xl:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Stats */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 xl:space-x-4">
          {/* <SoundToggle /> */}
          <div className="glass-card px-1.5 sm:px-2 xl:px-4 py-1 sm:py-1.5 xl:py-2 flex items-center space-x-1 sm:space-x-1.5 xl:space-x-3">
            <div className="flex items-center space-x-0.5">
              <span className="text-sm sm:text-base xl:text-xl">⭐</span>
              <span className="text-white font-bold text-xs xl:text-base">Lv.{user.level}</span>
            </div>
            <div className="h-3 sm:h-4 xl:h-6 w-px bg-white/30"></div>
            <div className="flex items-center space-x-0.5">
              <span className="text-xs sm:text-sm xl:text-lg">🔥</span>
              <span className="text-white font-bold text-xs xl:text-base">{user.streak}</span>
            </div>
            <div className="hidden sm:block h-3 sm:h-4 xl:h-6 w-px bg-white/30"></div>
            <div className="hidden sm:flex items-center space-x-0.5">
              <span className="text-xs sm:text-sm xl:text-lg">💎</span>
              <span className="text-white font-bold text-xs xl:text-base">{user.totalXP}</span>
            </div>
          </div>

          {/* Switch Account Button - Only show when authenticated */}
          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSwitchAccount}
              className="hidden xl:flex items-center gap-2 glass-card px-3 xl:px-4 py-2 text-white/80 hover:text-white transition-colors group"
              title="Switch Account"
            >
              <LogOut className="w-4 h-4 xl:w-5 xl:h-5 group-hover:scale-110 transition-transform" />
              <span className="text-xs xl:text-sm font-medium">Switch</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="xl:hidden mt-2 sm:mt-3 flex justify-around border-t border-white/20 pt-2 sm:pt-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center space-y-0.5 sm:space-y-1 text-white/80 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Switch Account Button (Mobile) - Only show when authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleSwitchAccount}
            className="flex flex-col items-center space-y-0.5 sm:space-y-1 text-white/80 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-medium">Switch</span>
          </button>
        )}
      </div>
    </motion.nav>
  )
}
