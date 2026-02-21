import { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const PerformancesBpm = () => {
  const [userActivity, setUserActivity] = useState();
  const [dateEnd, setDateEnd] = useState(new Date());

  return <div>Vos dernières performances</div>;
};

const data = [
  { day: "Lun", min: 135, max: 170, avg: 165 },
  { day: "Mar", min: 142, max: 175, avg: 170 },
  { day: "Mer", min: 145, max: 180, avg: 172 },
  { day: "Jeu", min: 140, max: 173, avg: 168 },
  { day: "Ven", min: 133, max: 168, avg: 171 },
  { day: "Sam", min: 145, max: 165, avg: 162 },
  { day: "Dim", min: 135, max: 176, avg: 169 },
];

export default function HeartRateChart() {
  return (
    <div
      style={{
        minWidth: 450,
        flex: 1,
        height: 350,
        background: "#FFFFFF",
        padding: 20,
        borderRadius: 16,
      }}
    >
      <h3 style={{ margin: 0, color: "#ff3b30" }}>163 BPM</h3>
      <p style={{ marginTop: 4, color: "#777" }}>Fréquence cardiaque moyenne</p>

      <ResponsiveContainer width="100%" height="80%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="day" />
          <YAxis domain={[130, 185]} />

          <Tooltip />
          <Legend
            itemSorter={(item) => {
              const order = ["min", "max", "avg"];
              return order.indexOf(item.dataKey as string);
            }}
          />

          <Bar
            name="Min"
            dataKey="min"
            fill="#FCC1B6"
            radius={[6, 6, 0, 0]}
            barSize={14}
          />

          <Line
            name="Max BPM"
            type="monotone"
            dataKey="avg"
            stroke="#F2F3FF"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Bar
            name="Max BPM"
            dataKey="max"
            fill="#F4320B"
            radius={[6, 6, 0, 0]}
            barSize={14}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
