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

const GRID_SIZE = 7;

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
      onUpgradeBuilding(x, y);
    } else if (selectedBuildingType) {
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
              relative aspect-square w-full h-full min-w-0 min-h-0 flex items-center justify-center
              border-2 rounded-2xl transition-all duration-200
              ${isHovered ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5'}
              ${canPlace ? 'border-primary/50' : ''}
              ${building ? 'bg-white/10' : ''}
              hover:border-primary/50 hover:bg-white/10
              shadow-lg hover:shadow-xl
              cursor-pointer
            `}
            onClick={() => handleCellClick(x, y)}
            onContextMenu={(e) => handleCellRightClick(e, x, y)}
            onMouseEnter={() => setHoveredCell({x, y})}
            onMouseLeave={() => setHoveredCell(null)}
            style={{ aspectRatio: '1 / 1' }}
          >
            {building && (
              <BuildingTile 
                building={building}
                isHovered={isHovered}
              />
            )}
            
            {/* Placement preview */}
            {canPlace && isHovered && (
              <div className="absolute inset-0 border-2 border-primary bg-primary/20 rounded-2xl animate-pulse">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl text-primary">+</span>
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
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden min-h-0 min-w-0">
      {/* Grid Container */}
      <div 
        className="grid bg-gradient-to-br from-background/50 to-background/80 rounded-2xl backdrop-blur-sm w-full h-full min-h-0 min-w-0"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '0.1rem',
          width: '100%',
          height: '100%',
        }}
      >
        {renderGrid()}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 glass-card p-4 max-w-xs backdrop-blur-md xs:static xs:mt-2 xs:p-2 xs:text-xs xs:max-w-full">
        <h3 className="font-semibold mb-2 text-primary">Controles</h3>
        <ul className="text-sm space-y-1 text-muted-foreground xs:text-xs">
          <li>• Click izquierdo: Colocar/Mejorar edificio</li>
          <li>• Click derecho: Vender edificio</li>
          <li>• Selecciona el tipo de edificio del panel izquierdo</li>
        </ul>
      </div>

      {/* Selection indicator */}
      {selectedBuildingType && (
        <div className="absolute top-4 left-4 glass-card p-3 backdrop-blur-md xs:static xs:mt-2 xs:p-2 xs:text-xs xs:max-w-full">
          <p className="text-sm text-muted-foreground xs:text-xs">Seleccionado:</p>
          <p className="font-semibold text-primary capitalize xs:text-xs">{selectedBuildingType.replace('-', ' ')}</p>
        </div>
      )}
    </div>
  );
};

export default CityGrid;
