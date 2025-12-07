'use client'

import { Decision, DecisionOption } from '@/data/historicalCases'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface DecisionCardProps {
  decision: Decision
  onSelect: (optionId: string) => void
  selectedOption: string | null
  showExplanation: boolean
}

export default function DecisionCard({ decision, onSelect, selectedOption, showExplanation }: DecisionCardProps) {
  const selectedOptionData = selectedOption 
    ? decision.options.find(o => o.id === selectedOption)
    : null

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-game-success'
    if (score >= 40) return 'text-game-warning'
    return 'text-game-danger'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 70) return CheckCircle
    if (score >= 40) return AlertCircle
    return XCircle
  }

  return (
    <div className="game-panel p-6 rounded-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-game-primary mb-4 glow-text">
          Decision Point
        </h3>
        <p className="text-white/90 text-lg leading-relaxed">
          {decision.scenario}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {decision.options.map((option, index) => {
          const isSelected = selectedOption === option.id
          const ScoreIcon = getScoreIcon(option.score)
          const scoreColor = getScoreColor(option.score)

          return (
            <motion.button
              key={option.id}
              onClick={() => !selectedOption && onSelect(option.id)}
              disabled={!!selectedOption}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                isSelected
                  ? `bg-${scoreColor.replace('text-', '')}/20 border-${scoreColor.replace('text-', '')} ${scoreColor}`
                  : selectedOption
                  ? 'bg-game-dark/30 border-white/10 text-white/50 cursor-not-allowed'
                  : 'bg-game-dark/50 border-white/20 hover:border-game-primary/50 hover:bg-game-primary/10 text-white cursor-pointer'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium mb-2">{option.text}</div>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-current/20">
                      <div className="text-sm font-medium mb-2">Consequences:</div>
                      <ul className="space-y-1 text-sm opacity-90">
                        {option.consequences.map((consequence, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{consequence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className={`ml-4 flex items-center gap-2 ${scoreColor}`}>
                    <ScoreIcon size={24} />
                    <span className="text-2xl font-bold">{option.score}</span>
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {showExplanation && selectedOptionData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-game-primary/10 border border-game-primary/30 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="text-game-primary mt-1" size={20} />
            <div className="flex-1">
              <div className="text-game-primary font-bold mb-2">Strategic Analysis</div>
              <p className="text-white/90 leading-relaxed">
                {decision.explanation}
              </p>
              {decision.correctOption && selectedOption === decision.correctOption && (
                <div className="mt-3 flex items-center gap-2 text-game-success">
                  <CheckCircle size={18} />
                  <span className="text-sm font-medium">Optimal Strategy Selected</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

