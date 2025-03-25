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
import { useTaskContext } from "@/contexts/task-context";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088fe",
  "#00C49F",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-background border border-border rounded-md p-2 shadow-md">
      <p className="font-semibold">{payload[0].name}</p>
      <p className="text-sm">
        Completed Tasks: <span className="font-medium">{payload[0].value}</span>
      </p>
    </div>
  );
};

export function FamilyProgress() {
  const { tasks } = useTaskContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const taskCounts = tasks.reduce((acc: Record<string, number>, task) => {
    if (task.status === "completed") {
      acc[task.assignee] = (acc[task.assignee] || 0) + 1;
    }
    return acc;
  }, {});

  const data = Object.keys(taskCounts)
    .filter((name) => taskCounts[name] > 0)
    .map((name, index) => ({
      name,
      value: taskCounts[name],
      color: COLORS[index % COLORS.length],
    }));

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        No completed tasks
      </div>
    );
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
            isAnimationActive={isMounted}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
