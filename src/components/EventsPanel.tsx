
import React from 'react';
import { EconomicEvent } from '../types/game';

interface EventsPanelProps {
  currentEvent: EconomicEvent | null;
  onGenerateEvent: () => void;
}

const EventsPanel: React.FC<EventsPanelProps> = ({ currentEvent, onGenerateEvent }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'positive': return '📈';
      case 'negative': return '📉';
      default: return '📊';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-defi-green bg-green-500/10';
      case 'negative': return 'border-defi-red bg-red-500/10';
      default: return 'border-defi-gold bg-yellow-500/10';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-accent">Market Events</h2>
        <p className="text-sm text-muted-foreground">Economic conditions affecting your city</p>
      </div>

      {/* Current Event */}
      {currentEvent ? (
        <div className={`glass-card p-4 border-2 ${getEventColor(currentEvent.type)}`}>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{getEventIcon(currentEvent.type)}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{currentEvent.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{currentEvent.description}</p>
              
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-foreground">Effects:</h4>
                {currentEvent.effects.map((effect, index) => (
                  <div key={index} className="text-xs bg-black/30 rounded p-2">
                    {effect.description}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Duration remaining</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">~6 ticks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-4 text-center">
          <div className="text-4xl mb-2">🌊</div>
          <h3 className="font-semibold text-foreground">Market Calm</h3>
          <p className="text-sm text-muted-foreground mt-1">
            No significant events affecting the market
          </p>
        </div>
      )}

      {/* Generate Event Button (for testing) */}
      <button
        onClick={onGenerateEvent}
        className="w-full py-2 px-4 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors font-medium"
        disabled={!!currentEvent}
      >
        {currentEvent ? 'Event in Progress...' : 'Generate Random Event'}
      </button>

      {/* Event History */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Recent Events</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          <div className="text-xs text-muted-foreground border-l-2 border-defi-green pl-2">
            Bull Market Rally ended - DeFi protocols saw 50% yield increase
          </div>
          <div className="text-xs text-muted-foreground border-l-2 border-defi-red pl-2">
            Security Breach affected high-risk protocols
          </div>
          <div className="text-xs text-muted-foreground border-l-2 border-defi-gold pl-2">
            New regulations boosted market confidence
          </div>
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Market Sentiment</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Bull/Bear Index</span>
            <span className="text-defi-green">Bullish</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-defi-red via-defi-gold to-defi-green h-2 rounded-full relative">
              <div className="absolute right-1/3 top-0 w-1 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Bear</span>
            <span>Neutral</span>
            <span>Bull</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPanel;
