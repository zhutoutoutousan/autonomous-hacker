export interface Threat {
  id: number
  type: 'social-media' | 'network' | 'financial' | 'legal'
  platform: string
  accountId: string
  riskScore: number
  threatLevel: 'Low' | 'Medium' | 'High'
  status: 'active' | 'blocked' | 'monitoring' | 'resolved'
  detectedAt: Date
  lastActivity?: Date
  description?: string
}

export interface DefenseModule {
  id: string
  name: string
  status: 'online' | 'offline' | 'coming-soon'
  description: string
  capabilities: string[]
  lastActivity: string
}

export interface IntelligenceItem {
  id: number
  type: 'threat' | 'analysis' | 'report' | 'activity'
  title: string
  description: string
  timestamp: string
  severity?: 'low' | 'medium' | 'high'
}

export interface DefensiveStrategy {
  priority: 'immediate' | 'short-term' | 'long-term' | 'monitoring'
  title: string
  description: string
  actions: string[]
  threatIds: number[]
}

export interface Stats {
  activeThreats: number
  totalThreats: number
  defenseModules: number
  totalModules: number
  threatsBlocked: number
  avgRiskScore: number
}

