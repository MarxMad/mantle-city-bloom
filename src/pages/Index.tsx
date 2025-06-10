
import React, { useState, useEffect } from 'react';
import GameHeader from '../components/GameHeader';
import CityGrid from '../components/CityGrid';
import BuildingPanel from '../components/BuildingPanel';
import Dashboard from '../components/Dashboard';
import EventsPanel from '../components/EventsPanel';
import { Building, GameState, EconomicEvent } from '../types/game';
import { useGameLogic } from '../hooks/useGameLogic';

const Index = () => {
  const {
    gameState,
    buildings,
    currentEvent,
    placeBuildingOnGrid,
    upgradeBuildingAt,
    sellBuildingAt,
    generateRandomEvent
  } = useGameLogic();

  const [selectedBuildingType, setSelectedBuildingType] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Game Header */}
      <GameHeader gameState={gameState} />
      
      {/* Main Game Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Building Panel */}
        <div className="w-80 glass border-r border-white/10 p-4 overflow-y-auto">
          <BuildingPanel 
            selectedType={selectedBuildingType}
            onSelectType={setSelectedBuildingType}
            playerTokens={gameState.tokens}
          />
        </div>

        {/* Center - City Grid */}
        <div className="flex-1 relative">
          <CityGrid 
            buildings={buildings}
            selectedBuildingType={selectedBuildingType}
            onPlaceBuilding={placeBuildingOnGrid}
            onUpgradeBuilding={upgradeBuildingAt}
            onSellBuilding={sellBuildingAt}
          />
        </div>

        {/* Right Sidebar - Dashboard & Events */}
        <div className="w-80 glass border-l border-white/10 overflow-y-auto">
          <div className="p-4 space-y-4">
            <Dashboard gameState={gameState} buildings={buildings} />
            <EventsPanel 
              currentEvent={currentEvent}
              onGenerateEvent={generateRandomEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
