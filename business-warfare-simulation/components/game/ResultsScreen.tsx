'use client'

import { useGameStore } from '@/store/gameStore'
import { motion } from 'framer-motion'
import { Award, TrendingUp, BookOpen, ArrowLeft, RotateCcw } from 'lucide-react'
import { HistoricalCase, getCaseById } from '@/data/historicalCases'

interface ResultsScreenProps {
  onBack: () => void
}

export default function ResultsScreen({ onBack }: ResultsScreenProps) {
  const { completedCases, totalScore, level, experience, achievements } = useGameStore()
  const lastCaseId = completedCases[completedCases.length - 1]
  const case_ = lastCaseId ? getCaseById(lastCaseId) : null

  const getScoreGrade = (score: number) => {
    if (score >= 80) return { grade: 'S', color: 'text-game-success', label: 'Strategic Master' }
    if (score >= 60) return { grade: 'A', color: 'text-game-primary', label: 'Excellent' }
    if (score >= 40) return { grade: 'B', color: 'text-game-warning', label: 'Good' }
    return { grade: 'C', color: 'text-game-danger', label: 'Needs Improvement' }
  }

  const { decisions: gameDecisions } = useGameStore()
  const score = case_?.decisions.reduce((acc, decision) => {
    const selected = gameDecisions[decision.id]
    const option = decision.options.find(o => o.id === selected)
    return acc + (option?.score || 0)
  }, 0) || 0

  const grade = getScoreGrade(score)

  return (
    <div className="min-h-screen bg-game-darker p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block mb-4"
          >
            <Award size={64} className={`${grade.color} glow-text`} />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 glow-text text-game-primary">
            SIMULATION COMPLETE
          </h1>
          <p className="text-game-secondary text-lg">Case Analysis Finished</p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="game-panel p-8 rounded-lg mb-6 text-center"
        >
          <div className="text-white/70 text-sm mb-2">Final Score</div>
          <div className={`text-6xl font-bold mb-2 ${grade.color} glow-text`}>
            {score}
          </div>
          <div className={`text-2xl font-bold mb-4 ${grade.color}`}>
            Grade: {grade.grade} - {grade.label}
          </div>
        </motion.div>

        {/* Case Outcomes */}
        {case_ && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="game-panel p-6 rounded-lg mb-6"
          >
            <h3 className="text-xl font-bold text-game-primary mb-4">Historical Outcome</h3>
            {case_.outcomes.map((outcome, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-3 py-1 bg-game-success/20 border border-game-success/50 rounded text-game-success text-sm">
                    Winner: {outcome.winner}
                  </div>
                  <div className="px-3 py-1 bg-game-danger/20 border border-game-danger/50 rounded text-game-danger text-sm">
                    Loser: {outcome.loser}
                  </div>
                </div>
                <p className="text-white/80 mb-2">{outcome.result}</p>
                <p className="text-white/60 text-sm">{outcome.longTermImpact}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Lessons Learned */}
        {case_ && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="game-panel p-6 rounded-lg mb-6"
          >
            <h3 className="text-xl font-bold text-game-primary mb-4 flex items-center gap-2">
              <BookOpen size={20} />
              Key Lessons
            </h3>
            <ul className="space-y-2">
              {case_.lessons.map((lesson, index) => (
                <li key={index} className="flex items-start gap-3 text-white/80">
                  <span className="text-game-primary mt-1">•</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="game-panel p-4 rounded-lg text-center">
            <div className="text-white/70 text-sm mb-2">Level</div>
            <div className="text-2xl font-bold text-game-primary">{level}</div>
          </div>
          <div className="game-panel p-4 rounded-lg text-center">
            <div className="text-white/70 text-sm mb-2">Experience</div>
            <div className="text-2xl font-bold text-game-success">{experience}</div>
          </div>
          <div className="game-panel p-4 rounded-lg text-center">
            <div className="text-white/70 text-sm mb-2">Total Score</div>
            <div className="text-2xl font-bold text-game-secondary">{totalScore}</div>
          </div>
        </motion.div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="game-panel p-6 rounded-lg mb-6"
          >
            <h3 className="text-xl font-bold text-game-primary mb-4 flex items-center gap-2">
              <Award size={20} />
              Achievements Unlocked
            </h3>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement) => (
                <span
                  key={achievement}
                  className="px-3 py-1 bg-game-primary/20 border border-game-primary/50 rounded text-game-primary text-sm"
                >
                  {achievement.replace('-', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-game-primary/20 hover:bg-game-primary/30 border border-game-primary/50 rounded text-game-primary transition-all"
          >
            <ArrowLeft size={18} />
            Back to Cases
          </button>
          <button
            onClick={() => {
              const { resetGame } = useGameStore.getState()
              resetGame()
              onBack()
            }}
            className="flex items-center gap-2 px-6 py-3 bg-game-secondary/20 hover:bg-game-secondary/30 border border-game-secondary/50 rounded text-game-secondary transition-all"
          >
            <RotateCcw size={18} />
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  )
}

