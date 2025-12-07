'use client'

import { HistoricalCase } from '@/data/historicalCases'
import { motion } from 'framer-motion'
import { Calendar, Building2, Target, TrendingUp } from 'lucide-react'

interface CaseOverviewProps {
  case_: HistoricalCase
}

export default function CaseOverview({ case_: case_ }: CaseOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="game-panel p-6 rounded-lg mb-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-game-primary mb-2 glow-text">
            {case_.title}
          </h2>
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{case_.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 size={14} />
              <span>{case_.industry}</span>
            </div>
          </div>
        </div>
        <div className="px-3 py-1 bg-game-dark/50 border border-game-primary/30 rounded text-game-primary text-sm">
          {case_.difficulty.toUpperCase()}
        </div>
      </div>

      <p className="text-white/80 mb-6 leading-relaxed">
        {case_.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-white/70 text-sm mb-2">Companies Involved</div>
          <div className="flex flex-wrap gap-2">
            {case_.companies.map((company) => (
              <span
                key={company}
                className="px-3 py-1 bg-game-primary/10 border border-game-primary/30 rounded text-game-primary text-sm"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white/70 text-sm mb-2">Attack Vectors</div>
          <div className="flex flex-wrap gap-2">
            {case_.attackVectors.map((vector) => (
              <span
                key={vector}
                className="px-3 py-1 bg-game-secondary/10 border border-game-secondary/30 rounded text-game-secondary text-sm"
              >
                {vector}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Preview */}
      <div className="mt-4 pt-4 border-t border-game-primary/20">
        <div className="text-white/70 text-sm mb-2">Key Events Timeline</div>
        <div className="space-y-2">
          {case_.timeline.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-start gap-3 text-sm">
              <div className="text-game-primary font-mono text-xs mt-1 min-w-[60px]">
                {event.date}
              </div>
              <div className="flex-1 text-white/80">{event.event}</div>
              <div className={`px-2 py-1 rounded text-xs ${
                event.impact === 'critical' ? 'bg-game-danger/20 text-game-danger' :
                event.impact === 'high' ? 'bg-game-warning/20 text-game-warning' :
                'bg-game-success/20 text-game-success'
              }`}>
                {event.impact.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

