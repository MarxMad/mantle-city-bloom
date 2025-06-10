
import React, { useState } from 'react';
import { Building } from '../types/game';
import BuildingTile from './BuildingTile';

interface CityGridProps {
  buildings: Building[];
  selectedBuildingType: string | null;
  onPlaceBuilding: (x: number, y: number, buildingType: string) => boolean;
  onUpgradeBuilding: (x: number, y: number) => boolean;
  onSellBuilding: (x: number, y: number) => boolean;
}

const GRID_SIZE = 12;

const CityGrid: React.FC<CityGridProps> = ({
  buildings,
  selectedBuildingType,
  onPlaceBuilding,
  onUpgradeBuilding,
  onSellBuilding
}) => {
  const [hoveredCell, setHoveredCell] = useState<{x: number, y: number} | null>(null);

  const getBuildingAt = (x: number, y: number): Building | undefined => {
    return buildings.find(building => building.x === x && building.y === y);
  };

  const handleCellClick = (x: number, y: number) => {
    const existingBuilding = getBuildingAt(x, y);
    
    if (existingBuilding) {
      // If building exists, try to upgrade it
      onUpgradeBuilding(x, y);
    } else if (selectedBuildingType) {
      // If no building and type selected, place new building
      const success = onPlaceBuilding(x, y, selectedBuildingType);
      if (success) {
        console.log(`Placed ${selectedBuildingType} at (${x}, ${y})`);
      }
    }
  };

  const handleCellRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    const existingBuilding = getBuildingAt(x, y);
    if (existingBuilding) {
      onSellBuilding(x, y);
    }
  };

  const renderGrid = () => {
    const cells = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const building = getBuildingAt(x, y);
        const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;
        const canPlace = !building && selectedBuildingType;
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`
              relative w-16 h-16 border border-white/10 cursor-pointer transition-all duration-200
              ${isHovered ? 'bg-white/20 border-primary' : 'bg-white/5 hover:bg-white/10'}
              ${canPlace ? 'border-primary/50' : ''}
              ${building ? 'bg-white/10' : ''}
            `}
            style={{
              transform: 'rotateX(60deg) rotateY(-30deg)',
              transformStyle: 'preserve-3d'
            }}
            onClick={() => handleCellClick(x, y)}
            onContextMenu={(e) => handleCellRightClick(e, x, y)}
            onMouseEnter={() => setHoveredCell({x, y})}
            onMouseLeave={() => setHoveredCell(null)}
          >
            {building && (
              <BuildingTile 
                building={building}
                isHovered={isHovered}
              />
            )}
            
            {/* Placement preview */}
            {canPlace && isHovered && (
              <div className="absolute inset-0 border-2 border-primary bg-primary/20 rounded animate-pulse">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl">+</span>
                </div>
              </div>
            )}
            
            {/* Grid coordinates (for debugging) */}
            <div className="absolute bottom-0 right-0 text-xs text-white/30 pointer-events-none">
              {x},{y}
            </div>
          </div>
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="h-full flex items-center justify-center iso-grid relative overflow-hidden">
      {/* Grid Container */}
      <div 
        className="grid gap-1 perspective-1000"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          transform: 'rotateX(0deg) rotateY(0deg) scale(0.8)',
          transformStyle: 'preserve-3d'
        }}
      >
        {renderGrid()}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 glass-card p-4 max-w-xs">
        <h3 className="font-semibold mb-2 text-primary">Controls</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Left click: Place/Upgrade building</li>
          <li>• Right click: Sell building</li>
          <li>• Select building type from left panel</li>
        </ul>
      </div>

      {/* Selection indicator */}
      {selectedBuildingType && (
        <div className="absolute top-4 left-4 glass-card p-3">
          <p className="text-sm text-muted-foreground">Selected:</p>
          <p className="font-semibold text-primary capitalize">{selectedBuildingType.replace('-', ' ')}</p>
        </div>
      )}
    </div>
  );
};

export default CityGrid;
