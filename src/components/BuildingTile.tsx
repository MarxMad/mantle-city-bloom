import React from 'react';
import { Building } from '../types/game';

interface BuildingTileProps {
  building: Building;
  isHovered: boolean;
}

const BuildingTile: React.FC<BuildingTileProps> = ({ building, isHovered }) => {
  // Detectar si el edificio está cerca del borde derecho o superior
  // Ahora el grid tiene 7 columnas y 7 filas
  const GRID_COLS = 7;
  const GRID_ROWS = 7;
  const isRightEdge = building.x >= GRID_COLS - 2;
  const isTopEdge = building.y <= 1;

  const getBuildingColor = () => {
    switch (building.type.id) {
      case 'dex': return 'from-cyan-500 to-cyan-600';
      case 'lending': return 'from-blue-500 to-blue-600';
      case 'stablecoin': return 'from-green-500 to-green-600';
      case 'nft-market': return 'from-purple-500 to-purple-600';
      case 'yield-farm': return 'from-yellow-500 to-yellow-600';
      case 'validator': return 'from-indigo-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Posición dinámica del tooltip
  let tooltipPosition = 'left-1/2 -translate-x-1/2 -top-24';
  if (isRightEdge) tooltipPosition = 'right-0 left-auto -translate-x-0 -top-24';
  if (isTopEdge) tooltipPosition = tooltipPosition.replace('-top-24', 'top-12');

  return (
    <div className="relative w-full h-full">
      {/* Building Card */}
      <div 
        className={`
          absolute inset-0 rounded-2xl shadow-2xl
          bg-gradient-to-br ${getBuildingColor()}
          ${isHovered ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''}
          ${building.isActive ? 'animate-pulse-glow' : 'opacity-50'}
          transition-all duration-200
        `}
      >
        {/* Building Content */}
        <div className="absolute inset-0 p-2 xs:p-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="text-white text-2xl md:text-xl sm:text-base xs:text-[12px] max-w-full">
              {building.type.icon}
            </div>
            <div className="bg-black/30 text-white text-base md:text-sm sm:text-xs xs:text-[9px] max-xs:text-[7px] rounded-lg px-2 py-0.5 font-bold max-w-full">
              L{building.level}
            </div>
          </div>

          {/* Building Name */}
          <div className="mt-1 px-0.5 xs:px-0 sm:px-0">
            <h3 className="text-white text-sm md:text-xs sm:text-[8px] xs:text-[7px] max-xs:text-[6px] font-semibold break-all leading-tight line-clamp-2 text-ellipsis max-h-[2.5em] overflow-hidden max-w-full">
              {building.type.name}
            </h3>
          </div>

          {/* Yield Rate */}
          <div className="mt-auto">
            <div className="bg-black/30 text-white text-xs md:text-[11px] sm:text-[9px] xs:text-[7px] max-xs:text-[6px] rounded-lg px-2 py-0.5 text-center font-semibold max-w-full overflow-hidden">
              +{building.yieldRate}/tick
            </div>
          </div>
        </div>

        {/* Active Indicator */}
        {building.isActive && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse ring-2 ring-green-400/50" />
        )}
      </div>

      {/* Hover Tooltip */}
      {isHovered && (
        <div className={`absolute z-50 w-48 max-w-xs ${tooltipPosition}`}>
          <div className="glass-card p-3 text-xs backdrop-blur-md break-words">
            <div className="font-semibold text-primary">{building.type.name}</div>
            <div className="text-muted-foreground mt-1">{building.type.description}</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nivel:</span>
                <span className="text-foreground">{building.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rendimiento:</span>
                <span className="text-defi-green">{building.yieldRate} $BLD/tick</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mantenimiento:</span>
                <span className="text-defi-red">{building.type.maintenanceCost * building.level} $BLD/tick</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <span className={building.isActive ? 'text-defi-green' : 'text-defi-red'}>
                  {building.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground border-t border-white/10 pt-2">
              Click izquierdo: Mejorar • Click derecho: Vender
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingTile;
