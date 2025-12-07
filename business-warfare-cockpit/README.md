# Business Warfare Cockpit

> **Command Center for Autonomous Business Warfare Defense Platform**

A Next.js-based cyber-style dashboard providing real-time monitoring, threat intelligence, and defensive strategy visualization for the Autonomous Business Warfare Defense Platform.

## 🎯 Features

- **Real-time Threat Monitoring**: Live dashboard showing all active threats across attack vectors
- **Multi-Vector Intelligence**: Unified view of social media, cyber, financial, and legal threats
- **Threat Assessment**: Risk scoring and threat level visualization
- **Defensive Strategies**: AI-generated defensive recommendations
- **Evidence Documentation**: Automated evidence collection and reporting
- **Cyber Aesthetic UI**: Immersive terminal/hacker-style interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd business-warfare-cockpit
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Production Build

```bash
npm run build
npm start
```

## 🏗️ Architecture

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with cyber theme
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization
- **Lucide React**: Icon library

### Integration
- RESTful API endpoints for backend modules
- WebSocket support for real-time updates (planned)
- Integration with:
  - `social-media-red-team` module
  - `network-red-team` module (when available)
  - Future modules (financial, legal, etc.)

## 📁 Project Structure

```
business-warfare-cockpit/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── dashboard/        # Dashboard components
│   ├── threats/          # Threat visualization
│   ├── intelligence/     # Intelligence displays
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and helpers
├── types/                # TypeScript types
└── styles/               # Global styles
```

## 🎨 UI Theme

The cockpit uses a cyber/hacker aesthetic:
- Dark terminal-style background
- Neon green/cyan accent colors
- Monospace fonts
- Glowing effects and animations
- Matrix-style data displays

## 🔌 Backend Integration

The cockpit integrates with backend modules via API:

- **Social Media Red Team**: `/api/social-media/*`
- **Network Red Team**: `/api/network/*` (when available)
- **Orchestration**: `/api/orchestration/*` (planned)

## 📊 Dashboard Sections

1. **Command Center**: Overview of all active threats
2. **Threat Intelligence**: Detailed threat analysis
3. **Module Status**: Status of all defense modules
4. **Defensive Strategies**: AI-generated recommendations
5. **Evidence Archive**: Collected evidence and reports
6. **Activity Timeline**: Real-time activity feed

## 🛡️ Security

- Environment variables for sensitive configuration
- API authentication (to be implemented)
- Rate limiting on API endpoints
- Input validation and sanitization

## 📝 License

Part of the Autonomous Business Warfare Defense Platform. See main repository README for license information.

