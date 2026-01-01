import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AchievementProvider from '@/components/Common/AchievementProvider'
import ConsoleProtectionClient from '@/components/Common/ConsoleProtectionClient'
import ServiceWorkerRegistration from '@/components/Common/ServiceWorkerRegistration'
import InstallPrompt from '@/components/Common/InstallPrompt'
import ClientShell from '@/components/Layout/ClientShell'
import QueryProvider from '@/components/Providers/QueryProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const heroImage = '/logo.png'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'CodeLikeBasics - Learn to Code from the Basics!',
  description: 'Interactive learning platform for beginners. Learn software development, web dev, AI/ML, and more through engaging tutorials, games, and sandboxes!',
  keywords: ['learning', 'education', 'programming', 'games', 'interactive', 'coding education', 'technology'],
  applicationName: 'CodeLikeBasics',
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'CodeLikeBasics - Learn to Code from the Basics!',
    description: 'Interactive learning platform for beginners with tutorials, games, and sandboxes.',
    siteName: 'CodeLikeBasics',
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 1200,
        alt: 'CodeLikeBasics - Learn to Code from the Basics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeLikeBasics - Learn to Code from the Basics!',
    description: 'Interactive learning platform for beginners with tutorials, games, and sandboxes.',
    images: [heroImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CodeLikeBasics',
  },
  formatDetection: {
    telephone: false,
  },
  category: 'education',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#667eea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CodeLikeBasics',
    url: siteUrl,
    description:
      'Interactive learning platform for beginners. Learn software development, web dev, AI/ML, and more through engaging tutorials, games, and sandboxes!',
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" className="w-full">
      <body suppressHydrationWarning className={`${inter.className} w-full min-w-full`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServiceWorkerRegistration />
        <InstallPrompt />
        <ConsoleProtectionClient />
        <QueryProvider>
          <AchievementProvider>
            <ClientShell>
              {children}
            </ClientShell>
          </AchievementProvider>
        </QueryProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
