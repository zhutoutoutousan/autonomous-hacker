export interface HistoricalCase {
  id: string
  title: string
  companies: string[]
  year: number
  industry: string
  attackVectors: string[]
  description: string
  timeline: TimelineEvent[]
  decisions: Decision[]
  outcomes: Outcome[]
  lessons: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface TimelineEvent {
  date: string
  event: string
  impact: 'low' | 'medium' | 'high' | 'critical'
}

export interface Decision {
  id: string
  scenario: string
  options: DecisionOption[]
  correctOption?: string
  explanation: string
}

export interface DecisionOption {
  id: string
  text: string
  consequences: string[]
  score: number
}

export interface Outcome {
  winner: string
  loser: string
  result: string
  longTermImpact: string
}

export const historicalCases: HistoricalCase[] = [
  {
    id: 'uber-vs-lyft-2010s',
    title: 'Uber vs Lyft: The Ride-Sharing War',
    companies: ['Uber', 'Lyft'],
    year: 2012,
    industry: 'Transportation',
    attackVectors: ['market-manipulation', 'social-media', 'legal', 'financial'],
    description: 'The intense competition between Uber and Lyft involved aggressive market tactics, driver poaching, pricing wars, and legal battles across multiple jurisdictions.',
    timeline: [
      { date: '2012', event: 'Uber launches aggressive expansion', impact: 'high' },
      { date: '2013', event: 'Lyft enters market with friendly branding', impact: 'medium' },
      { date: '2014', event: 'Uber launches "Operation SLOG" to sabotage Lyft', impact: 'critical' },
      { date: '2015', event: 'Price wars and driver incentive battles', impact: 'high' },
      { date: '2017', event: 'Legal battles over driver classification', impact: 'critical' },
    ],
    decisions: [
      {
        id: 'd1',
        scenario: 'You are Lyft\'s CEO. Uber has launched a coordinated campaign to cancel thousands of Lyft rides using fake accounts. What do you do?',
        options: [
          {
            id: 'o1',
            text: 'Launch counter-attack: Cancel Uber rides using similar tactics',
            consequences: ['Escalates conflict', 'Legal risks', 'Brand damage'],
            score: 20,
          },
          {
            id: 'o2',
            text: 'Document evidence, file legal complaint, and launch PR campaign exposing tactics',
            consequences: ['Legal protection', 'Public support', 'Regulatory attention'],
            score: 90,
          },
          {
            id: 'o3',
            text: 'Ignore and focus on product improvement',
            consequences: ['Continued attacks', 'Market share loss', 'No defense'],
            score: 30,
          },
        ],
        correctOption: 'o2',
        explanation: 'Documenting evidence and using legal/PR channels is the most effective defense. Counter-attacks escalate conflict and damage brand reputation.',
      },
    ],
    outcomes: [
      {
        winner: 'Uber (initially)',
        loser: 'Lyft (initially)',
        result: 'Uber gained significant market share through aggressive tactics, but faced regulatory backlash and reputation damage',
        longTermImpact: 'Both companies faced regulatory scrutiny. Uber\'s aggressive tactics led to CEO resignation and company restructuring.',
      },
    ],
    lessons: [
      'Aggressive market tactics can backfire with regulatory and reputation consequences',
      'Legal documentation is crucial for defense',
      'Public relations and transparency can turn attacks into opportunities',
      'Short-term market gains may not justify long-term brand damage',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'apple-vs-samsung-patent',
    title: 'Apple vs Samsung: The Patent War',
    companies: ['Apple', 'Samsung'],
    year: 2011,
    industry: 'Technology',
    attackVectors: ['legal', 'ip-disputes', 'market-manipulation'],
    description: 'One of the largest patent battles in tech history, involving design patents, utility patents, and trade dress across multiple countries.',
    timeline: [
      { date: '2011', event: 'Apple files patent lawsuit against Samsung', impact: 'critical' },
      { date: '2012', event: 'Jury awards Apple $1.05 billion in damages', impact: 'critical' },
      { date: '2013', event: 'Damages reduced, appeals process begins', impact: 'high' },
      { date: '2018', event: 'Settlement reached after 7 years of litigation', impact: 'high' },
    ],
    decisions: [
      {
        id: 'd2',
        scenario: 'You are Samsung\'s legal team. Apple has filed a patent lawsuit claiming your devices infringe on design patents. How do you respond?',
        options: [
          {
            id: 'o4',
            text: 'Counter-sue with your own patent portfolio',
            consequences: ['Mutual destruction', 'Legal costs', 'Innovation slowdown'],
            score: 70,
          },
          {
            id: 'o5',
            text: 'Settle immediately to avoid litigation',
            consequences: ['Quick resolution', 'Potential weakness signal', 'Cost savings'],
            score: 40,
          },
          {
            id: 'o6',
            text: 'Fight aggressively, challenge patent validity, and file countersuits',
            consequences: ['Long legal battle', 'High costs', 'Market uncertainty'],
            score: 60,
          },
        ],
        correctOption: 'o4',
        explanation: 'Counter-suing with a strong patent portfolio creates mutual deterrence and negotiating leverage, though it escalates costs.',
      },
    ],
    outcomes: [
      {
        winner: 'Apple (legal victory)',
        loser: 'Samsung (legal loss)',
        result: 'Apple won initial verdict but damages were reduced. Both companies continued competing successfully.',
        longTermImpact: 'The case highlighted the importance of IP strategy. Both companies strengthened their patent portfolios and continue to compete.',
      },
    ],
    lessons: [
      'IP strategy is crucial for competitive defense',
      'Legal battles can last years and cost billions',
      'Patent portfolios provide negotiation leverage',
      'Market competition can continue despite legal disputes',
    ],
    difficulty: 'advanced',
  },
  {
    id: 'coca-cola-vs-pepsi',
    title: 'Coca-Cola vs Pepsi: The Cola Wars',
    companies: ['Coca-Cola', 'Pepsi'],
    year: 1975,
    industry: 'Beverages',
    attackVectors: ['marketing', 'market-manipulation', 'social-media', 'business'],
    description: 'Decades-long marketing and business warfare including taste tests, celebrity endorsements, market exclusivity deals, and aggressive advertising campaigns.',
    timeline: [
      { date: '1975', event: 'Pepsi Challenge taste test campaign', impact: 'high' },
      { date: '1985', event: 'Coca-Cola introduces "New Coke" (backfires)', impact: 'critical' },
      { date: '1990s', event: 'Exclusive distribution deals and market battles', impact: 'high' },
      { date: '2000s', event: 'Social media and digital marketing wars', impact: 'medium' },
    ],
    decisions: [
      {
        id: 'd3',
        scenario: 'You are Coca-Cola\'s marketing director. Pepsi has launched the "Pepsi Challenge" showing consumers prefer Pepsi in blind taste tests. Market share is declining. What do you do?',
        options: [
          {
            id: 'o7',
            text: 'Change the formula to be sweeter like Pepsi',
            consequences: ['Formula change', 'Consumer backlash risk', 'Brand identity risk'],
            score: 30,
          },
          {
            id: 'o8',
            text: 'Launch counter-marketing emphasizing brand heritage and emotional connection',
            consequences: ['Brand reinforcement', 'Market stability', 'Consumer loyalty'],
            score: 80,
          },
          {
            id: 'o9',
            text: 'Ignore and focus on distribution and pricing',
            consequences: ['Continued market share loss', 'Missed opportunity', 'Weak response'],
            score: 40,
          },
        ],
        correctOption: 'o8',
        explanation: 'Brand heritage and emotional connection often outweigh taste preferences. Changing the formula (as happened with New Coke) can backfire catastrophically.',
      },
    ],
    outcomes: [
      {
        winner: 'Both (coexistence)',
        loser: 'Neither',
        result: 'Both companies maintained strong market positions through different strategies. The "war" continues but both thrive.',
        longTermImpact: 'The cola wars demonstrated that intense competition can benefit both companies by expanding the market and driving innovation.',
      },
    ],
    lessons: [
      'Brand emotional connection can overcome functional disadvantages',
      'Market share battles can expand the overall market',
      'Formula changes risk alienating core customers',
      'Coexistence and differentiation can be more valuable than elimination',
    ],
    difficulty: 'beginner',
  },
  {
    id: 'microsoft-vs-google-cloud',
    title: 'Microsoft vs Google: Cloud Computing Battle',
    companies: ['Microsoft', 'Google'],
    year: 2010,
    industry: 'Technology',
    attackVectors: ['business', 'legal', 'market-manipulation', 'cyber'],
    description: 'Intense competition in cloud computing, involving enterprise contracts, pricing wars, feature battles, and accusations of unfair practices.',
    timeline: [
      { date: '2010', event: 'Google Cloud Platform launches', impact: 'medium' },
      { date: '2013', event: 'Microsoft Azure aggressive enterprise push', impact: 'high' },
      { date: '2017', event: 'Price wars and feature competition', impact: 'high' },
      { date: '2020', event: 'Accusations of unfair contract practices', impact: 'medium' },
    ],
    decisions: [
      {
        id: 'd4',
        scenario: 'You are Google Cloud\'s strategy lead. Microsoft is using its enterprise relationships and bundling Azure with Office 365 to gain market share. What is your strategy?',
        options: [
          {
            id: 'o10',
            text: 'Match Microsoft\'s bundling strategy with Google Workspace',
            consequences: ['Competitive response', 'Resource allocation', 'Feature parity'],
            score: 75,
          },
          {
            id: 'o11',
            text: 'Focus on technical superiority and developer experience',
            consequences: ['Differentiation', 'Developer loyalty', 'Niche strength'],
            score: 70,
          },
          {
            id: 'o12',
            text: 'File antitrust complaint about bundling practices',
            consequences: ['Legal action', 'Regulatory attention', 'Potential remedy'],
            score: 60,
          },
        ],
        correctOption: 'o10',
        explanation: 'Competitive bundling is often necessary in enterprise markets, though technical differentiation remains important.',
      },
    ],
    outcomes: [
      {
        winner: 'Microsoft (market share)',
        loser: 'Google (market share)',
        result: 'Microsoft gained significant enterprise market share through bundling and relationships, though Google maintained strong technical position',
        longTermImpact: 'The cloud market remains highly competitive with multiple strong players. Enterprise relationships proved crucial.',
      },
    ],
    lessons: [
      'Enterprise relationships and bundling are powerful competitive tools',
      'Technical superiority alone may not win enterprise markets',
      'Multi-product ecosystems provide competitive advantages',
      'Market can support multiple strong competitors',
    ],
    difficulty: 'advanced',
  },
  {
    id: 'tesla-vs-traditional-auto',
    title: 'Tesla vs Traditional Automakers: Electric Vehicle Disruption',
    companies: ['Tesla', 'Traditional Automakers'],
    year: 2010,
    industry: 'Automotive',
    attackVectors: ['business', 'legal', 'social-media', 'financial'],
    description: 'Tesla disrupted the automotive industry while facing attacks from traditional automakers through dealer franchise laws, safety accusations, and market manipulation.',
    timeline: [
      { date: '2010', event: 'Tesla Model S launch disrupts market', impact: 'high' },
      { date: '2013', event: 'Dealer franchise law battles begin', impact: 'critical' },
      { date: '2018', event: 'Traditional automakers launch EV programs', impact: 'high' },
      { date: '2020', event: 'Market manipulation accusations and short attacks', impact: 'medium' },
    ],
    decisions: [
      {
        id: 'd5',
        scenario: 'You are Tesla\'s legal team. Traditional automakers are using state dealer franchise laws to block Tesla\'s direct sales model. How do you respond?',
        options: [
          {
            id: 'o13',
            text: 'Fight state-by-state legal battles',
            consequences: ['Long legal process', 'High costs', 'State-by-state wins'],
            score: 70,
          },
          {
            id: 'o14',
            text: 'Lobby for federal legislation to override state laws',
            consequences: ['Federal solution', 'Political challenges', 'Comprehensive fix'],
            score: 65,
          },
          {
            id: 'o15',
            text: 'Use social media and public pressure to change laws',
            consequences: ['Public support', 'Political pressure', 'Brand building'],
            score: 75,
          },
        ],
        correctOption: 'o15',
        explanation: 'Combining legal action with public pressure and social media created political momentum that helped overcome dealer franchise barriers.',
      },
    ],
    outcomes: [
      {
        winner: 'Tesla',
        loser: 'Traditional Automakers (initially)',
        result: 'Tesla successfully disrupted the market and forced traditional automakers to accelerate EV development',
        longTermImpact: 'The entire automotive industry shifted toward electric vehicles. Tesla\'s success forced industry-wide transformation.',
      },
    ],
    lessons: [
      'Disruption requires challenging established regulatory frameworks',
      'Public pressure and social media can overcome legal barriers',
      'First-mover advantage in disruption can be significant',
      'Established players eventually adapt and compete',
    ],
    difficulty: 'intermediate',
  },
]

export function getCaseById(id: string): HistoricalCase | undefined {
  return historicalCases.find(case_ => case_.id === id)
}

export function getCasesByDifficulty(difficulty: string): HistoricalCase[] {
  return historicalCases.filter(case_ => case_.difficulty === difficulty)
}

export function getAllCases(): HistoricalCase[] {
  return historicalCases
}

