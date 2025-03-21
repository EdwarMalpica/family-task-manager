"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Mom", value: 12, color: "#8884d8" },
  { name: "Dad", value: 10, color: "#82ca9d" },
  { name: "Emma", value: 8, color: "#ffc658" },
  { name: "Jack", value: 6, color: "#ff8042" },
]

import { useEffect, useState } from "react";

const CustomPieTooltip = ({ active, payload }: any) => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    // Function to check screen width
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768); // Tailwind's 'md' breakpoint is 768px
    };

    checkScreenSize(); // Run on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="bg-white text-black border border-gray-300 rounded-md p-2 shadow-md"
      style={{
        position: "absolute",
        left: "50%",
        top: "20px",
        transform: isMdScreen ? "translate(400%, 200%)" : "translate(-50%, 0)", // Apply only on md+
        pointerEvents: "none",
      }}
    >
      <p className="whitespace-nowrap text-sm font-semibold">
        {payload[0].payload.name}
      </p>
      <p className="whitespace-nowrap text-xs">Value: {payload[0].value}</p>
    </div>
  );
};

export function FamilyProgress() {
  return (
    <div className="relative h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
