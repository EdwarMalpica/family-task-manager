"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useTaskContext } from "@/contexts/TaskContext"
import { useMemo } from "react"
import dayjs from "dayjs"

const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (!active || !payload || payload.length === 0) return null

  const tooltipX = coordinate.x
  const tooltipY = 250

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
  )
}

export function Overview() {
  const { tasks } = useTaskContext()

  const data = useMemo(() => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const groupedData = daysOfWeek.reduce(
      (acc, day) => {
        acc[day] = { name: day, completed: 0, total: 0 }
        return acc
      },
      {} as Record<string, { name: string; completed: number; total: number }>,
    )

    tasks.forEach((task) => {
      const dayName = dayjs(task.dueDate).format("ddd") 
      if (groupedData[dayName]) {
        groupedData[dayName].total += 1
        if (task.status === "completed") {
          groupedData[dayName].completed += 1
        }
      }
    })

    return Object.values(groupedData) 
  }, [tasks])

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ left: -30 }}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary-400 opacity-30 dark:fill-gray-500 dark:opacity-70"
          />
          <Bar dataKey="completed" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

