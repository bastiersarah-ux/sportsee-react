import { useContext, useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { UserContext } from "~/contexts/UserContext";
import type { UserActivity } from "~/models/dashboard";
import { tokenKey } from "~/pages/login";
import { getCurrentWeek } from "~/utils/date-utils";
import styles from "./Goals.module.css";

const completed = 4;
const goal = 6;

const data = [
  { name: "Réalisées", value: completed },
  { name: "Restantes", value: goal - completed },
];

export default function Goal() {
  const userContext = useContext(UserContext);
  const [completed, setCompleted] = useState<number>(0);
  const [activityDuration, setActivityDuration] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const { start, end, monday, sunday } = getCurrentWeek();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serverUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      const token = localStorage.getItem(tokenKey);
      if (!token) return;

      try {
        const res = await fetch(`${serverUrl}/api/user-activity?startWeek=${start}&endWeek=${end}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData: { message: string } = await res.json();
          setError(errorData.message);
          return;
        }

        const data: UserActivity[] = await res.json();
        setCompleted(data.length);
        setActivityDuration(data.reduce((sum, session) => sum + session.duration, 0));
        setDistance(data.reduce((sum, session) => sum + session.distance, 0));
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center w-full flex-col gap-8">
        <div>
          <h1>Cette semaine</h1>
          <span className="subtitle">
            Du {monday} au {sunday}
          </span>
        </div>
        <span className="py-10 loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Une erreur est survenue</span>
      </div>
    );
  }

  const goal = userContext.user?.profile.weeklyGoal!;
  const remaining = goal - completed >= 0 ? goal - completed : 0;
  const progress = completed / goal <= 1 ? completed / goal : 0.01;

  const completedAngle = progress > 0 ? progress * 360 : 1;

  const renderCompletedLabel = ({ cx, cy, outerRadius }: any) => {
    // Position fixe à gauche du pie
    const x = cx - outerRadius - 60;
    const y = cy + 50;
    return (
      <g>
        <circle cx={x - 14} cy={y} r={4} fill="#0B23F4" />
        <text x={x} y={y} fill="#333" fontSize={12} dominantBaseline="central">
          {completed} réalisée(s)
        </text>
      </g>
    );
  };

  const renderRemainingLabel = ({ cx, cy, outerRadius }: any) => {
    // Position fixe à droite du pie
    const x = cx + outerRadius + 5;
    const y = cy - 60;
    return (
      <g>
        <circle cx={x - 14} cy={y} r={4} fill="#B6BDFC" />
        <text x={x} y={y} fill="#333" fontSize={12} dominantBaseline="central">
          {remaining} restant(s)
        </text>
      </g>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1>Cette semaine</h1>
        <span className="subtitle">
          Du {monday} au {sunday}
        </span>
      </div>

      <div className={styles.statistics}>
        <div className={`${styles["card-goal"]} card bg-white`}>
          <div className={styles.header}>
            <p>
              <span>x{completed}</span> sur objectif de {goal}
            </p>
            <h2>Courses hebdomadaire réalisées</h2>
          </div>
          <div className={styles["chart-container"]}>
            <ResponsiveContainer width={320} height={190}>
              <PieChart>
                <Pie
                  data={[{ value: remaining }]}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={120}
                  endAngle={120 + 360}
                  fill="#B6BDFC"
                  stroke="none"
                  label={renderRemainingLabel}
                  labelLine={false}
                />
                <Pie
                  data={[{ value: progress > 0 ? progress : 0.1 }]}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={120}
                  endAngle={120 + completedAngle}
                  fill="#0B23F4"
                  cornerRadius={20}
                  stroke="none"
                  label={renderCompletedLabel}
                  labelLine={false}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-4.75">
          <div className={`${styles["card-activity"]} card bg-white`}>
            <h2>Durée d'activité</h2>
            <p>
              <span className="text-[22px] mr-1">{activityDuration}</span> minutes
            </p>
          </div>
          <div className={`${styles["card-distance"]} card bg-white`}>
            <h2>Distance</h2>
            <p>
              <span className="text-[22px] mr-1">{distance}</span> kilomètres
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
