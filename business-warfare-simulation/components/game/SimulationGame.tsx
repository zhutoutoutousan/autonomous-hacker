'use client'

import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, BookOpen, Award } from 'lucide-react'
import DecisionCard from './DecisionCard'
import CaseOverview from './CaseOverview'
import ResultsScreen from './ResultsScreen'

interface SimulationGameProps {
  onBack: () => void
}

export default function SimulationGame({ onBack }: SimulationGameProps) {
  const { currentCase, currentDecisionIndex, score, makeDecision, completeCase, decisions } = useGameStore()
  const [showResults, setShowResults] = useState(false)

  if (!currentCase) return null

  const currentDecision = currentCase.decisions[currentDecisionIndex]
  const isLastDecision = currentDecisionIndex >= currentCase.decisions.length - 1
  const hasMadeDecision = currentDecision && decisions[currentDecision.id]

  const handleDecision = (optionId: string) => {
    if (!currentDecision) return
    
    makeDecision(currentDecision.id, optionId)
    
    if (isLastDecision) {
      setTimeout(() => {
        completeCase()
        setShowResults(true)
      }, 2000)
    }
  }

  if (showResults) {
    return <ResultsScreen onBack={onBack} />
  }

  return (
    <div className="min-h-screen bg-game-darker p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-game-dark/50 hover:bg-game-dark border border-game-primary/30 rounded text-game-primary transition-all"
          >
            <ArrowLeft size={18} />
            Back to Cases
          </button>
          
          <div className="flex items-center gap-4">
            <div className="game-panel px-4 py-2 rounded-lg">
              <div className="text-xs text-white/70 mb-1">Score</div>
              <div className="text-xl font-bold text-game-primary">{score}</div>
            </div>
            <div className="game-panel px-4 py-2 rounded-lg">
              <div className="text-xs text-white/70 mb-1">Decision</div>
              <div className="text-xl font-bold text-game-secondary">
                {currentDecisionIndex + 1}/{currentCase.decisions.length}
              </div>
            </div>
          </div>
        </div>

        {/* Case Overview */}
        <CaseOverview case_={currentCase} />

        {/* Decision Section */}
        <AnimatePresence mode="wait">
          {currentDecision && (
            <motion.div
              key={currentDecision.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <DecisionCard
                decision={currentDecision}
                onSelect={handleDecision}
                selectedOption={hasMadeDecision ? decisions[currentDecision.id] : null}
                showExplanation={hasMadeDecision}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="flex gap-2">
            {currentCase.decisions.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded ${
                  index < currentDecisionIndex
                    ? 'bg-game-success'
                    : index === currentDecisionIndex
                    ? 'bg-game-primary'
                    : 'bg-game-dark/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

