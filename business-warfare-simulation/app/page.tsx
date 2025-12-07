'use client'

import { useState } from 'react'
import CaseSelection from '@/components/cases/CaseSelection'
import SimulationGame from '@/components/game/SimulationGame'
import { HistoricalCase } from '@/data/historicalCases'
import { useGameStore } from '@/store/gameStore'

export default function Home() {
  const [selectedCase, setSelectedCase] = useState<HistoricalCase | null>(null)
  const { currentCase, startCase } = useGameStore()

  const handleCaseSelect = (case_: HistoricalCase) => {
    setSelectedCase(case_)
    startCase(case_)
  }

  const handleBack = () => {
    setSelectedCase(null)
  }

  if (currentCase || selectedCase) {
    return <SimulationGame onBack={handleBack} />
  }

  return (
    <div className="min-h-screen bg-game-darker">
      <CaseSelection onSelectCase={handleCaseSelect} />
    </div>
  )
}

