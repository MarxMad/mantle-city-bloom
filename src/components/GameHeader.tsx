import React from 'react';
import { GameState } from '../types/game';
import { Coins } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

interface GameHeaderProps {
  gameState: GameState;
  onOpenBuildingPanel?: () => void;
  onOpenDashboard?: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState, onOpenBuildingPanel, onOpenDashboard }) => {
  return (
    <header className="w-full glass border-b border-white/10 px-4 py-2 flex flex-wrap items-center justify-between gap-2 sm:px-2 sm:py-1">
      {/* Logo y Título */}
      <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
        <img src="/CityM.png" alt="Logo" className="w-16 h-16 sm:w-12 sm:h-12 rounded-2xl shadow-2xl border-4 border-primary bg-background p-1 mr-2 transition-transform duration-200 hover:scale-105" />
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-lg font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg truncate">Mantle City</h1>
          <p className="text-base sm:text-xs text-muted-foreground hidden xs:block font-semibold truncate">Semana {gameState.weekNumber} • Nivel Ciudad {gameState.cityLevel}</p>
        </div>
      </div>
      {/* Botones móviles, se apilan en vertical si no caben */}
      <div className="flex flex-col xs:flex-row flex-shrink-0 gap-2 xs:gap-3 items-center justify-center w-full xs:w-auto order-3 xs:order-none lg:hidden mt-2 xs:mt-0">
        <button
          className="px-4 py-2 sm:px-2 sm:py-1 xs:px-1.5 xs:py-1 bg-cyan-400 text-white font-bold rounded-full shadow-md text-sm sm:text-xs xs:text-xs hover:bg-cyan-500 transition w-full xs:w-auto min-h-[36px] sm:min-h-[28px] xs:min-h-[24px]"
          style={{marginBottom: 0}}
          onClick={onOpenBuildingPanel}
        >
          Edificios DeFi
        </button>
        <button
          className="px-4 py-2 sm:px-2 sm:py-1 xs:px-1.5 xs:py-1 bg-fuchsia-400 text-white font-bold rounded-full shadow-md text-sm sm:text-xs xs:text-xs hover:bg-fuchsia-500 transition w-full xs:w-auto min-h-[36px] sm:min-h-[28px] xs:min-h-[24px]"
          style={{marginBottom: 0}}
          onClick={onOpenDashboard}
        >
          Dashboard / Eventos
        </button>
      </div>
      {/* Game Stats y Wallet */}
      <div className="flex items-center gap-4 sm:gap-2 flex-shrink-0 ml-auto">
        {/* Tokens */}
        <div className="glass-card px-4 py-2 flex items-center gap-2 sm:px-2 sm:py-1">
          <Coins className="w-6 h-6 text-defi-gold" />
          <div>
            <p className="text-base sm:text-xs text-muted-foreground font-semibold">$BLD</p>
            <p className="text-xl sm:text-base font-bold text-defi-gold">{gameState.tokens.toLocaleString()}</p>
          </div>
        </div>
        {/* Wallet Connect */}
        <div className="ml-2"><WalletConnect /></div>
      </div>
    </header>
  );
};

export default GameHeader;
