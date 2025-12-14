'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Home, Trophy, BookOpen } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { useEffect } from 'react'
import SoundToggle from '@/components/Common/SoundToggle'

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
      className="glass-card mx-4 mt-4 px-6 py-4 relative z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            className="relative w-10 h-10"
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
          <span className="text-xl font-bold text-white group-hover:text-christmas-gold transition-colors">
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
        <div className="flex items-center space-x-4">
          {/* <SoundToggle /> */}
          <div className="glass-card px-4 py-2 flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <span className="text-2xl">⭐</span>
              <span className="text-white font-bold">Lv.{user.level}</span>
            </div>
            <div className="h-6 w-px bg-white/30"></div>
            <div className="flex items-center space-x-1">
              <span className="text-xl">🔥</span>
              <span className="text-white font-bold">{user.streak}</span>
            </div>
            <div className="h-6 w-px bg-white/30"></div>
            <div className="flex items-center space-x-1">
              <span className="text-xl">💎</span>
              <span className="text-white font-bold">{user.totalXP}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4 flex justify-around border-t border-white/20 pt-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
