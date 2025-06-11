import React from 'react';
import { BUILDING_TYPES } from '../data/gameData';
import { BuildingType } from '../types/game';

interface BuildingPanelProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  playerTokens: number;
}

const BuildingPanel: React.FC<BuildingPanelProps> = ({
  selectedType,
  onSelectType,
  playerTokens
}) => {
  const calculateCost = (buildingType: BuildingType, level: number = 1): number => {
    return Math.floor(buildingType.baseCost * Math.pow(1.5, level - 1));
  };

  const canAfford = (buildingType: BuildingType): boolean => {
    return playerTokens >= calculateCost(buildingType);
  };

  const getRiskLabel = (riskLevel: number): string => {
    const labels = ['Muy Bajo', 'Bajo', 'Medio', 'Alto', 'Muy Alto'];
    return labels[riskLevel - 1] || 'Desconocido';
  };

  const getRiskColor = (riskLevel: number): string => {
    if (riskLevel <= 2) return 'text-defi-green';
    if (riskLevel <= 3) return 'text-defi-gold';
    return 'text-defi-red';
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Edificios DeFi
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Selecciona un edificio para construir en tu ciudad
        </p>
      </div>

      <div className="space-y-3">
        {BUILDING_TYPES.map((buildingType) => {
          const cost = calculateCost(buildingType);
          const affordable = canAfford(buildingType);
          const isSelected = selectedType === buildingType.id;

          return (
            <div
              key={buildingType.id}
              className={`
                glass-card p-4 cursor-pointer transition-all duration-200
                ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:bg-white/15'}
                ${affordable ? '' : 'opacity-50 cursor-not-allowed'}
                rounded-lg backdrop-blur-sm
              `}
              onClick={() => {
                if (affordable) {
                  onSelectType(isSelected ? null : buildingType.id);
                }
              }}
            >
              <div className="flex items-start space-x-3">
                {/* Building Icon */}
                <div className="text-3xl flex-shrink-0">
                  {buildingType.icon}
                </div>

                {/* Building Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground truncate">
                      {buildingType.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-defi-gold font-bold">
                        {cost}
                      </span>
                      <span className="text-xs text-muted-foreground">$BLD</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {buildingType.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Yield */}
                    <div>
                      <span className="text-xs text-muted-foreground">Rendimiento: </span>
                      <span className="text-defi-green font-medium">
                        {buildingType.baseYield} $BLD/tick
                      </span>
                    </div>

                    {/* Risk Level */}
                    <div>
                      <span className="text-xs text-muted-foreground">Riesgo: </span>
                      <span className={`text-xs font-medium ${getRiskColor(buildingType.riskLevel)}`}>
                        {getRiskLabel(buildingType.riskLevel)}
                      </span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs bg-primary/20 text-primary rounded-full capitalize">
                      {buildingType.category === 'defi' ? 'DeFi' : 
                       buildingType.category === 'infrastructure' ? 'Infraestructura' : 
                       buildingType.category === 'special' ? 'Especial' : buildingType.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="mt-3 p-2 bg-primary/20 rounded-lg border border-primary/30">
                  <p className="text-xs text-primary text-center">
                    ✓ Seleccionado - Click en el grid para colocar
                  </p>
                </div>
              )}

              {/* Insufficient Funds */}
              {!affordable && (
                <div className="mt-3 p-2 bg-destructive/20 rounded-lg border border-destructive/30">
                  <p className="text-xs text-destructive text-center">
                    Fondos insuficientes ({(cost - playerTokens).toLocaleString()} $BLD necesarios)
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Clear Selection */}
      {selectedType && (
        <button
          onClick={() => onSelectType(null)}
          className="w-full py-2 px-4 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
        >
          Limpiar Selección
        </button>
      )}
    </div>
  );
};

export default BuildingPanel;
