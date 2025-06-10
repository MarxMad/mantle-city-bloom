
import React from 'react';
import { GameState } from '../types/game';
import { Building, DollarSign, Coins } from 'lucide-react';

interface GameHeaderProps {
  gameState: GameState;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState }) => {
  return (
    <header className="h-20 glass border-b border-white/10 px-6 flex items-center justify-between">
      {/* Game Title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Building className="w-8 h-8 text-primary animate-pulse-glow" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Mantle Tycoon
            </h1>
            <p className="text-sm text-muted-foreground">Week {gameState.weekNumber} • City Level {gameState.cityLevel}</p>
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="flex items-center space-x-6">
        {/* Tokens */}
        <div className="glass-card px-4 py-2 flex items-center space-x-2">
          <Coins className="w-5 h-5 text-defi-gold" />
          <div>
            <p className="text-sm text-muted-foreground">$BLD Tokens</p>
            <p className="text-lg font-bold text-defi-gold">{gameState.tokens.toLocaleString()}</p>
          </div>
        </div>

        {/* Weekly Revenue */}
        <div className="glass-card px-4 py-2 flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-defi-green" />
          <div>
            <p className="text-sm text-muted-foreground">Weekly Revenue</p>
            <p className="text-lg font-bold text-defi-green">{gameState.weeklyRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Buildings Count */}
        <div className="glass-card px-4 py-2 flex items-center space-x-2">
          <Building className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Buildings</p>
            <p className="text-lg font-bold text-primary">{gameState.totalBuildings}</p>
          </div>
        </div>

        {/* Reputation */}
        <div className="glass-card px-4 py-2">
          <p className="text-sm text-muted-foreground">Reputation</p>
          <div className="flex items-center space-x-2">
            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-defi-green to-defi-cyan transition-all duration-300"
                style={{ width: `${gameState.reputation}%` }}
              />
            </div>
            <span className="text-sm font-medium">{gameState.reputation}%</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
