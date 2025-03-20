"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Mom", value: 12, color: "#8884d8" },
  { name: "Dad", value: 10, color: "#82ca9d" },
  { name: "Emma", value: 8, color: "#ffc658" },
  { name: "Jack", value: 6, color: "#ff8042" },
]

// export function FamilyProgress() {
//   return (
//     <div className="h-[300px] w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "var(--background)",
//               color: "var(--foreground)",
//               borderColor: "var(--border)",
//             }}
//           />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }


const CustomPieTooltip = ({ active, payload }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="bg-white text-black border border-gray-300 rounded-md p-2 shadow-md"
      style={{
        position: "absolute",
        left: "50%", // Centered horizontally
        top: "20px", // Fixed position at the top
        transform: "translate(400%,200%)", // Center it properly
        pointerEvents: "none",
      }}
    >
      <p className="whitespace-nowrap text-sm font-semibold">{payload[0].payload.name}</p>
      <p className="whitespace-nowrap text-xs">Value: {payload[0].value}</p>
    </div>
  );
};

export function FamilyProgress() {
  return (
    <div className="relative h-[300px] w-full">
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
