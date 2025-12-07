'use client'

import { useState, useEffect } from 'react'
import ThreatOverview from '@/components/threats/ThreatOverview'
import ModuleStatus from '@/components/modules/ModuleStatus'
import IntelligenceFeed from '@/components/intelligence/IntelligenceFeed'
import StrategyPanel from '@/components/strategy/StrategyPanel'
import StatsGrid from '@/components/dashboard/StatsGrid'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const [threats, setThreats] = useState([
    {
      id: 1,
      type: 'social-media',
      platform: 'Bilibili',
      accountId: 'ACCOUNT_ID',
      riskScore: 75,
      threatLevel: 'High',
      status: 'active',
      detectedAt: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      type: 'social-media',
      platform: 'Twitter',
      accountId: 'username',
      riskScore: 45,
      threatLevel: 'Medium',
      status: 'monitoring',
      detectedAt: new Date(Date.now() - 7200000),
    },
    {
      id: 3,
      type: 'network',
      platform: 'Network',
      accountId: '192.168.1.100',
      riskScore: 60,
      threatLevel: 'Medium',
      status: 'blocked',
      detectedAt: new Date(Date.now() - 1800000),
    },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-cyber-primary text-2xl font-bold mb-2 glow-text">
          COMMAND CENTER
        </h2>
        <p className="text-terminal-text/70 text-sm">
          Real-time threat monitoring and defensive intelligence
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid threats={threats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Threats & Intelligence */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThreatOverview threats={threats} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <IntelligenceFeed />
          </motion.div>
        </div>

        {/* Right Column - Modules & Strategy */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ModuleStatus />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StrategyPanel threats={threats} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

