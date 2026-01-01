'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallbackTitle?: string
  fallbackMessage?: string
  showHomeButton?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire app
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('Error Boundary caught an error:', error, errorInfo)

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    })

    // You can also log the error to an error reporting service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    // Reset the error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleGoHome = () => {
    // Navigate to home and reset error
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      const {
        fallbackTitle = 'Oops! Something went wrong',
        fallbackMessage = 'We encountered an unexpected error. Please try refreshing the page.',
        showHomeButton = true,
      } = this.props

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-purple-dark via-brand-purple to-brand-blue-dark">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full"
          >
            <div className="glass-card p-6 sm:p-8 md:p-12 text-center">
              {/* Error Icon */}
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="flex justify-center mb-6"
              >
                <div className="bg-red-500/20 p-6 rounded-full">
                  <AlertTriangle className="w-16 h-16 text-red-400" />
                </div>
              </motion.div>

              {/* Error Message */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {fallbackTitle}
              </h1>
              <p className="text-lg text-white/80 mb-8">
                {fallbackMessage}
              </p>

              {/* Error Details (Development Mode) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-black/30 rounded-lg text-left">
                  <p className="text-sm text-red-300 font-mono mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </p>
                  {this.state.errorInfo && (
                    <details className="text-xs text-white/60 font-mono mt-2">
                      <summary className="cursor-pointer hover:text-white/80">
                        Stack Trace
                      </summary>
                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={this.handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </motion.button>

                {showHomeButton && (
                  <motion.button
                    onClick={this.handleGoHome}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-brand-gold to-brand-gold-dark text-gray-900 font-bold rounded-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Go Home
                  </motion.button>
                )}
              </div>

              {/* Help Text */}
              <p className="text-sm text-white/60 mt-8">
                If the problem persists, please try clearing your browser cache or contact support.
              </p>
            </div>
          </motion.div>
        </div>
      )
    }

    // No error, render children normally
    return this.props.children
  }
}
