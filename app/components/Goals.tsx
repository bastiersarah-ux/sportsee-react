import { PieChart, Pie, ResponsiveContainer } from "recharts";

const Goals = () => {
  return <div>Cette semaine</div>;
};

const completed = 4;
const goal = 6;

const data = [
  { name: "Réalisées", value: completed },
  { name: "Restantes", value: goal - completed },
];

export default function WeeklyDonut() {
  const completed = 4;
  const goal = 6;
  const progress = completed / goal;

  const size = 180;

  return (
    <ResponsiveContainer width={size} height={size}>
      <PieChart>
        <Pie
          data={[{ value: 1 }]}
          dataKey="value"
          innerRadius={60}
          outerRadius={80}
          fill="#B6BDFC"
          stroke="none"
          isAnimationActive={false}
        />

        <Pie
          data={[{ value: progress }]}
          dataKey="value"
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={90 - progress * 360}
          fill="#0B23F4"
          cornerRadius={20}
          stroke="none"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
