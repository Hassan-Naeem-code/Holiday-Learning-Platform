import { useState, useCallback } from 'react'

type ToastStatus = 'loading' | 'success' | 'error'

interface ToastState {
  show: boolean
  message: string
  status: ToastStatus
}

export function useLoadingToast() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    status: 'loading',
  })

  const showLoading = useCallback((message: string) => {
    setToast({ show: true, message, status: 'loading' })
  }, [])

  const showSuccess = useCallback((message: string, duration = 2000) => {
    setToast({ show: true, message, status: 'success' })
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, duration)
  }, [])

  const showError = useCallback((message: string, duration = 3000) => {
    setToast({ show: true, message, status: 'error' })
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, duration)
  }, [])

  const hide = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }))
  }, [])

  return {
    toast,
    showLoading,
    showSuccess,
    showError,
    hide,
  }
}
