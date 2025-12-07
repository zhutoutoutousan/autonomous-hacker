'use client'

import { Activity, AlertCircle, FileText, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const intelligenceItems = [
  {
    id: 1,
    type: 'threat',
    title: 'New threat detected on Bilibili',
    description: 'Account ACCOUNT_ID showing coordinated attack patterns',
    timestamp: '5 minutes ago',
    icon: AlertCircle,
    color: 'text-cyber-danger',
  },
  {
    id: 2,
    type: 'analysis',
    title: 'Threat assessment completed',
    description: 'Risk score: 75/100 - High threat level identified',
    timestamp: '12 minutes ago',
    icon: TrendingUp,
    color: 'text-cyber-warning',
  },
  {
    id: 3,
    type: 'report',
    title: 'Intelligence report generated',
    description: 'Evidence documentation ready for legal review',
    timestamp: '18 minutes ago',
    icon: FileText,
    color: 'text-cyber-secondary',
  },
  {
    id: 4,
    type: 'activity',
    title: 'Defensive strategy updated',
    description: 'AI-generated recommendations based on threat analysis',
    timestamp: '25 minutes ago',
    icon: Activity,
    color: 'text-terminal-green',
  },
]

export default function IntelligenceFeed() {
  return (
    <div className="cyber-panel p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-cyber-secondary" />
          <h3 className="text-cyber-primary text-lg font-bold">INTELLIGENCE FEED</h3>
        </div>
        <span className="text-terminal-text/70 text-sm">Live Updates</span>
      </div>

      <div className="space-y-3">
        {intelligenceItems.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-l-2 border-cyber-primary/30 pl-4 py-2 hover:border-cyber-primary/60 transition-all"
            >
              <div className="flex items-start gap-3">
                <Icon size={16} className={`${item.color} mt-1`} />
                <div className="flex-1">
                  <div className="text-terminal-text text-sm font-medium mb-1">
                    {item.title}
                  </div>
                  <div className="text-terminal-text/70 text-xs mb-2">
                    {item.description}
                  </div>
                  <div className="text-terminal-text/50 text-xs">
                    {item.timestamp}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-cyber-primary/20">
        <button className="w-full px-4 py-2 bg-cyber-primary/10 hover:bg-cyber-primary/20 border border-cyber-primary/30 rounded text-cyber-primary text-sm transition-all">
          View Full Intelligence Archive
        </button>
      </div>
    </div>
  )
}

