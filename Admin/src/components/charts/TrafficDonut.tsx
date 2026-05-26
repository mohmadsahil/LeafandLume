import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TrafficSource } from "@/types/dashboard";

const COLORS = ["#3a6c37", "#75b162", "#a0cd92", "#bdd9bb", "#dcecdb"];

export function TrafficDonut({ data }: { data: TrafficSource[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "white",
            boxShadow: "0 10px 25px -5px rgb(16 24 40 / 0.08)",
            fontSize: 12,
          }}
          formatter={(v: number, _name, ctx: any) =>
            [`${v.toLocaleString()} visitors`, ctx.payload?.source]
          }
        />
        <Pie
          data={data}
          dataKey="visitors"
          nameKey="source"
          innerRadius={62}
          outerRadius={92}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="white" strokeWidth={2} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
