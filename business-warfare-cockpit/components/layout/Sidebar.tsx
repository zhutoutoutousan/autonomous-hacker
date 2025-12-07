'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  Shield, 
  Network, 
  DollarSign, 
  Scale, 
  Activity,
  FileText,
  Settings
} from 'lucide-react'
import { motion } from 'framer-motion'

const menuItems = [
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, active: true },
  { id: 'social', label: 'Social Media Defense', icon: Shield, status: 'online' },
  { id: 'network', label: 'Network Defense', icon: Network, status: 'offline' },
  { id: 'financial', label: 'Financial Defense', icon: DollarSign, status: 'coming-soon' },
  { id: 'legal', label: 'Legal Defense', icon: Scale, status: 'coming-soon' },
  { id: 'intelligence', label: 'Threat Intelligence', icon: Activity },
  { id: 'reports', label: 'Evidence Archive', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard')

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online':
        return 'text-terminal-green'
      case 'offline':
        return 'text-terminal-text/50'
      case 'coming-soon':
        return 'text-cyber-warning'
      default:
        return 'text-terminal-text'
    }
  }

  return (
    <aside className="w-64 bg-cyber-dark/80 border-r border-cyber-primary/30 h-[calc(100vh-73px)] overflow-y-auto">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              whileHover={{ x: 4 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-cyber-primary/20 border border-cyber-primary/50 text-cyber-primary'
                  : 'text-terminal-text hover:bg-cyber-dark hover:text-cyber-secondary'
              }`}
            >
              <Icon size={20} className={getStatusColor(item.status)} />
              <span className="text-sm font-medium">{item.label}</span>
              {item.status && (
                <span className={`ml-auto text-xs ${getStatusColor(item.status)}`}>
                  {item.status === 'coming-soon' ? 'SOON' : item.status.toUpperCase()}
                </span>
              )}
            </motion.button>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-cyber-primary/20">
        <div className="cyber-panel p-4 rounded-lg">
          <div className="text-xs text-terminal-text/70 mb-2">SYSTEM STATUS</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-terminal-text">Modules Active</span>
              <span className="text-terminal-green">1/4</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-terminal-text">Threats Detected</span>
              <span className="text-cyber-warning">3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-terminal-text">Defense Level</span>
              <span className="text-cyber-primary">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

