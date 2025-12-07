# Business Warfare Simulation

> **Gamified Business Warfare Training with Real Historical Case Studies**

An interactive, educational simulation platform that teaches business warfare strategies through real historical battles between enterprises. Learn from actual corporate conflicts, make strategic decisions, and understand the consequences.

## 🎯 Purpose

This simulation provides:

- **Educational Value**: Learn from real historical business warfare cases
- **Gamified Learning**: Interactive decision-making with scoring and achievements
- **Strategic Training**: Practice defending against multi-vector business attacks
- **Historical Context**: Understand how real companies handled competitive threats

## 🎮 Features

### Game Mechanics

- **Case-Based Learning**: Play through real historical business warfare scenarios
- **Decision Trees**: Make strategic choices and see consequences
- **Scoring System**: Earn points based on decision quality
- **Achievement System**: Unlock achievements for milestones
- **Progression**: Level up and gain experience
- **Difficulty Levels**: Beginner to Expert cases

### Historical Cases

Currently includes:

1. **Uber vs Lyft** (2012-2017)
   - Market manipulation, social media attacks, legal battles
   - Difficulty: Intermediate

2. **Apple vs Samsung** (2011-2018)
   - Patent wars, IP disputes, legal battles
   - Difficulty: Advanced

3. **Coca-Cola vs Pepsi** (1975-present)
   - Marketing wars, brand battles, market manipulation
   - Difficulty: Beginner

4. **Microsoft vs Google Cloud** (2010-present)
   - Cloud computing competition, enterprise battles
   - Difficulty: Advanced

5. **Tesla vs Traditional Automakers** (2010-present)
   - Industry disruption, regulatory battles, market manipulation
   - Difficulty: Intermediate

### Educational Content

Each case includes:

- **Historical Timeline**: Key events and their impact
- **Attack Vectors**: Types of attacks used
- **Decision Scenarios**: Strategic choices you must make
- **Outcomes**: What actually happened historically
- **Lessons Learned**: Key takeaways from each case

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd business-warfare-simulation
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to play.

### Production Build

```bash
npm run build
npm start
```

## 🎓 How to Play

1. **Select a Case**: Choose from available historical business warfare cases
2. **Read the Scenario**: Understand the historical context and situation
3. **Make Decisions**: Choose your strategy at each decision point
4. **See Consequences**: Understand the impact of your choices
5. **Learn from History**: Compare your decisions with actual outcomes
6. **Earn Points**: Score based on strategic quality
7. **Unlock Achievements**: Complete cases and reach milestones

## 📊 Scoring System

- **Score Range**: 0-100 per decision
- **Grading**:
  - S (80-100): Strategic Master
  - A (60-79): Excellent
  - B (40-59): Good
  - C (0-39): Needs Improvement

- **Experience Points**: Earned based on final score and case difficulty
- **Leveling**: Level up every 1000 experience points

## 🏆 Achievements

- **First Victory**: Complete your first case
- **Strategic Master**: Score 80+ on a decision
- **War Veteran**: Complete 5+ cases
- **Perfect Strategy**: Score 80+ on a complete case

## 🏗️ Architecture

### Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Zustand**: State management
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling with game theme
- **Lucide React**: Icons

### Project Structure

```
business-warfare-simulation/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── cases/            # Case selection
│   └── game/             # Game components
├── data/                 # Historical case data
│   └── historicalCases.ts
├── store/                # State management
│   └── gameStore.ts
└── types/                # TypeScript types
```

## 📚 Adding New Cases

To add a new historical case:

1. Edit `data/historicalCases.ts`
2. Add a new `HistoricalCase` object with:
   - Case details (title, companies, year, industry)
   - Timeline of events
   - Decision scenarios with options
   - Historical outcomes
   - Lessons learned
3. The case will automatically appear in the case selection

## 🎨 Design

The simulation uses a cyber/game aesthetic:

- Dark backgrounds
- Neon green/cyan accents
- Glowing effects
- Terminal-style typography
- Game panel UI elements

## 🔗 Integration

This simulation complements the Business Warfare Defense Platform:

- Learn from history in the simulation
- Apply strategies in the real defense platform
- Understand attack patterns
- Practice defensive decision-making

## 📝 License

Part of the Autonomous Business Warfare Defense Platform. See main repository README for license information.

## 🎯 Educational Goals

- Understand real business warfare tactics
- Learn defensive strategies from history
- Practice decision-making under pressure
- Recognize attack patterns
- Develop strategic thinking skills

---

**Learn from History. Prepare for Battle. Defend Your Business.**

