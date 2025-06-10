
import React from 'react';
import { Building } from '../types/game';

interface BuildingTileProps {
  building: Building;
  isHovered: boolean;
}

const BuildingTile: React.FC<BuildingTileProps> = ({ building, isHovered }) => {
  const getBuildingHeight = (level: number) => {
    return Math.min(level * 8 + 16, 48); // Max height of 48px
  };

  const getBuildingColor = () => {
    switch (building.type.id) {
      case 'dex': return 'bg-gradient-to-t from-cyan-600 to-cyan-400';
      case 'lending': return 'bg-gradient-to-t from-blue-600 to-blue-400';
      case 'stablecoin': return 'bg-gradient-to-t from-green-600 to-green-400';
      case 'nft-market': return 'bg-gradient-to-t from-purple-600 to-purple-400';
      case 'yield-farm': return 'bg-gradient-to-t from-yellow-600 to-yellow-400';
      case 'validator': return 'bg-gradient-to-t from-indigo-600 to-indigo-400';
      default: return 'bg-gradient-to-t from-gray-600 to-gray-400';
    }
  };

  const height = getBuildingHeight(building.level);

  return (
    <div className="relative w-full h-full building-hover">
      {/* Building Base */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0 rounded-sm shadow-lg
          ${getBuildingColor()}
          ${isHovered ? 'glow-primary' : ''}
          ${building.isActive ? 'animate-pulse-glow' : 'opacity-50'}
        `}
        style={{ height: `${height}px` }}
      >
        {/* Building Icon */}
        <div className="absolute top-1 left-1 text-white text-sm">
          {building.type.icon}
        </div>
        
        {/* Building Level */}
        <div className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded px-1">
          L{building.level}
        </div>
        
        {/* Yield Indicator */}
        <div className="absolute bottom-1 left-1 right-1">
          <div className="bg-black/50 text-white text-xs rounded px-1 text-center">
            +{building.yieldRate}/tick
          </div>
        </div>

        {/* Active Indicator */}
        {building.isActive && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        )}
      </div>

      {/* Hover Tooltip */}
      {isHovered && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 w-48">
          <div className="glass-card p-3 text-xs">
            <div className="font-semibold text-primary">{building.type.name}</div>
            <div className="text-muted-foreground">{building.type.description}</div>
            <div className="mt-2 space-y-1">
              <div>Level: {building.level}</div>
              <div>Yield: {building.yieldRate} $BLD/tick</div>
              <div>Status: {building.isActive ? 'Active' : 'Inactive'}</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Left click: Upgrade • Right click: Sell
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingTile;
