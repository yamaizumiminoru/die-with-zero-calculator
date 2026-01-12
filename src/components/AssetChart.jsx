import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const AssetChart = ({ data, dieAge }) => {
    return (
        <div className="chart-section glass-panel">
            <h2>Asset Depletion Simulation</h2>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                        <XAxis
                            dataKey="age"
                            type="number"
                            domain={['dataMin', dieAge]}
                            tickCount={10}
                            stroke="#ccc"
                            label={{ value: 'Age', position: 'insideBottomRight', offset: -5, fill: '#ccc' }}
                        />
                        <YAxis
                            stroke="#ccc"
                            unit="万"
                            width={80}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px', color: '#fff' }}
                            formatter={(value) => [`${value} 万円`, "Assets"]}
                            labelFormatter={(label) => `Age: ${label}`}
                        />
                        <Area
                            type="monotone"
                            dataKey="assets"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorAssets)"
                            animationDuration={500}
                        />
                        <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AssetChart;
