import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', amount: 4000 },
    { name: 'Tue', amount: 3000 },
    { name: 'Wed', amount: 2000 },
    { name: 'Thu', amount: 2780 },
    { name: 'Fri', amount: 1890 },
    { name: 'Sat', amount: 2390 },
    { name: 'Sun', amount: 3490 },
];

const SpendingGraph = () => {
    return (
        <div className="w-full h-48 bg-surface rounded-[2rem] p-4 mb-8 relative overflow-hidden border border-white/5">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-white font-bold">Weekly Spending</h3>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">+2.4%</span>
            </div>

            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorAmount)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpendingGraph;
