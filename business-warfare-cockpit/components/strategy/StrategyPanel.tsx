'use client'

import { Shield, AlertTriangle, FileText, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface StrategyPanelProps {
  threats: any[]
}

export default function StrategyPanel({ threats }: StrategyPanelProps) {
  const strategies = [
    {
      priority: 'immediate',
      title: 'Block and Report',
      description: 'Block identified accounts and report to platform moderators',
      actions: ['Block accounts', 'Report to platforms', 'Document evidence'],
      icon: Shield,
    },
    {
      priority: 'short-term',
      title: 'Legal Documentation',
      description: 'Prepare evidence package for potential legal action',
      actions: ['Collect evidence', 'Generate reports', 'Consult legal counsel'],
      icon: FileText,
    },
    {
      priority: 'monitoring',
      title: 'Continuous Monitoring',
      description: 'Monitor for escalation and new attack vectors',
      actions: ['Set up alerts', 'Track activity', 'Update threat assessment'],
      icon: AlertTriangle,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'immediate':
        return 'text-cyber-danger border-cyber-danger'
      case 'short-term':
        return 'text-cyber-warning border-cyber-warning'
      case 'monitoring':
        return 'text-cyber-secondary border-cyber-secondary'
      default:
        return 'text-terminal-text border-terminal-text'
    }
  }

  return (
    <div className="cyber-panel p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-cyber-primary" />
          <h3 className="text-cyber-primary text-lg font-bold">DEFENSIVE STRATEGIES</h3>
        </div>
        <span className="text-terminal-text/70 text-xs">AI-Generated</span>
      </div>

      <div className="space-y-3">
        {strategies.map((strategy, index) => {
          const Icon = strategy.icon
          const priorityColor = getPriorityColor(strategy.priority)

          return (
            <motion.div
              key={strategy.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border rounded-lg p-4 ${priorityColor.split(' ')[1]} bg-cyber-dark/30`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={16} className={priorityColor.split(' ')[0]} />
                  <span className="text-terminal-text font-medium text-sm">{strategy.title}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded border ${priorityColor}`}>
                  {strategy.priority.toUpperCase()}
                </span>
              </div>

              <p className="text-terminal-text/70 text-xs mb-3">{strategy.description}</p>

              <div className="space-y-1">
                {strategy.actions.map((action, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-terminal-text/60">
                    <div className="w-1 h-1 rounded-full bg-cyber-primary" />
                    {action}
                  </div>
                ))}
              </div>

              <button className="mt-3 w-full px-3 py-2 bg-cyber-primary/10 hover:bg-cyber-primary/20 border border-cyber-primary/30 rounded text-cyber-primary text-xs transition-all flex items-center justify-center gap-1">
                <ExternalLink size={12} />
                Execute Strategy
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

