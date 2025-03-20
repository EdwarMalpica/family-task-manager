"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Mon",
    completed: 4,
    total: 6,
  },
  {
    name: "Tue",
    completed: 3,
    total: 5,
  },
  {
    name: "Wed",
    completed: 5,
    total: 7,
  },
  {
    name: "Thu",
    completed: 2,
    total: 4,
  },
  {
    name: "Fri",
    completed: 6,
    total: 8,
  },
  {
    name: "Sat",
    completed: 4,
    total: 6,
  },
  {
    name: "Sun",
    completed: 3,
    total: 5,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            borderColor: "var(--border)",
          }}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary-400 opacity-30" />
        <Bar dataKey="completed" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

