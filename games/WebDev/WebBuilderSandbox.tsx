'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import DOMPurify from 'isomorphic-dompurify'
import GameContainer from '@/components/Games/GameContainer'
import { useUserStore } from '@/stores/userStore'
import { achievementManager } from '@/utils/achievementManager'

interface WebBlock {
  id: string
  type: 'html' | 'css' | 'text'
  value: string
}

const INITIAL_BLOCKS: WebBlock[] = [
  { id: '1', type: 'html', value: '<h1>My First Web Page</h1>' },
  { id: '2', type: 'html', value: '<p>This is a paragraph.</p>' },
  { id: '3', type: 'css', value: 'color: blue;' },
]

export default function WebBuilderSandbox() {
  const [blocks, setBlocks] = useState<WebBlock[]>(INITIAL_BLOCKS)
  const [output, setOutput] = useState<string>('')
  const [timeSpent, setTimeSpent] = useState(0)
  const startTimeRef = useRef(Date.now())
  const { addXP } = useUserStore()

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
      setTimeSpent(elapsed)

      if (elapsed % 300 === 0 && elapsed > 0) {
        addXP(20)
      }

      if (elapsed >= 1800) {
        achievementManager.checkAll()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [addXP])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const addBlock = (type: 'html' | 'css' | 'text') => {
    const newBlock: WebBlock = {
      id: Date.now().toString(),
      type,
      value: type === 'html' ? '<div></div>' : type === 'css' ? 'color: black;' : 'Text content'
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, value: string) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, value } : block
    ))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id))
  }

  const runCode = () => {
    let htmlContent = ''
    let cssContent = ''

    blocks.forEach(block => {
      if (block.type === 'html') {
        htmlContent += block.value + '\n'
      } else if (block.type === 'css') {
        cssContent += block.value + '\n'
      } else if (block.type === 'text') {
        htmlContent += `<p>${block.value}</p>\n`
      }
    })

    const fullHTML = `
      <style>${cssContent}</style>
      ${htmlContent}
    `

    // Sanitize HTML to prevent XSS attacks
    const sanitizedHTML = DOMPurify.sanitize(fullHTML, {
      ALLOWED_TAGS: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'ul', 'ol', 'li', 'br', 'strong', 'em', 'b', 'i', 'img', 'style', 'button', 'input', 'label', 'form', 'table', 'tr', 'td', 'th', 'thead', 'tbody'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'id', 'style', 'type', 'value', 'placeholder', 'name'],
    })

    setOutput(sanitizedHTML)
  }

  const reset = () => {
    setBlocks(INITIAL_BLOCKS)
    setOutput('')
  }

  return (
    <GameContainer title="Web Builder Sandbox" icon="🌐">
      <div className="glass-card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-white">Interactive Web Builder</h3>
          <div className="flex items-center gap-4">
            <div className="text-white bg-white/10 px-4 py-2 rounded-lg">
              ⏱️ {formatTime(timeSpent)}
            </div>
          </div>
        </div>
        <p className="text-white/70">
          Build your own web page! Add HTML, CSS, and text blocks, then click Run to see your creation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Blocks</h3>
            <div className="flex gap-2">
              <button
                onClick={() => addBlock('html')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                + HTML
              </button>
              <button
                onClick={() => addBlock('css')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
              >
                + CSS
              </button>
              <button
                onClick={() => addBlock('text')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                + Text
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {blocks.map(block => (
              <motion.div
                key={block.id}
                className="bg-white/10 rounded-lg p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${
                    block.type === 'html' ? 'bg-blue-500' :
                    block.type === 'css' ? 'bg-purple-500' : 'bg-green-500'
                  } text-white`}>
                    {block.type.toUpperCase()}
                  </span>
                  <button
                    onClick={() => deleteBlock(block.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    🗑️
                  </button>
                </div>
                <textarea
                  value={block.value}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  className="w-full bg-gray-900 text-white p-2 rounded text-sm font-mono resize-none"
                  rows={3}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <motion.button
              onClick={runCode}
              className="btn btn-primary flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ▶️ Run
            </motion.button>
            <motion.button
              onClick={reset}
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🔄 Reset
            </motion.button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
          <div className="bg-white rounded-lg p-4 min-h-96">
            {output ? (
              <div dangerouslySetInnerHTML={{ __html: output }} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Click "Run" to see your web page
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 mt-6">
        <h3 className="text-xl font-bold text-white mb-3">💡 Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80">
          <div>
            <strong className="text-christmas-gold">HTML Blocks:</strong> Add structure like &lt;h1&gt;, &lt;p&gt;, &lt;div&gt;
          </div>
          <div>
            <strong className="text-christmas-gold">CSS Blocks:</strong> Style your content with colors, fonts, sizes
          </div>
          <div>
            <strong className="text-christmas-gold">Text Blocks:</strong> Add plain text that becomes &lt;p&gt; tags
          </div>
        </div>
      </div>
    </GameContainer>
  )
}
