import type { Metadata } from 'next'
import './globals.css'
import FallingSnow from '@/components/Layout/FallingSnow'
import AnimatedSanta from '@/components/Layout/AnimatedSanta'
import Navbar from '@/components/Layout/Navbar'
import AchievementProvider from '@/components/Common/AchievementProvider'

export const metadata: Metadata = {
  title: 'Holiday Learning Platform - Learn Tech This Christmas!',
  description: 'Interactive learning platform with tutorials, games, and sandboxes. Learn software development, web dev, AI/ML, and more through engaging holiday-themed content!',
  keywords: 'learning, education, programming, games, interactive, christmas, technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AchievementProvider>
          <FallingSnow />
          <AnimatedSanta />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
        </AchievementProvider>
      </body>
    </html>
  )
}
