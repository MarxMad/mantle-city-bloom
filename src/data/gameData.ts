
import { BuildingType, EconomicEvent } from '../types/game';

export const BUILDING_TYPES: BuildingType[] = [
  {
    id: 'dex',
    name: 'DEX Exchange',
    description: 'Automated market maker generating fees from trades',
    baseYield: 15,
    baseCost: 100,
    icon: '🔄',
    color: 'bg-defi-cyan',
    category: 'defi',
    riskLevel: 3
  },
  {
    id: 'lending',
    name: 'Lending Pool',
    description: 'Earn interest by providing liquidity to borrowers',
    baseYield: 12,
    baseCost: 150,
    icon: '🏦',
    color: 'bg-defi-blue',
    category: 'defi',
    riskLevel: 2
  },
  {
    id: 'stablecoin',
    name: 'Stablecoin Mint',
    description: 'Generate stable returns with minimal risk',
    baseYield: 8,
    baseCost: 80,
    icon: '💰',
    color: 'bg-defi-green',
    category: 'defi',
    riskLevel: 1
  },
  {
    id: 'nft-market',
    name: 'NFT Marketplace',
    description: 'Earn fees from NFT trades and royalties',
    baseYield: 20,
    baseCost: 200,
    icon: '🖼️',
    color: 'bg-defi-purple',
    category: 'defi',
    riskLevel: 4
  },
  {
    id: 'yield-farm',
    name: 'Yield Farm',
    description: 'High-risk, high-reward liquidity mining',
    baseYield: 35,
    baseCost: 300,
    icon: '🌾',
    color: 'bg-defi-gold',
    category: 'defi',
    riskLevel: 5
  },
  {
    id: 'validator',
    name: 'Validator Node',
    description: 'Secure the network and earn staking rewards',
    baseYield: 18,
    baseCost: 250,
    icon: '🛡️',
    color: 'bg-blue-600',
    category: 'infrastructure',
    riskLevel: 2
  }
];

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: 'bull-market',
    title: 'Bull Market Rally',
    description: 'Market sentiment is extremely positive! All DeFi protocols see increased activity.',
    type: 'positive',
    duration: 10,
    effects: [
      {
        targetType: 'category',
        target: 'defi',
        modifier: 1.5,
        description: '+50% yield for all DeFi buildings'
      }
    ],
    probability: 0.15
  },
  {
    id: 'bear-market',
    title: 'Market Correction',
    description: 'The market is experiencing a downturn. DeFi activity decreases significantly.',
    type: 'negative',
    duration: 15,
    effects: [
      {
        targetType: 'category',
        target: 'defi',
        modifier: 0.6,
        description: '-40% yield for all DeFi buildings'
      }
    ],
    probability: 0.12
  },
  {
    id: 'hack-attack',
    title: 'Security Breach',
    description: 'A major protocol has been hacked! High-risk DeFi buildings are temporarily affected.',
    type: 'negative',
    duration: 8,
    effects: [
      {
        targetType: 'specific',
        target: 'yield-farm',
        modifier: 0.2,
        description: '-80% yield for Yield Farms'
      },
      {
        targetType: 'specific',
        target: 'nft-market',
        modifier: 0.5,
        description: '-50% yield for NFT Marketplaces'
      }
    ],
    probability: 0.08
  },
  {
    id: 'regulation-news',
    title: 'Favorable Regulation',
    description: 'New crypto-friendly regulations boost confidence in the ecosystem.',
    type: 'positive',
    duration: 12,
    effects: [
      {
        targetType: 'all',
        target: '',
        modifier: 1.25,
        description: '+25% yield for all buildings'
      }
    ],
    probability: 0.1
  },
  {
    id: 'gas-spike',
    title: 'Network Congestion',
    description: 'High gas fees are affecting transaction volume across all protocols.',
    type: 'negative',
    duration: 6,
    effects: [
      {
        targetType: 'specific',
        target: 'dex',
        modifier: 0.7,
        description: '-30% yield for DEX Exchanges'
      }
    ],
    probability: 0.15
  },
  {
    id: 'innovation-boost',
    title: 'Protocol Innovation',
    description: 'New DeFi innovations are attracting massive capital inflows.',
    type: 'positive',
    duration: 8,
    effects: [
      {
        targetType: 'specific',
        target: 'lending',
        modifier: 1.8,
        description: '+80% yield for Lending Pools'
      },
      {
        targetType: 'specific',
        target: 'dex',
        modifier: 1.4,
        description: '+40% yield for DEX Exchanges'
      }
    ],
    probability: 0.12
  }
];
