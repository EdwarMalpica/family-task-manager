"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Mom", value: 12, color: "#8884d8" },
  { name: "Dad", value: 10, color: "#82ca9d" },
  { name: "Emma", value: 8, color: "#ffc658" },
  { name: "Jack", value: 6, color: "#ff8042" },
]

export function FamilyProgress() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

