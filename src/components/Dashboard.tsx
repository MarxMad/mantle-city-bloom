import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building } from '../types/game';
import { GameState } from '../types/game';

interface DashboardProps {
  gameState: GameState;
  buildings: Building[];
  revenueHistory?: { timestamp: number; revenue: number }[];
}

const Dashboard: React.FC<DashboardProps> = ({ gameState, buildings, revenueHistory }) => {
  // Usar revenueHistory real si está disponible
  const revenueData = revenueHistory && revenueHistory.length > 0
    ? revenueHistory.map((item, i) => ({
        hour: i + 1,
        revenue: item.revenue
      }))
    : Array.from({ length: 24 }, (_, i) => ({
        hour: i + 1,
        revenue: 0
      }));

  // Calculate building distribution
  const buildingStats = buildings.reduce((acc, building) => {
    const type = building.type.name;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const buildingDistribution = Object.entries(buildingStats).map(([name, count]) => ({
    name,
    value: count
  }));

  const COLORS = ['#00FFFF', '#0080FF', '#00FF80', '#8000FF', '#FFD700', '#FF4080'];

  // Calculate total yield
  const totalYield = buildings.reduce((sum, building) => {
    return sum + (building.isActive ? building.yieldRate : 0);
  }, 0);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary">Panel de Control</h2>
        <p className="text-sm text-muted-foreground">Métricas de rendimiento en tiempo real</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-3 text-center">
          <div className="text-2xl font-bold text-defi-green">{totalYield}</div>
          <div className="text-xs text-muted-foreground">Yield Total/tick</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="text-2xl font-bold text-defi-gold">{gameState.totalBuildings}</div>
          <div className="text-xs text-muted-foreground">Edificios Activos</div>
        </div>
      </div>

      {/* Botón de Reclamar recompensas (demo) */}
      <div className="flex justify-center">
        <button
          className="mt-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition"
          onClick={() => alert('¡Recompensas reclamadas! (demo)')}
        >
          Reclamar recompensas
        </button>
      </div>

      {/* Revenue Chart */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-2">Ingresos por Hora</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00FF80" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis 
                dataKey="hour" 
                stroke="#ffffff40"
                tick={{ fill: '#ffffff40', fontSize: 12 }}
              />
              <YAxis 
                stroke="#ffffff40"
                tick={{ fill: '#ffffff40', fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#00FF80"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Building Distribution */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-2">Distribución de Edificios</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={buildingDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {buildingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {buildingDistribution.map((entry, index) => (
            <div key={entry.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
