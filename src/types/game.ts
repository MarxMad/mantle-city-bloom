
export interface Building {
  id: string;
  type: BuildingType;
  level: number;
  x: number;
  y: number;
  yieldRate: number;
  cost: number;
  lastHarvest: number;
  isActive: boolean;
}

export interface BuildingType {
  id: string;
  name: string;
  description: string;
  baseYield: number;
  baseCost: number;
  icon: string;
  color: string;
  category: 'defi' | 'infrastructure' | 'special';
  riskLevel: number; // 1-5, affects event vulnerability
}

export interface GameState {
  tokens: number;
  weeklyRevenue: number;
  totalBuildings: number;
  cityLevel: number;
  weekNumber: number;
  reputation: number;
  lastUpdate: number;
}

export interface EconomicEvent {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  duration: number; // in game ticks
  effects: EventEffect[];
  probability: number;
}

export interface EventEffect {
  targetType: 'all' | 'category' | 'specific';
  target: string;
  modifier: number; // multiplier for yield rate
  description: string;
}

export interface GridCell {
  x: number;
  y: number;
  building: Building | null;
  isHighlighted: boolean;
}
