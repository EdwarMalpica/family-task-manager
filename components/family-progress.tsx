"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useTaskContext } from "@/contexts/TaskContext"; 

const CustomPieTooltip = ({ active, payload }: any) => {
  const [isMdScreen, setIsMdScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
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
        transform: isMdScreen ? "translate(400%, 200%)" : "translate(-50%, 0)",
        pointerEvents: "none",
      }}
    >
      <p className="whitespace-nowrap text-sm font-semibold">
        {payload[0].payload.name}
      </p>
      <p className="whitespace-nowrap text-xs">Tasks: {payload[0].value}</p>
    </div>
  );
};

export function FamilyProgress() {
  const { tasks } = useTaskContext();
  

  // const taskCounts = tasks.reduce((acc: Record<string, number>, task) => {
  //   acc[task.assignee] = (acc[task.assignee] || 0) + 1;
  //   return acc;
  // }, {});

  const taskCounts = tasks.reduce((acc: Record<string, number>, task) => {
    if (task.status === "completed") { // Only count completed tasks
      acc[task.assignee] = (acc[task.assignee] || 0) + 1;
    }
    return acc;
  }, {});

  const data = Object.keys(taskCounts).map((name) => ({
    name,
    value: taskCounts[name],
    color:
      name === "Mom"
        ? "#8884d8"
        : name === "Dad"
        ? "#82ca9d"
        : name === "Emma"
        ? "#ffc658"
        : "#ff8042",
  }));

  return (
    <div className="relative h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
