'use client'

import { useState, createContext, useContext, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 4000) => {
    const id = Math.random().toString(36).substring(7)
    setToasts(prev => [...prev, { id, message, type, duration }])

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, duration)
    }
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, hideToast }: { toasts: Toast[], hideToast: (id: string) => void }) {
  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90 border-green-500/50'
      case 'error':
        return 'bg-red-900/90 border-red-500/50'
      case 'warning':
        return 'bg-yellow-900/90 border-yellow-500/50'
      default:
        return 'bg-blue-900/90 border-blue-500/50'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border backdrop-blur-lg shadow-lg ${getStyles(toast.type)}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(toast.type)}
            </div>
            <p className="flex-1 text-sm text-white font-medium">
              {toast.message}
            </p>
            <button
              onClick={() => hideToast(toast.id)}
              className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Global toast function for non-component use
let globalShowToast: ((message: string, type?: ToastType, duration?: number) => void) | null = null

export function setGlobalToast(showToast: (message: string, type?: ToastType, duration?: number) => void) {
  globalShowToast = showToast
}

export function toast(message: string, type: ToastType = 'info', duration: number = 4000) {
  if (globalShowToast) {
    globalShowToast(message, type, duration)
  } else {
    // Fallback to console if toast not initialized
    console.log(`[Toast ${type}]: ${message}`)
  }
}

// Convenience methods
toast.success = (message: string, duration?: number) => toast(message, 'success', duration)
toast.error = (message: string, duration?: number) => toast(message, 'error', duration)
toast.warning = (message: string, duration?: number) => toast(message, 'warning', duration)
toast.info = (message: string, duration?: number) => toast(message, 'info', duration)
