"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState } from "react";

const data = [
  { name: "Mon", completed: 4, total: 6 },
  { name: "Tue", completed: 3, total: 5 },
  { name: "Wed", completed: 5, total: 7 },
  { name: "Thu", completed: 2, total: 4 },
  { name: "Fri", completed: 6, total: 8 },
  { name: "Sat", completed: 4, total: 6 },
  { name: "Sun", completed: 3, total: 5 },
];

const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  const tooltipX = coordinate.x;
  const tooltipY = 250;

  return (
    <div
      className="bg-white text-black border border-gray-300 rounded-md p-4 shadow-md"
      style={{
        position: "absolute",
        left: `${tooltipX}px`,
        top: `${tooltipY}px`,
        pointerEvents: "none",
        transform: "translate(-50%,-100%)",
      }}
    >
      <p className="text-sm font-semibold">{payload[0].payload.name}</p>
      <p className="text-xs whitespace-nowrap">Done: {payload[1]?.value}</p>
      <p className="text-xs whitespace-nowrap">Total: {payload[0]?.value}</p>
    </div>
  );
};

export function Overview() {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary-400 opacity-30"
          />
          <Bar
            dataKey="completed"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
