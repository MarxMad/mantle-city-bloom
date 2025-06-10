
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building } from '../types/game';
import { GameState } from '../types/game';

interface DashboardProps {
  gameState: GameState;
  buildings: Building[];
}

const Dashboard: React.FC<DashboardProps> = ({ gameState, buildings }) => {
  // Generate mock revenue data for the chart
  const revenueData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    revenue: Math.floor(Math.random() * 200) + 50,
    tokens: Math.floor(Math.random() * 100) + 20
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
        <h2 className="text-xl font-bold text-primary">City Dashboard</h2>
        <p className="text-sm text-muted-foreground">Real-time performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-card p-3 text-center">
          <div className="text-2xl font-bold text-defi-green">{totalYield}</div>
          <div className="text-xs text-muted-foreground">Total Yield/tick</div>
        </div>
        <div className="glass-card p-3 text-center">
          <div className="text-2xl font-bold text-defi-gold">{gameState.totalBuildings}</div>
          <div className="text-xs text-muted-foreground">Active Buildings</div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="chart-container">
        <h3 className="text-sm font-semibold mb-3 text-foreground">24h Revenue Trend</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00FFFF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="hour" 
                stroke="rgba(255,255,255,0.5)"
                fontSize={10}
                tick={{ fill: 'rgba(255,255,255,0.5)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                fontSize={10}
                tick={{ fill: 'rgba(255,255,255,0.5)' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#00FFFF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Building Distribution */}
      {buildings.length > 0 && (
        <div className="chart-container">
          <h3 className="text-sm font-semibold mb-3 text-foreground">Building Distribution</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={buildingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {buildingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {buildingDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-1">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {entry.name} ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Score */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold mb-2 text-foreground">City Performance</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Efficiency</span>
            <span className="text-defi-green">85%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-defi-green to-defi-cyan h-2 rounded-full w-[85%]"></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Risk Level</span>
            <span className="text-defi-gold">Medium</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-to-r from-defi-gold to-defi-red h-2 rounded-full w-[60%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
