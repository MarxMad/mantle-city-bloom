import React, { useState } from 'react';
import GameHeader from '../components/GameHeader';
import CityGrid from '../components/CityGrid';
import BuildingPanel from '../components/BuildingPanel';
import Dashboard from '../components/Dashboard';
import EventsPanel from '../components/EventsPanel';
import { useGameLogic } from '../hooks/useGameLogic';
import { useWallet } from '../hooks/useWallet';

const Index = () => {
  const {
    gameState,
    buildings,
    currentEvent,
    placeBuildingOnGrid,
    upgradeBuildingAt,
    sellBuildingAt,
    generateRandomEvent,
    revenueHistory
  } = useGameLogic();
  const { isConnected } = useWallet();
  const [selectedBuildingType, setSelectedBuildingType] = useState<string | null>(null);
  const [showBuildingPanel, setShowBuildingPanel] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Game Header */}
      <GameHeader 
        gameState={gameState}
        onOpenBuildingPanel={() => setShowBuildingPanel(true)}
        onOpenDashboard={() => setShowDashboard(true)}
      />
      {/* Si no hay wallet conectada, solo mostrar header y mensaje */}
      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-lg text-muted-foreground mb-4">Conecta tu wallet para jugar</p>
        </div>
      ) : (
        <>
          {/* Main Game Layout */}
          <div className="flex flex-1 h-[calc(100vh-64px)] min-h-0">
            {/* Left Sidebar - Building Panel (desktop) */}
            <aside className="w-80 glass border-r border-white/10 p-4 overflow-y-auto hidden lg:block">
              <BuildingPanel 
                selectedType={selectedBuildingType}
                onSelectType={setSelectedBuildingType}
                playerTokens={gameState.tokens}
              />
            </aside>
            {/* Drawer/modal solo cuando está abierto (panel edificios) */}
            {showBuildingPanel && (
              <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 lg:hidden" onClick={() => setShowBuildingPanel(false)}>
                <div className="w-full max-w-md bg-background glass border-b border-white/10 p-4 mt-20 rounded-b-2xl shadow-xl animate-slide-down" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Edificios DeFi</h2>
                    <button className="text-2xl text-muted-foreground" onClick={() => setShowBuildingPanel(false)}>&times;</button>
                  </div>
                  <BuildingPanel 
                    selectedType={selectedBuildingType}
                    onSelectType={setSelectedBuildingType}
                    playerTokens={gameState.tokens}
                  />
                </div>
              </div>
            )}
            {/* Drawer/modal solo cuando está abierto (dashboard/eventos) */}
            {showDashboard && (
              <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 lg:hidden" onClick={() => setShowDashboard(false)}>
                <div className="w-full max-w-md bg-background glass border-t border-white/10 p-0 mb-4 rounded-t-2xl shadow-xl animate-slide-up flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
                  {/* Header fijo con botón de exit */}
                  <div className="flex justify-between items-center p-4 border-b border-white/10 sticky top-0 bg-background z-10 rounded-t-2xl">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Dashboard & Eventos</h2>
                    <button className="text-2xl text-muted-foreground" onClick={() => setShowDashboard(false)}>&times;</button>
                  </div>
                  {/* Contenido scrollable */}
                  <div className="overflow-y-auto p-4 flex-1">
                    <Dashboard gameState={gameState} buildings={buildings} revenueHistory={revenueHistory} />
                    <EventsPanel 
                      currentEvent={currentEvent}
                      onGenerateEvent={generateRandomEvent}
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Center - City Grid */}
            <main className="flex-1 flex items-center justify-center min-w-0 min-h-[300px] mt-8 sm:mt-12 xs:mt-16">
              <CityGrid 
                buildings={buildings}
                selectedBuildingType={selectedBuildingType}
                onPlaceBuilding={placeBuildingOnGrid}
                onUpgradeBuilding={upgradeBuildingAt}
                onSellBuilding={sellBuildingAt}
              />
            </main>
            {/* Right Sidebar - Dashboard & Events (desktop) */}
            <aside className="w-80 glass border-l border-white/10 overflow-y-auto p-4 space-y-4 hidden lg:block">
              <Dashboard gameState={gameState} buildings={buildings} revenueHistory={revenueHistory} />
              <EventsPanel 
                currentEvent={currentEvent}
                onGenerateEvent={generateRandomEvent}
              />
            </aside>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
