'use client'

import { Shield, Activity, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <header className="border-b border-cyber-primary/30 bg-cyber-dark/50 backdrop-blur-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-cyber-primary"
          >
            <Shield size={32} />
          </motion.div>
          <div>
            <h1 className="text-cyber-primary text-xl font-bold glow-text">
              BUSINESS WARFARE COCKPIT
            </h1>
            <p className="text-terminal-text text-xs">
              Autonomous Defense Command Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-terminal-green animate-pulse" />
            <span className="text-terminal-text text-sm">SYSTEM ONLINE</span>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-cyber-warning" />
            <span className="text-terminal-text text-sm">3 ACTIVE THREATS</span>
          </div>

          <div className="text-cyber-secondary text-sm font-mono">
            {currentTime}
          </div>
        </div>
      </div>
    </header>
  )
}

