import { create } from 'zustand'
import { HistoricalCase, Decision } from '@/data/historicalCases'

export interface GameState {
  currentCase: HistoricalCase | null
  currentDecisionIndex: number
  score: number
  totalScore: number
  decisions: Record<string, string> // decisionId -> optionId
  completedCases: string[]
  achievements: string[]
  level: number
  experience: number
}

interface GameActions {
  startCase: (case_: HistoricalCase) => void
  makeDecision: (decisionId: string, optionId: string) => void
  completeCase: () => void
  resetGame: () => void
  unlockAchievement: (achievement: string) => void
  addExperience: (amount: number) => void
}

const initialState: GameState = {
  currentCase: null,
  currentDecisionIndex: 0,
  score: 0,
  totalScore: 0,
  decisions: {},
  completedCases: [],
  achievements: [],
  level: 1,
  experience: 0,
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  startCase: (case_) => {
    set({
      currentCase: case_,
      currentDecisionIndex: 0,
      score: 0,
      decisions: {},
    })
  },

  makeDecision: (decisionId: string, optionId: string) => {
    const state = get()
    const decision = state.currentCase?.decisions.find(d => d.id === decisionId)
    const option = decision?.options.find(o => o.id === optionId)
    
    if (!decision || !option) return

    const newScore = state.score + option.score
    const newDecisions = { ...state.decisions, [decisionId]: optionId }
    const newDecisionIndex = state.currentDecisionIndex + 1

    set({
      score: newScore,
      decisions: newDecisions,
      currentDecisionIndex: newDecisionIndex,
    })

    // Check for achievements
    if (option.score >= 80) {
      get().unlockAchievement('strategic-master')
    }
  },

  completeCase: () => {
    const state = get()
    if (!state.currentCase) return

    const finalScore = state.score
    const totalScore = state.totalScore + finalScore
    const completedCases = [...state.completedCases, state.currentCase.id]
    
    // Calculate experience (score * difficulty multiplier)
    const difficultyMultiplier = {
      beginner: 1,
      intermediate: 1.5,
      advanced: 2,
      expert: 3,
    }[state.currentCase.difficulty] || 1

    const experienceGained = Math.floor(finalScore * difficultyMultiplier)
    const newExperience = state.experience + experienceGained
    const newLevel = Math.floor(newExperience / 1000) + 1

    set({
      totalScore: totalScore,
      completedCases: completedCases,
      experience: newExperience,
      level: newLevel,
      currentCase: null,
      currentDecisionIndex: 0,
      score: 0,
      decisions: {},
    })

    // Check for achievements
    if (completedCases.length === 1) {
      get().unlockAchievement('first-victory')
    }
    if (completedCases.length >= 5) {
      get().unlockAchievement('war-veteran')
    }
    if (finalScore >= 80) {
      get().unlockAchievement('perfect-strategy')
    }
  },

  resetGame: () => {
    set(initialState)
  },

  unlockAchievement: (achievement: string) => {
    const state = get()
    if (!state.achievements.includes(achievement)) {
      set({
        achievements: [...state.achievements, achievement],
      })
    }
  },

  addExperience: (amount: number) => {
    const state = get()
    const newExperience = state.experience + amount
    const newLevel = Math.floor(newExperience / 1000) + 1
    
    set({
      experience: newExperience,
      level: newLevel,
    })
  },
}))

