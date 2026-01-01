import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-12 text-center max-w-2xl mx-4">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-white/80 mb-8">
          Looks like this page doesn&apos;t exist! 🚀
        </p>
        <Link href="/" className="btn btn-primary text-lg px-8 py-4 inline-block">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  )
}
