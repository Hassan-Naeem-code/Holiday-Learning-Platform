'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SandboxContainer from '@/components/Sandbox/SandboxContainer'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useUserStore } from '@/stores/userStore'
import { achievementManager } from '@/utils/achievementManager'

interface DataRow {
  id: number
  name: string
  age: number
  score: number
}

const SAMPLE_DATA: DataRow[] = [
  { id: 1, name: 'Alice', age: 25, score: 92 },
  { id: 2, name: 'Bob', age: 30, score: 85 },
  { id: 3, name: 'Charlie', age: 22, score: 78 },
  { id: 4, name: 'Diana', age: 28, score: 95 },
  { id: 5, name: 'Eve', age: 35, score: 88 },
  { id: 6, name: 'Frank', age: 24, score: 72 },
]

type Operation = 'none' | 'filter' | 'sort' | 'aggregate'

export default function DataLabSandbox() {
  const [data, setData] = useState<DataRow[]>(SAMPLE_DATA)
  const [operation, setOperation] = useState<Operation>('none')
  const [filterValue, setFilterValue] = useState(80)
  const [sortBy, setSortBy] = useState<'age' | 'score'>('score')
  const [timeSpent, setTimeSpent] = useState(0)
  const startTimeRef = useRef<number>(Date.now())

  const { updateTopicProgress } = useTutorialStore()
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

  const applyOperation = () => {
    let result = [...SAMPLE_DATA]

    switch (operation) {
      case 'filter':
        result = result.filter(row => row.score >= filterValue)
        updateTopicProgress('data-science', 'sandbox', 25)
        break
      case 'sort':
        result = result.sort((a, b) => b[sortBy] - a[sortBy])
        updateTopicProgress('data-science', 'sandbox', 50)
        break
      case 'aggregate':
        // Show aggregate stats instead
        updateTopicProgress('data-science', 'sandbox', 75)
        break
    }

    setData(result)
  }

  const resetData = () => {
    setData(SAMPLE_DATA)
    setOperation('none')
  }

  const getAggregateStats = () => {
    const avgAge = data.reduce((sum, row) => sum + row.age, 0) / data.length
    const avgScore = data.reduce((sum, row) => sum + row.score, 0) / data.length
    const maxScore = Math.max(...data.map(row => row.score))
    const minScore = Math.min(...data.map(row => row.score))

    return { avgAge, avgScore, maxScore, minScore }
  }

  return (
    <SandboxContainer
      title="Data Lab"
      icon="📊"
      onRun={applyOperation}
      onReset={resetData}
      isRunning={false}
    >
      <div className="glass-card p-4 mb-6 text-center">
        <div className="text-white/70 text-sm mb-1">Time in Lab</div>
        <div className="text-2xl font-bold text-christmas-gold">
          {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operations Panel */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">🔧 Data Operations</h3>

          <div className="space-y-4">
            <div>
              <label className="text-white font-semibold mb-2 block">Select Operation:</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as Operation)}
                className="w-full bg-white/10 text-white border-2 border-white/20 rounded-lg p-2"
              >
                <option value="none">None</option>
                <option value="filter">Filter</option>
                <option value="sort">Sort</option>
                <option value="aggregate">Aggregate</option>
              </select>
            </div>

            {operation === 'filter' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="text-white font-semibold mb-2 block">
                  Filter by score ≥ {filterValue}
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filterValue}
                  onChange={(e) => setFilterValue(parseInt(e.target.value))}
                  className="w-full"
                />
              </motion.div>
            )}

            {operation === 'sort' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="text-white font-semibold mb-2 block">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'age' | 'score')}
                  className="w-full bg-white/10 text-white border-2 border-white/20 rounded-lg p-2"
                >
                  <option value="age">Age</option>
                  <option value="score">Score</option>
                </select>
              </motion.div>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded">
            <p className="text-white/80 text-sm">
              💡 <strong>Tip:</strong> Try different operations to analyze the dataset!
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-4">📋 Dataset</h3>

          {operation === 'aggregate' ? (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Aggregate Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-500/20 border-2 border-blue-500 rounded-lg p-4">
                  <div className="text-blue-400 text-sm mb-1">Average Age</div>
                  <div className="text-white text-2xl font-bold">
                    {getAggregateStats().avgAge.toFixed(1)}
                  </div>
                </div>
                <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-4">
                  <div className="text-green-400 text-sm mb-1">Average Score</div>
                  <div className="text-white text-2xl font-bold">
                    {getAggregateStats().avgScore.toFixed(1)}
                  </div>
                </div>
                <div className="bg-purple-500/20 border-2 border-purple-500 rounded-lg p-4">
                  <div className="text-purple-400 text-sm mb-1">Max Score</div>
                  <div className="text-white text-2xl font-bold">
                    {getAggregateStats().maxScore}
                  </div>
                </div>
                <div className="bg-orange-500/20 border-2 border-orange-500 rounded-lg p-4">
                  <div className="text-orange-400 text-sm mb-1">Min Score</div>
                  <div className="text-white text-2xl font-bold">
                    {getAggregateStats().minScore}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 mt-4">
                <div className="text-white/70 text-sm mb-2">Total Records</div>
                <div className="text-white text-3xl font-bold">{data.length}</div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    <th className="text-left p-3">ID</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Age</th>
                    <th className="text-left p-3">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <motion.tr
                      key={row.id}
                      className="border-b border-white/10 hover:bg-white/5"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-3">{row.id}</td>
                      <td className="p-3 font-semibold">{row.name}</td>
                      <td className="p-3">{row.age}</td>
                      <td className="p-3">
                        <span className={`font-bold ${row.score >= 90 ? 'text-green-400' : row.score >= 80 ? 'text-blue-400' : 'text-orange-400'}`}>
                          {row.score}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 text-white/70 text-sm text-center">
                Showing {data.length} of {SAMPLE_DATA.length} records
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6 mt-6">
        <h3 className="text-xl font-bold text-white mb-4">⚡ Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            onClick={() => {
              setOperation('filter')
              setFilterValue(90)
              setTimeout(() => applyOperation(), 100)
            }}
            className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">🌟</div>
            <div className="text-white font-semibold mb-1">High Performers</div>
            <div className="text-white/60 text-xs">Filter scores ≥ 90</div>
          </motion.button>

          <motion.button
            onClick={() => {
              setOperation('sort')
              setSortBy('age')
              setTimeout(() => applyOperation(), 100)
            }}
            className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="text-white font-semibold mb-1">Sort by Age</div>
            <div className="text-white/60 text-xs">Descending order</div>
          </motion.button>

          <motion.button
            onClick={() => {
              setOperation('aggregate')
              setTimeout(() => applyOperation(), 100)
            }}
            className="bg-white/5 hover:bg-white/10 border-2 border-white/20 rounded-lg p-4 text-left transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">📈</div>
            <div className="text-white font-semibold mb-1">Show Stats</div>
            <div className="text-white/60 text-xs">View aggregate data</div>
          </motion.button>
        </div>
      </div>
    </SandboxContainer>
  )
}
