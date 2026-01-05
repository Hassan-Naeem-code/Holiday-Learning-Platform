/**
 * Solution Area Component
 * Reusable drop zone for game solutions
 * Works with all drag-drop games
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { X } from 'lucide-react'
import type { DraggableItem } from '@/types'

interface SolutionAreaProps {
  /** Items currently in solution */
  items: DraggableItem[]

  /** Callback when item is removed */
  onRemoveItem: (index: number) => void

  /** Title for the solution area */
  title?: string

  /** Placeholder text when empty */
  placeholder?: string

  /** Whether solution is being validated */
  isValidating?: boolean

  /** Whether to show remove buttons */
  showRemoveButtons?: boolean

  /** Custom className */
  className?: string
}

export default function SolutionArea({
  items,
  onRemoveItem,
  title = 'Your Solution',
  placeholder = 'Drag items here to build your solution',
  isValidating = false,
  showRemoveButtons = true,
  className = '',
}: SolutionAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'solution-area',
  })

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Title */}
      {title && (
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-2xl">📝</span>
          {title}
        </h3>
      )}

      {/* Drop Zone */}
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`
            min-h-[200px] p-4 rounded-xl border-2 border-dashed
            transition-all duration-200
            ${isOver ? 'border-green-400 bg-green-400/10' : 'border-white/30 bg-white/5'}
            ${isValidating ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          {/* Items */}
          <AnimatePresence>
            {items.length > 0 ? (
              <div className="space-y-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-2 p-3 bg-white/10 rounded-lg border border-white/20 group hover:bg-white/15 transition-colors"
                  >
                    {/* Order Number */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-purple flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>

                    {/* Item Icon */}
                    {item.icon && (
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                    )}

                    {/* Item Content */}
                    <span className="flex-1 text-white font-medium">{item.content}</span>

                    {/* Remove Button */}
                    {showRemoveButtons && (
                      <motion.button
                        onClick={() => onRemoveItem(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex-shrink-0 p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-white/40 text-center p-8"
              >
                <p>{placeholder}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SortableContext>

      {/* Item Count */}
      {items.length > 0 && (
        <p className="text-sm text-white/60 text-center">
          {items.length} item{items.length !== 1 ? 's' : ''} in solution
        </p>
      )}
    </div>
  )
}
