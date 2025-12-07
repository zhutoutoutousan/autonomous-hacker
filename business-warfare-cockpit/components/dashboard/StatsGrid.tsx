'use client'

import { Shield, AlertTriangle, Activity, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatsGridProps {
  threats: any[]
}

export default function StatsGrid({ threats }: StatsGridProps) {
  const stats = [
    {
      label: 'Active Threats',
      value: threats.filter(t => t.status === 'active').length,
      total: threats.length,
      icon: AlertTriangle,
      color: 'text-cyber-danger',
      bgColor: 'bg-cyber-danger/10',
    },
    {
      label: 'Defense Modules',
      value: 1,
      total: 4,
      icon: Shield,
      color: 'text-cyber-primary',
      bgColor: 'bg-cyber-primary/10',
    },
    {
      label: 'Threats Blocked',
      value: threats.filter(t => t.status === 'blocked').length,
      total: threats.length,
      icon: Activity,
      color: 'text-terminal-green',
      bgColor: 'bg-terminal-green/10',
    },
    {
      label: 'Avg Risk Score',
      value: Math.round(threats.reduce((acc, t) => acc + t.riskScore, 0) / threats.length),
      total: 100,
      icon: TrendingUp,
      color: 'text-cyber-warning',
      bgColor: 'bg-cyber-warning/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const percentage = (stat.value / stat.total) * 100

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`cyber-panel p-4 rounded-lg ${stat.bgColor}`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon size={20} className={stat.color} />
              <span className="text-terminal-text/50 text-xs">
                {stat.value}/{stat.total}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1 glow-text" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-terminal-text/70 text-xs mb-2">{stat.label}</div>
            <div className="h-1 bg-cyber-dark rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                className={`h-full ${stat.color.replace('text-', 'bg-')}`}
                style={{
                  boxShadow: `0 0 10px ${stat.color.replace('text-', '')}`,
                }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

