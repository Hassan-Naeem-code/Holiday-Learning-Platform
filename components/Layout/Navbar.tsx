'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Home, Trophy, BookOpen } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { useEffect } from 'react'

export default function Navbar() {
  const { user, loadFromStorage } = useUserStore()

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/progress', label: 'Progress', icon: Trophy },
    { href: '/achievements', label: 'Achievements', icon: BookOpen },
  ]

  return (
    <motion.nav
      className="glass-card mx-2 sm:mx-4 mt-2 sm:mt-4 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 relative z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 group">
          <motion.div
            className="relative w-8 h-8 sm:w-10 sm:h-10"
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
          <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white group-hover:text-christmas-gold transition-colors">
            CodeLikeBasics
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
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
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* <SoundToggle /> */}
          <div className="glass-card px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl">⭐</span>
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">Lv.{user.level}</span>
            </div>
            <div className="h-4 sm:h-5 md:h-6 w-px bg-white/30"></div>
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">🔥</span>
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">{user.streak}</span>
            </div>
            <div className="hidden sm:block h-4 sm:h-5 md:h-6 w-px bg-white/30"></div>
            <div className="hidden sm:flex items-center space-x-0.5 sm:space-x-1">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl">💎</span>
              <span className="text-white font-bold text-xs sm:text-sm md:text-base">{user.totalXP}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-2 sm:mt-3 md:mt-4 flex justify-around border-t border-white/20 pt-2 sm:pt-3 md:pt-4">
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
      </div>
    </motion.nav>
  )
}
