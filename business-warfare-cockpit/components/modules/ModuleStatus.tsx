'use client'

import { Shield, Network, DollarSign, Scale, CheckCircle, XCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const modules = [
  {
    id: 'social-media',
    name: 'Social Media Defense',
    icon: Shield,
    status: 'online',
    description: 'OSINT intelligence gathering and threat analysis',
    capabilities: ['Multi-platform OSINT', 'Threat Assessment', 'Evidence Collection'],
    lastActivity: '2 minutes ago',
  },
  {
    id: 'network',
    name: 'Network Defense',
    icon: Network,
    status: 'offline',
    description: 'Cyber attack detection and response',
    capabilities: ['Intrusion Detection', 'Threat Analysis', 'Auto Response'],
    lastActivity: 'N/A',
  },
  {
    id: 'financial',
    name: 'Financial Defense',
    icon: DollarSign,
    status: 'coming-soon',
    description: 'Financial manipulation monitoring',
    capabilities: ['Market Monitoring', 'Fraud Detection', 'Regulatory Alerts'],
    lastActivity: 'N/A',
  },
  {
    id: 'legal',
    name: 'Legal Defense',
    icon: Scale,
    status: 'coming-soon',
    description: 'Legal attack tracking and response',
    capabilities: ['Case Tracking', 'Document Generation', 'Compliance Monitoring'],
    lastActivity: 'N/A',
  },
]

export default function ModuleStatus() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return CheckCircle
      case 'offline':
        return XCircle
      case 'coming-soon':
        return Clock
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-terminal-green border-terminal-green'
      case 'offline':
        return 'text-terminal-text/50 border-terminal-text/30'
      case 'coming-soon':
        return 'text-cyber-warning border-cyber-warning'
      default:
        return 'text-terminal-text border-terminal-text'
    }
  }

  return (
    <div className="cyber-panel p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-cyber-primary text-lg font-bold">DEFENSE MODULES</h3>
        <span className="text-terminal-text/70 text-sm">
          {modules.filter(m => m.status === 'online').length}/{modules.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {modules.map((module, index) => {
          const Icon = module.icon
          const StatusIcon = getStatusIcon(module.status)
          const statusColor = getStatusColor(module.status)

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border rounded-lg p-4 ${statusColor.split(' ')[1]} ${
                module.status === 'online' ? 'bg-terminal-green/5' : 'bg-cyber-dark/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={18} className={statusColor.split(' ')[0]} />
                  <span className="text-terminal-text font-medium text-sm">{module.name}</span>
                </div>
                <StatusIcon size={16} className={statusColor.split(' ')[0]} />
              </div>

              <p className="text-terminal-text/70 text-xs mb-3">{module.description}</p>

              <div className="flex flex-wrap gap-1 mb-2">
                {module.capabilities.map((cap, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-cyber-dark/50 border border-cyber-primary/20 rounded text-xs text-terminal-text/70"
                  >
                    {cap}
                  </span>
                ))}
              </div>

              <div className="text-terminal-text/50 text-xs">
                Last Activity: {module.lastActivity}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

