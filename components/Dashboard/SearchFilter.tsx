'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import type { Module } from '@/utils/techModules'

interface SearchFilterProps {
  modules: Module[]
  onFilteredModulesChange: (modules: Module[]) => void
}

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced'

export default function SearchFilter({ modules, onFilteredModulesChange }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique difficulty levels from all modules
  const difficulties: DifficultyFilter[] = ['all', 'beginner', 'intermediate', 'advanced']

  // Filter modules based on search and filters
  const filteredModules = useMemo(() => {
    let result = [...modules]

    // Search filter - search in module name, description, and language names
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(module => {
        // Check module name and description
        if (module.name.toLowerCase().includes(query)) return true
        if (module.description.toLowerCase().includes(query)) return true

        // Check language names and descriptions
        const hasMatchingLanguage = module.languages.some(lang =>
          lang.name.toLowerCase().includes(query) ||
          lang.description.toLowerCase().includes(query)
        )
        if (hasMatchingLanguage) return true

        return false
      })
    }

    // Difficulty filter - filter modules that have at least one language with the selected difficulty
    if (difficultyFilter !== 'all') {
      result = result.filter(module =>
        module.languages.some(lang => lang.difficulty === difficultyFilter)
      )
    }

    return result
  }, [modules, searchQuery, difficultyFilter])

  // Update parent when filtered modules change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  // Sync filtered results to parent - use useEffect for side effects, not useMemo
  useEffect(() => {
    onFilteredModulesChange(filteredModules)
  }, [filteredModules, onFilteredModulesChange])

  const clearFilters = () => {
    setSearchQuery('')
    setDifficultyFilter('all')
  }

  const hasActiveFilters = searchQuery.trim() !== '' || difficultyFilter !== 'all'

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search modules, languages, or topics..."
            className="w-full pl-12 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
          aria-label={showFilters ? 'Hide filters menu' : 'Show filters menu'}
          aria-expanded={showFilters}
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-brand-gold rounded-full" aria-hidden="true" />
          )}
        </button>

        {/* Difficulty Filter (Desktop) */}
        <div className="hidden sm:block relative">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
            className="appearance-none px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all cursor-pointer"
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff} className="bg-gray-800 text-white">
                {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={clearFilters}
            className="hidden sm:flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-all"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden mt-4 overflow-hidden"
          >
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Difficulty Level</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(diff => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        difficultyFilter === diff
                          ? 'bg-brand-gold text-gray-900 font-medium'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {diff === 'all' ? 'All' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <AnimatePresence mode="wait">
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center"
          >
            <p className="text-white/60 text-sm">
              Showing <span className="text-brand-gold font-semibold">{filteredModules.length}</span>{' '}
              {filteredModules.length === 1 ? 'module' : 'modules'}
              {searchQuery && (
                <> for &quot;<span className="text-white">{searchQuery}</span>&quot;</>
              )}
              {difficultyFilter !== 'all' && (
                <> at <span className="text-white capitalize">{difficultyFilter}</span> level</>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results Message */}
      <AnimatePresence>
        {hasActiveFilters && filteredModules.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 text-center py-12 bg-white/5 rounded-2xl border border-white/10"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No modules found</h3>
            <p className="text-white/60 mb-4">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-brand-gold text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
