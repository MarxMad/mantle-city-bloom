import { useState, useEffect, useCallback } from 'react';
import { Building, BuildingType, GameState, EconomicEvent } from '../types/game';
import { BUILDING_TYPES, ECONOMIC_EVENTS } from '../data/gameData';

const GRID_SIZE = 20;
const TICK_INTERVAL = 60000; // 60 segundos por tick
const EVENT_INTERVAL = 180000; // 3 minutos

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    tokens: 1000,
    weeklyRevenue: 0,
    totalBuildings: 0,
    cityLevel: 1,
    weekNumber: 1,
    reputation: 100,
    lastUpdate: Date.now()
  });

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [currentEvent, setCurrentEvent] = useState<EconomicEvent | null>(null);
  const [eventDuration, setEventDuration] = useState(0);
  const [revenueHistory, setRevenueHistory] = useState<{ timestamp: number; revenue: number }[]>([]);

  // Game tick - processes yields and events
  useEffect(() => {
    const interval = setInterval(() => {
      processGameTick();
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [buildings, currentEvent]);

  // Generar eventos de mercado automáticamente cada 3 minutos
  useEffect(() => {
    const eventInterval = setInterval(() => {
      generateMarketEventWithNebula();
    }, EVENT_INTERVAL);
    return () => clearInterval(eventInterval);
  }, []);

  const processGameTick = useCallback(() => {
    const now = Date.now();
    let totalRevenue = 0;
    let totalMaintenance = 0;

    setBuildings(prevBuildings => {
      return prevBuildings.map(building => {
        if (building.isActive && (now - building.lastHarvest) >= TICK_INTERVAL) {
          // Calcular yield con modificadores de eventos
          const buildingYield = calculateBuildingYield(building);
          totalRevenue += buildingYield;

          // Calcular costo de mantenimiento
          const maintenanceCost = building.type.maintenanceCost * building.level;
          totalMaintenance += maintenanceCost;

          return {
            ...building,
            lastHarvest: now
          };
        }
        return building;
      });
    });

    // Guardar el revenue real en el historial
    setRevenueHistory(prev => {
      const newHistory = [...prev, { timestamp: now, revenue: totalRevenue - totalMaintenance }];
      // Mantener solo los últimos 24 ticks (24 horas)
      return newHistory.slice(-24);
    });

    // Update game state with revenue and maintenance
    if (totalRevenue > 0 || totalMaintenance > 0) {
      setGameState(prev => ({
        ...prev,
        tokens: prev.tokens + totalRevenue - totalMaintenance,
        weeklyRevenue: prev.weeklyRevenue + totalRevenue - totalMaintenance,
        lastUpdate: now
      }));
    }

    // Process event duration
    if (currentEvent && eventDuration > 0) {
      setEventDuration(prev => prev - 1);
    } else if (currentEvent && eventDuration === 0) {
      setCurrentEvent(null);
    }
  }, [buildings, currentEvent, eventDuration]);

  const calculateBuildingYield = (building: Building): number => {
    let baseYield = building.yieldRate * building.level;
    
    // Apply event modifiers
    if (currentEvent) {
      currentEvent.effects.forEach(effect => {
        if (shouldEffectApply(effect, building)) {
          baseYield *= effect.modifier;
        }
      });
    }

    return Math.floor(baseYield);
  };

  const shouldEffectApply = (effect: any, building: Building): boolean => {
    if (effect.targetType === 'all') return true;
    if (effect.targetType === 'specific') return effect.target === building.type.id;
    if (effect.targetType === 'category') return effect.target === building.type.category;
    return false;
  };

  const placeBuildingOnGrid = (x: number, y: number, buildingTypeId: string): boolean => {
    const buildingType = BUILDING_TYPES.find(type => type.id === buildingTypeId);
    if (!buildingType) return false;

    const cost = calculateBuildingCost(buildingType, 1);
    if (gameState.tokens < cost) return false;

    // Check if position is available
    const existingBuilding = buildings.find(b => b.x === x && b.y === y);
    if (existingBuilding) return false;

    const newBuilding: Building = {
      id: `${buildingTypeId}-${Date.now()}-${x}-${y}`,
      type: buildingType,
      level: 1,
      x,
      y,
      yieldRate: buildingType.baseYield,
      cost,
      lastHarvest: Date.now(),
      isActive: true
    };

    setBuildings(prev => [...prev, newBuilding]);
    setGameState(prev => ({
      ...prev,
      tokens: prev.tokens - cost,
      totalBuildings: prev.totalBuildings + 1
    }));

    return true;
  };

  const upgradeBuildingAt = (x: number, y: number): boolean => {
    const buildingIndex = buildings.findIndex(b => b.x === x && b.y === y);
    if (buildingIndex === -1) return false;

    const building = buildings[buildingIndex];
    const upgradeCost = calculateBuildingCost(building.type, building.level + 1);
    
    if (gameState.tokens < upgradeCost) return false;

    setBuildings(prev => {
      const updated = [...prev];
      updated[buildingIndex] = {
        ...building,
        level: building.level + 1,
        yieldRate: building.type.baseYield * (building.level + 1),
        cost: upgradeCost
      };
      return updated;
    });

    setGameState(prev => ({
      ...prev,
      tokens: prev.tokens - upgradeCost
    }));

    return true;
  };

  const sellBuildingAt = (x: number, y: number): boolean => {
    const buildingIndex = buildings.findIndex(b => b.x === x && b.y === y);
    if (buildingIndex === -1) return false;

    const building = buildings[buildingIndex];
    const sellValue = Math.floor(building.cost * 0.7); // 70% return

    setBuildings(prev => prev.filter((_, index) => index !== buildingIndex));
    setGameState(prev => ({
      ...prev,
      tokens: prev.tokens + sellValue,
      totalBuildings: prev.totalBuildings - 1
    }));

    return true;
  };

  const calculateBuildingCost = (buildingType: BuildingType, level: number): number => {
    return Math.floor(buildingType.baseCost * Math.pow(1.5, level - 1));
  };

  const generateRandomEvent = (): void => {
    const availableEvents = ECONOMIC_EVENTS.filter(event => !currentEvent);
    if (availableEvents.length === 0) return;

    const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    setCurrentEvent(randomEvent);
    setEventDuration(randomEvent.duration);
    
    console.log('New economic event:', randomEvent.title);
  };

  // Función para obtener un evento de Nebula (simulada por ahora)
  const generateMarketEventWithNebula = async () => {
    // Aquí deberías hacer la llamada real a Nebula de thirdweb
    // Por ahora, usamos el sistema local
    generateRandomEvent();
    // Ejemplo de integración:
    // const nebulaEvent = await getNebulaMarketEvent();
    // setCurrentEvent(nebulaEvent);
    // setEventDuration(nebulaEvent.duration);
  };

  return {
    gameState,
    buildings,
    currentEvent,
    placeBuildingOnGrid,
    upgradeBuildingAt,
    sellBuildingAt,
    generateRandomEvent,
    revenueHistory
  };
};
