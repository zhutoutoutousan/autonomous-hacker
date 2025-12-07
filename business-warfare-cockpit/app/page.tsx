'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/dashboard/Dashboard'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-darker">
        <div className="text-center">
          <div className="text-cyber-primary text-4xl mb-4 glow-text animate-pulse">
            INITIALIZING DEFENSE SYSTEMS...
          </div>
          <div className="text-terminal-text text-sm">
            Loading Business Warfare Cockpit
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-darker grid-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

