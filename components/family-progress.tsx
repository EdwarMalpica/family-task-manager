"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useTaskContext } from "@/contexts/TaskContext"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"]

const CustomPieTooltip = ({ active, payload }: any) => {
  const [isMdScreen, setIsMdScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (!active || !payload || payload.length === 0) return null

  return (
    <div
      className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-md p-2 shadow-md"
      style={{
        position: "absolute",
        left: "50%",
        top: "20px",
        transform: isMdScreen ? "translate(400%, 200%)" : "translate(-50%, 0)",
        pointerEvents: "none",
      }}
    >
      <p className="whitespace-nowrap text-sm font-semibold">{payload[0].name}</p>
      <p className="whitespace-nowrap text-xs">Tasks: {payload[0].value}</p>
    </div>
  )
}

export function FamilyProgress() {
  const { tasks } = useTaskContext()

  const taskCounts = tasks.reduce((acc: Record<string, number>, task) => {
    if (task.status === "completed") {
      acc[task.assignee] = (acc[task.assignee] || 0) + 1
    }
    return acc
  }, {})

  const data = Object.keys(taskCounts)
    .filter((name) => taskCounts[name] > 0) 
    .map((name, index) => ({
      name,
      value: taskCounts[name],
      color: COLORS[index % COLORS.length],
    }))

  if (data.length === 0) {
    return <div className="flex justify-center items-center h-[300px]">No tasks completed yet</div>
  }

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
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
            isAnimationActive={true}
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
  )
}

