import { BuildingType, EconomicEvent } from '../types/game';

export const BUILDING_TYPES: BuildingType[] = [
  {
    id: 'dex',
    name: 'Exchange DEX',
    description: 'Market maker automatizado que genera comisiones por operaciones',
    baseYield: 15,
    baseCost: 100,
    maintenanceCost: 5,
    icon: '🔄',
    color: 'bg-defi-cyan',
    category: 'defi',
    riskLevel: 3
  },
  {
    id: 'lending',
    name: 'Pool de Préstamos',
    description: 'Gana intereses proporcionando liquidez a prestatarios',
    baseYield: 12,
    baseCost: 150,
    maintenanceCost: 4,
    icon: '🏦',
    color: 'bg-defi-blue',
    category: 'defi',
    riskLevel: 2
  },
  {
    id: 'stablecoin',
    name: 'Casa de Moneda Stablecoin',
    description: 'Genera retornos estables con riesgo mínimo',
    baseYield: 8,
    baseCost: 80,
    maintenanceCost: 3,
    icon: '💰',
    color: 'bg-defi-green',
    category: 'defi',
    riskLevel: 1
  },
  {
    id: 'nft-market',
    name: 'Mercado NFT',
    description: 'Gana comisiones por operaciones y regalías de NFTs',
    baseYield: 20,
    baseCost: 200,
    maintenanceCost: 6,
    icon: '🖼️',
    color: 'bg-defi-purple',
    category: 'defi',
    riskLevel: 4
  },
  {
    id: 'yield-farm',
    name: 'Granja de Yield',
    description: 'Minería de liquidez de alto riesgo y alta recompensa',
    baseYield: 35,
    baseCost: 300,
    maintenanceCost: 8,
    icon: '🌾',
    color: 'bg-defi-gold',
    category: 'defi',
    riskLevel: 5
  },
  {
    id: 'validator',
    name: 'Nodo Validador',
    description: 'Asegura la red y gana recompensas por staking',
    baseYield: 18,
    baseCost: 250,
    maintenanceCost: 7,
    icon: '🛡️',
    color: 'bg-blue-600',
    category: 'infrastructure',
    riskLevel: 2
  }
];

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: 'bull-market',
    title: 'Rally del Mercado Alcista',
    description: '¡El sentimiento del mercado es extremadamente positivo! Todos los protocolos DeFi ven un aumento en la actividad.',
    type: 'positive',
    duration: 10,
    effects: [
      {
        targetType: 'category',
        target: 'defi',
        modifier: 1.5,
        description: '+50% de yield para todos los edificios DeFi'
      }
    ],
    probability: 0.15
  },
  {
    id: 'bear-market',
    title: 'Corrección del Mercado',
    description: 'El mercado está experimentando una caída. La actividad DeFi disminuye significativamente.',
    type: 'negative',
    duration: 15,
    effects: [
      {
        targetType: 'category',
        target: 'defi',
        modifier: 0.6,
        description: '-40% de yield para todos los edificios DeFi'
      }
    ],
    probability: 0.12
  },
  {
    id: 'hack-attack',
    title: 'Brecha de Seguridad',
    description: '¡Un protocolo importante ha sido hackeado! Los edificios DeFi de alto riesgo se ven afectados temporalmente.',
    type: 'negative',
    duration: 8,
    effects: [
      {
        targetType: 'specific',
        target: 'yield-farm',
        modifier: 0.2,
        description: '-80% de yield para Granjas de Yield'
      },
      {
        targetType: 'specific',
        target: 'nft-market',
        modifier: 0.5,
        description: '-50% de yield para Mercados NFT'
      }
    ],
    probability: 0.08
  },
  {
    id: 'regulation-news',
    title: 'Regulación Favorable',
    description: 'Nuevas regulaciones amigables con las criptomonedas aumentan la confianza en el ecosistema.',
    type: 'positive',
    duration: 12,
    effects: [
      {
        targetType: 'all',
        target: '',
        modifier: 1.25,
        description: '+25% de yield para todos los edificios'
      }
    ],
    probability: 0.1
  },
  {
    id: 'gas-spike',
    title: 'Congestión de Red',
    description: 'Las altas tarifas de gas están afectando el volumen de transacciones en todos los protocolos.',
    type: 'negative',
    duration: 6,
    effects: [
      {
        targetType: 'specific',
        target: 'dex',
        modifier: 0.7,
        description: '-30% de yield para Exchanges DEX'
      }
    ],
    probability: 0.15
  },
  {
    id: 'innovation-boost',
    title: 'Innovación de Protocolo',
    description: 'Nuevas innovaciones DeFi están atrayendo grandes entradas de capital.',
    type: 'positive',
    duration: 8,
    effects: [
      {
        targetType: 'specific',
        target: 'lending',
        modifier: 1.8,
        description: '+80% de yield para Pools de Préstamos'
      },
      {
        targetType: 'specific',
        target: 'dex',
        modifier: 1.4,
        description: '+40% de yield para Exchanges DEX'
      }
    ],
    probability: 0.12
  },
  {
    id: 'maintenance-fee',
    title: 'Mantenimiento de Infraestructura',
    description: 'Es necesario realizar mantenimiento en tus edificios. Los costos de operación aumentan temporalmente.',
    type: 'negative',
    duration: 5,
    effects: [
      {
        targetType: 'all',
        target: '',
        modifier: 0.8,
        description: '-20% de yield para todos los edificios'
      }
    ],
    probability: 0.2
  },
  {
    id: 'competition',
    title: 'Nueva Competencia',
    description: 'Nuevos protocolos han entrado al mercado, reduciendo tus márgenes de beneficio.',
    type: 'negative',
    duration: 8,
    effects: [
      {
        targetType: 'specific',
        target: 'dex',
        modifier: 0.7,
        description: '-30% de yield para Exchanges DEX'
      },
      {
        targetType: 'specific',
        target: 'lending',
        modifier: 0.7,
        description: '-30% de yield para Pools de Préstamos'
      }
    ],
    probability: 0.15
  },
  {
    id: 'regulatory-fine',
    title: 'Multa Regulatoria',
    description: 'Las autoridades han impuesto una multa por incumplimiento regulatorio.',
    type: 'negative',
    duration: 1,
    effects: [
      {
        targetType: 'all',
        target: '',
        modifier: 0.5,
        description: '-50% de yield para todos los edificios'
      }
    ],
    probability: 0.05
  },
  {
    id: 'technical-issues',
    title: 'Problemas Técnicos',
    description: 'Tu infraestructura está experimentando problemas técnicos que afectan su rendimiento.',
    type: 'negative',
    duration: 3,
    effects: [
      {
        targetType: 'specific',
        target: 'validator',
        modifier: 0.6,
        description: '-40% de yield para Nodos Validador'
      }
    ],
    probability: 0.1
  },
  {
    id: 'liquidity-crisis',
    title: 'Crisis de Liquidez',
    description: 'Una crisis de liquidez ha afectado al mercado. Los usuarios están retirando sus fondos masivamente.',
    type: 'negative',
    duration: 6,
    effects: [
      {
        targetType: 'specific',
        target: 'lending',
        modifier: 0.4,
        description: '-60% de yield para Pools de Préstamos'
      },
      {
        targetType: 'specific',
        target: 'yield-farm',
        modifier: 0.3,
        description: '-70% de yield para Granjas de Yield'
      }
    ],
    probability: 0.08
  },
  {
    id: 'stablecoin-depeg',
    title: 'Despegue de Stablecoin',
    description: 'Una stablecoin importante ha perdido su paridad. El mercado está en pánico.',
    type: 'negative',
    duration: 4,
    effects: [
      {
        targetType: 'specific',
        target: 'stablecoin',
        modifier: 0.2,
        description: '-80% de yield para Casas de Moneda Stablecoin'
      },
      {
        targetType: 'category',
        target: 'defi',
        modifier: 0.7,
        description: '-30% de yield para todos los edificios DeFi'
      }
    ],
    probability: 0.06
  },
  {
    id: 'nft-crash',
    title: 'Colapso del Mercado NFT',
    description: 'El mercado NFT ha colapsado. Las ventas y el interés han caído drásticamente.',
    type: 'negative',
    duration: 7,
    effects: [
      {
        targetType: 'specific',
        target: 'nft-market',
        modifier: 0.3,
        description: '-70% de yield para Mercados NFT'
      }
    ],
    probability: 0.09
  },
  {
    id: 'validator-slashing',
    title: 'Slashing de Validadores',
    description: 'Algunos validadores han sido penalizados por comportamiento malicioso.',
    type: 'negative',
    duration: 5,
    effects: [
      {
        targetType: 'specific',
        target: 'validator',
        modifier: 0.5,
        description: '-50% de yield para Nodos Validador'
      }
    ],
    probability: 0.07
  },
  {
    id: 'dex-hack',
    title: 'Hackeo de DEX',
    description: 'Un exchange DEX ha sido comprometido. La confianza en los DEX ha disminuido.',
    type: 'negative',
    duration: 4,
    effects: [
      {
        targetType: 'specific',
        target: 'dex',
        modifier: 0.4,
        description: '-60% de yield para Exchanges DEX'
      }
    ],
    probability: 0.05
  },
  {
    id: 'market-manipulation',
    title: 'Manipulación de Mercado',
    description: 'Actores maliciosos están manipulando los precios en el mercado.',
    type: 'negative',
    duration: 3,
    effects: [
      {
        targetType: 'all',
        target: '',
        modifier: 0.6,
        description: '-40% de yield para todos los edificios'
      }
    ],
    probability: 0.1
  },
  {
    id: 'network-upgrade',
    title: 'Actualización de Red',
    description: 'La red está experimentando una actualización mayor. Las transacciones son más lentas y costosas.',
    type: 'negative',
    duration: 2,
    effects: [
      {
        targetType: 'all',
        target: '',
        modifier: 0.7,
        description: '-30% de yield para todos los edificios'
      }
    ],
    probability: 0.12
  },
  {
    id: 'oracle-failure',
    title: 'Fallo de Oracle',
    description: 'Los oráculos de precios están fallando, causando problemas en los protocolos DeFi.',
    type: 'negative',
    duration: 4,
    effects: [
      {
        targetType: 'category',
        target: 'defi',
        modifier: 0.5,
        description: '-50% de yield para todos los edificios DeFi'
      }
    ],
    probability: 0.08
  }
];
