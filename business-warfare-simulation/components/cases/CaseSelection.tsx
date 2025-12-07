'use client'

import { useState } from 'react'
import { HistoricalCase, getAllCases, getCasesByDifficulty } from '@/data/historicalCases'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, Target, BookOpen } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'

interface CaseSelectionProps {
  onSelectCase: (case_: HistoricalCase) => void
}

export default function CaseSelection({ onSelectCase }: CaseSelectionProps) {
  const [filter, setFilter] = useState<string>('all')
  const { completedCases, level, experience } = useGameStore()
  
  const allCases = getAllCases()
  const filteredCases = filter === 'all' 
    ? allCases 
    : getCasesByDifficulty(filter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-game-success border-game-success'
      case 'intermediate':
        return 'text-game-warning border-game-warning'
      case 'advanced':
        return 'text-game-danger border-game-danger'
      case 'expert':
        return 'text-game-info border-game-info'
      default:
        return 'text-white border-white'
    }
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 glow-text text-game-primary">
            BUSINESS WARFARE SIMULATION
          </h1>
          <p className="text-game-secondary text-lg">
            Learn from Real Historical Battles Between Enterprises
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="game-panel p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-game-primary" size={20} />
              <span className="text-white font-medium">Level</span>
            </div>
            <div className="text-2xl font-bold text-game-primary">{level}</div>
          </div>
          <div className="game-panel p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-game-success" size={20} />
              <span className="text-white font-medium">Experience</span>
            </div>
            <div className="text-2xl font-bold text-game-success">{experience}</div>
          </div>
          <div className="game-panel p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-game-secondary" size={20} />
              <span className="text-white font-medium">Cases Completed</span>
            </div>
            <div className="text-2xl font-bold text-game-secondary">
              {completedCases.length}/{allCases.length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setFilter(difficulty)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                filter === difficulty
                  ? 'bg-game-primary/20 border-game-primary text-game-primary'
                  : 'border-white/20 text-white/70 hover:border-white/40'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Case Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((case_, index) => {
            const isCompleted = completedCases.includes(case_.id)
            
            return (
              <motion.div
                key={case_.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectCase(case_)}
                className="game-panel p-6 rounded-lg cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-game-primary mb-2">
                      {case_.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
                      <Clock size={14} />
                      <span>{case_.year}</span>
                      <span>•</span>
                      <span>{case_.industry}</span>
                    </div>
                  </div>
                  {isCompleted && (
                    <div className="text-game-success">✓</div>
                  )}
                </div>

                <p className="text-white/80 text-sm mb-4 line-clamp-3">
                  {case_.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {case_.attackVectors.slice(0, 3).map((vector) => (
                    <span
                      key={vector}
                      className="px-2 py-1 bg-game-dark/50 border border-game-primary/20 rounded text-xs text-white/70"
                    >
                      {vector}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded border text-xs ${getDifficultyColor(case_.difficulty)}`}>
                    {case_.difficulty.toUpperCase()}
                  </span>
                  <button className="px-4 py-2 bg-game-primary/20 hover:bg-game-primary/30 border border-game-primary/50 rounded text-game-primary text-sm transition-all">
                    Start Simulation
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

