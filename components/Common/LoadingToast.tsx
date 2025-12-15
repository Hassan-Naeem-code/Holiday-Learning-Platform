'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Check, X } from 'lucide-react'

interface LoadingToastProps {
  show: boolean
  message: string
  status?: 'loading' | 'success' | 'error'
}

export default function LoadingToast({ show, message, status = 'loading' }: LoadingToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
        >
          <div className={`
            px-6 py-4 rounded-full shadow-2xl backdrop-blur-lg border-2 flex items-center gap-3
            ${status === 'loading' ? 'bg-blue-500/90 border-blue-300/50' : ''}
            ${status === 'success' ? 'bg-green-500/90 border-green-300/50' : ''}
            ${status === 'error' ? 'bg-red-500/90 border-red-300/50' : ''}
          `}>
            {status === 'loading' && (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            )}
            {status === 'success' && (
              <Check className="w-5 h-5 text-white" />
            )}
            {status === 'error' && (
              <X className="w-5 h-5 text-white" />
            )}
            <span className="text-white font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
