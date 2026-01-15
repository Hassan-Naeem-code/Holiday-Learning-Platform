'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, X, Award, Star, Edit2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import { getSession } from '@/utils/sessionManager'
import { toast } from '@/components/Common/Toast'

interface CertificateProps {
  userName: string
  languageName: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'tutorial' | 'game' | 'sandbox'
  completionDate?: string
  onClose: () => void
}

export default function Certificate({
  userName: initialUserName,
  languageName,
  difficulty,
  type,
  completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  onClose
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)
  const [userName, setUserName] = useState(initialUserName)
  const [isEditingName, setIsEditingName] = useState(false)

  // Generate a secure certificate ID using multiple factors
  const generateCertificateId = (): string => {
    const userCode = getSession() || 'GUEST'

    // Create a hash from multiple inputs
    const data = `${userCode}${languageName}${difficulty}${type}${completionDate}`
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }

    // Combine components for unique ID
    const timestamp = Date.now().toString(36)
    const hashStr = Math.abs(hash).toString(36).toUpperCase()
    return `CLB-${difficulty.toUpperCase()}-${hashStr}-${timestamp}`
  }

  const [certificateId] = useState(generateCertificateId())

  const getDifficultyLabel = () => {
    switch (difficulty) {
      case 'easy':
        return 'Beginner Level'
      case 'medium':
        return 'Intermediate Level'
      case 'hard':
        return 'Advanced Level'
    }
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'from-green-400 to-emerald-500'
      case 'medium':
        return 'from-yellow-400 to-orange-500'
      case 'hard':
        return 'from-red-400 to-pink-500'
    }
  }

  // Sanitize filename to prevent path traversal and special characters
  const sanitizeFilename = (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9-_\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .substring(0, 100) // Limit length
  }

  const handleDownload = async () => {
    if (!certificateRef.current) return

    try {
      // Hide elements with no-print class
      const noPrintElements = certificateRef.current.querySelectorAll('.no-print')
      noPrintElements.forEach(el => (el as HTMLElement).style.display = 'none')

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      })

      // Restore hidden elements
      noPrintElements.forEach(el => (el as HTMLElement).style.display = '')

      // Sanitize all filename components
      const sanitizedName = sanitizeFilename(userName)
      const sanitizedLanguage = sanitizeFilename(languageName)
      const sanitizedDifficulty = difficulty // Already validated as enum

      const link = document.createElement('a')
      link.download = `${sanitizedName}-${sanitizedLanguage}-${sanitizedDifficulty}-certificate.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error downloading certificate:', error)
      toast.error('Failed to download certificate. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl my-auto px-2 sm:px-0"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate */}
        <div
          ref={certificateRef}
          className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
        >
          {/* Border Design */}
          <div className="border-8 border-double border-yellow-600 p-8">
            <div className="border-4 border-yellow-500 p-8 relative">
              {/* Corner Decorations */}
              <div className="absolute top-2 left-2 w-12 h-12 border-t-4 border-l-4 border-yellow-600"></div>
              <div className="absolute top-2 right-2 w-12 h-12 border-t-4 border-r-4 border-yellow-600"></div>
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-4 border-l-4 border-yellow-600"></div>
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-4 border-r-4 border-yellow-600"></div>

              <div className="text-center space-y-6">
                {/* Award Icon */}
                <div className="flex justify-center">
                  <div className={`bg-gradient-to-br ${getDifficultyColor()} p-5 rounded-full`}>
                    <Award className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-3">
                    Certificate of Achievement
                  </h1>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <p className="text-lg text-gray-600">
                      CodeLikeBasics Learning Platform
                    </p>
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>

                {/* Recipient */}
                <div className="py-6">
                  <p className="text-lg text-gray-600 mb-3">
                    This certifies that
                  </p>

                  {/* Editable Name Field */}
                  <div className="relative inline-block w-full max-w-xl mx-auto mb-6">
                    {isEditingName ? (
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onBlur={() => setIsEditingName(false)}
                        autoFocus
                        className="w-full text-center text-4xl font-bold text-purple-600 px-4 py-2 border-b-2 border-purple-400 focus:outline-none focus:border-purple-600"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="relative group">
                        <h2 className="text-4xl font-bold text-purple-600 px-4 py-2 cursor-pointer break-words"
                            onClick={() => setIsEditingName(true)}>
                          {userName}
                        </h2>
                        <button
                          onClick={() => setIsEditingName(true)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 no-print"
                          title="Edit name"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2 no-print">
                      {isEditingName ? 'Press Enter or click outside to save' : 'Click name to edit'}
                    </p>
                  </div>

                  <p className="text-lg text-gray-600 mb-2">
                    has successfully completed
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mb-4 break-words">
                    {languageName}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    {getDifficultyLabel()}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                  This achievement demonstrates dedication, perseverance, and mastery of
                  interactive learning content in {languageName}.
                </p>

                {/* Date and Signature */}
                <div className="pt-8 flex justify-around items-center gap-8">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-800 pt-2 px-12">
                      <p className="text-base font-bold text-gray-800">Date</p>
                      <p className="text-sm text-gray-600">{completionDate}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-800 pt-2 px-12">
                      <p className="text-base font-bold text-gray-800">Authorized By</p>
                      <p className="text-sm text-gray-600">CodeLikeBasics</p>
                    </div>
                  </div>
                </div>

                {/* Serial Number */}
                <div className="pt-4">
                  <p className="text-xs text-gray-400 break-all">
                    Certificate ID: {certificateId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" />
          <span>Download Certificate</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
