'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, X, Award, Star, Edit2 } from 'lucide-react'
import html2canvas from 'html2canvas'

interface CertificateProps {
  userName: string
  languageName: string
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'tutorial' | 'game'
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

  const handleDownload = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `${userName}-${languageName}-${difficulty}-certificate.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error downloading certificate:', error)
      alert('Failed to download certificate. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full my-4 sm:my-6 md:my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-10 bg-red-500 text-white p-2 md:p-3 rounded-full hover:bg-red-600 transition-all shadow-lg"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Certificate */}
        <div
          ref={certificateRef}
          className="bg-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Border Design */}
          <div className="border-4 sm:border-6 md:border-8 border-double border-yellow-600 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
            <div className="border-2 sm:border-3 md:border-4 border-yellow-500 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 relative">
              {/* Corner Decorations */}
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-l-2 sm:border-t-3 sm:border-l-3 md:border-t-4 md:border-l-4 border-yellow-600"></div>
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-r-2 sm:border-t-3 sm:border-r-3 md:border-t-4 md:border-r-4 border-yellow-600"></div>
              <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-l-2 sm:border-b-3 sm:border-l-3 md:border-b-4 md:border-l-4 border-yellow-600"></div>
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-r-2 sm:border-b-3 sm:border-r-3 md:border-b-4 md:border-r-4 border-yellow-600"></div>

              <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                {/* Award Icon */}
                <div className="flex justify-center">
                  <div className={`bg-gradient-to-br ${getDifficultyColor()} p-3 sm:p-4 md:p-5 lg:p-6 rounded-full`}>
                    <Award className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 px-2">
                    Certificate of Achievement
                  </h1>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap px-2">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-yellow-500 fill-yellow-500" />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600">
                      CodeLikeBasics Learning Platform
                    </p>
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>

                {/* Recipient */}
                <div className="py-3 sm:py-4 md:py-6 lg:py-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-2 sm:mb-3 md:mb-4 px-2">
                    This certifies that
                  </p>

                  {/* Editable Name Field */}
                  <div className="relative inline-block w-full max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8">
                    {isEditingName ? (
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onBlur={() => setIsEditingName(false)}
                        autoFocus
                        className="w-full text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-2 py-2 border-b-2 border-purple-400 focus:outline-none focus:border-purple-600"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <div className="relative group">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-2 py-2 cursor-pointer break-words"
                            onClick={() => setIsEditingName(true)}>
                          {userName}
                        </h2>
                        <button
                          onClick={() => setIsEditingName(true)}
                          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-purple-600"
                          title="Edit name"
                        >
                          <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                      {isEditingName ? 'Press Enter or click outside to save' : 'Click name to edit'}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-2 sm:mb-3 px-2">
                    has successfully completed
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 px-2 break-words">
                    {languageName}
                  </p>
                  <div className={`inline-block bg-gradient-to-r ${getDifficultyColor()} px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 rounded-full mx-2`}>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white break-words">
                      {getDifficultyLabel()} {type === 'tutorial' ? 'Tutorial' : 'Quiz Challenge'}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
                  This achievement demonstrates dedication, perseverance, and mastery of
                  {type === 'tutorial' ? ' interactive learning content' : ' quiz challenges'} in {languageName}.
                </p>

                {/* Date and Signature */}
                <div className="pt-4 sm:pt-6 md:pt-8 lg:pt-12 flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-800 pt-2 px-6 sm:px-8 md:px-12 lg:px-16">
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800">Date</p>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">{completionDate}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-800 pt-2 px-6 sm:px-8 md:px-12 lg:px-16">
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800">Authorized By</p>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">CodeLikeBasics</p>
                    </div>
                  </div>
                </div>

                {/* Serial Number */}
                <div className="pt-3 sm:pt-4 md:pt-6">
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 break-all px-2">
                    Certificate ID: CLB-{difficulty.toUpperCase()}-{languageName.replace(/\s+/g, '')}-{Date.now()}
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
          className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          <span>Download Certificate</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
