'use client'

import { AlertTriangle, Shield, Clock, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface Threat {
  id: number
  type: string
  platform: string
  accountId: string
  riskScore: number
  threatLevel: string
  status: string
  detectedAt: Date
}

interface ThreatOverviewProps {
  threats: Threat[]
}

export default function ThreatOverview({ threats }: ThreatOverviewProps) {
  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-cyber-danger border-cyber-danger'
      case 'medium':
        return 'text-cyber-warning border-cyber-warning'
      case 'low':
        return 'text-terminal-green border-terminal-green'
      default:
        return 'text-terminal-text border-terminal-text'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-cyber-danger'
      case 'blocked':
        return 'text-terminal-green'
      case 'monitoring':
        return 'text-cyber-warning'
      default:
        return 'text-terminal-text'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <div className="cyber-panel p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={20} className="text-cyber-warning" />
          <h3 className="text-cyber-primary text-lg font-bold">ACTIVE THREATS</h3>
        </div>
        <span className="text-terminal-text/70 text-sm">{threats.length} detected</span>
      </div>

      <div className="space-y-3">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-cyber-primary/20 rounded-lg p-4 hover:border-cyber-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-cyber-secondary" />
                  <span className="text-terminal-text font-medium">{threat.platform}</span>
                  <span className={`px-2 py-1 rounded text-xs border ${getThreatLevelColor(threat.threatLevel)}`}>
                    {threat.threatLevel.toUpperCase()}
                  </span>
                </div>
                <div className="text-terminal-text/70 text-sm mb-1">
                  Account: <span className="text-cyber-secondary font-mono">{threat.accountId}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-terminal-text/50">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {formatTimeAgo(threat.detectedAt)}
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(threat.status)}`}>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    {threat.status.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-1" style={{
                  color: threat.riskScore >= 70 ? '#ff0040' : threat.riskScore >= 40 ? '#ffaa00' : '#3fb950'
                }}>
                  {threat.riskScore}
                </div>
                <div className="text-terminal-text/50 text-xs">Risk Score</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-cyber-primary/10 flex gap-2">
              <button className="flex-1 px-3 py-2 bg-cyber-primary/10 hover:bg-cyber-primary/20 border border-cyber-primary/30 rounded text-cyber-primary text-sm transition-all">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 bg-cyber-secondary/10 hover:bg-cyber-secondary/20 border border-cyber-secondary/30 rounded text-cyber-secondary text-sm transition-all flex items-center justify-center gap-1">
                <ExternalLink size={14} />
                Generate Report
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

