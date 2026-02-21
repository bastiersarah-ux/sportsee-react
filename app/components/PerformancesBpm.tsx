import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { UserContext } from "~/contexts/UserContext";
import { DateRange, toBpmActivities, type BpmActivity } from "~/models/common";
import type { UserActivity } from "~/models/dashboard";
import { tokenKey } from "~/pages/login";
import { getCurrentWeek } from "~/utils/date-utils";

const data = [
  { day: "Lun", min: 135, max: 170, avg: 165 },
  { day: "Mar", min: 142, max: 175, avg: 170 },
  { day: "Mer", min: 145, max: 180, avg: 172 },
  { day: "Jeu", min: 140, max: 173, avg: 168 },
  { day: "Ven", min: 133, max: 168, avg: 171 },
  { day: "Sam", min: 145, max: 165, avg: 162 },
  { day: "Dim", min: 135, max: 176, avg: 169 },
];

export default function PerformancesBpm() {
  const userContext = useContext(UserContext);
  const minDate = new Date(userContext.user?.profile.createdAt!);
  minDate.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);

  const [activities, setActivities] = useState<BpmActivity[]>();
  const { start } = getCurrentWeek();
  const [dateRange, setDateRange] = useState<DateRange>(DateRange.fromDates(start));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serverUrl = import.meta.env.VITE_API_URL;

  const moyenne = activities?.filter((a) => a.avg > 0).reduce((sum, a, _, arr) => sum + a.avg / arr.length, 0) ?? 0;

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      const token = localStorage.getItem(tokenKey);
      if (!token) return;

      const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      };

      // Temporisation minimum pour éviter le scintillement
      const minDelay = new Promise((resolve) => setTimeout(resolve, 600));

      try {
        const [res] = await Promise.all([
          fetch(`${serverUrl}/api/user-activity?startWeek=${formatDate(dateRange.start)}&endWeek=${formatDate(dateRange.end)}`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }),
          minDelay,
        ]);

        if (!res.ok) {
          const errorData: { message: string } = await res.json();
          setError(errorData.message);
          return;
        }

        const data: UserActivity[] = await res.json();
        console.log(maxDate);
        setActivities(toBpmActivities(data));
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  function substractWeek() {
    const newStart = new Date(dateRange.start);
    newStart.setDate(newStart.getDate() - 7);

    if (newStart < minDate) return;

    const newEnd = new Date(newStart);
    newEnd.setDate(newStart.getDate() + 6);

    setDateRange(DateRange.fromDates(newStart, newEnd));
  }

  function addWeek() {
    const newStart = new Date(dateRange.start);
    newStart.setDate(newStart.getDate() + 7);

    const newEnd = new Date(newStart);
    newEnd.setDate(newStart.getDate() + 6);

    if (newEnd > maxDate) return;

    setDateRange(DateRange.fromDates(newStart, newEnd));
  }

  if (error && !loading) {
    return (
      <div className="dashboard-card flex flex-1 min-w-112.5 min-h-87.5 items-center justify-center w-auto flex-col gap-8 p-5">
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Une erreur est survenue lors de la récupération des données. Veuillez réessayer ultérieurement.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="header">
        <div className="title-subtitle">
          <h3 className="text-secondary">
            {loading ? (
              <>
                Calcul en cours<span className="loading loading-dots loading-xs ml-2"></span>
              </>
            ) : (
              `${Math.round(moyenne)} BPM`
            )}
          </h3>
          <p>Fréquence cardiaque moyenne</p>
        </div>
        <div className="date-range-selector">
          <button
            className="btn btn-outline btn-sm btn-circle"
            onClick={() => substractWeek()}
            disabled={dateRange.start <= minDate || loading}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>
            {dateRange.formattedStart} - {dateRange.formattedEnd}
          </span>
          <button
            className="btn btn-outline btn-sm btn-circle"
            onClick={() => addWeek()}
            disabled={dateRange.end >= maxDate || loading}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex w-full items-center justify-center h-full">
          <span className="py-10 loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <ComposedChart data={activities}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="day" />
            <YAxis domain={[130, 185]} />

            <Tooltip />
            <Legend
              iconType="circle"
              iconSize={4}
              itemSorter={(item) => {
                const order = ["min", "max", "avg"];
                return order.indexOf(item.dataKey as string);
              }}
              align="left"
              content={({ payload }) => {
                const colorOverrides: Record<string, string> = {
                  avg: "#0B23F4",
                };
                return (
                  <ul style={{ display: "flex", gap: "24px", padding: "10px 0 0 20px", margin: 0, listStyle: "none" }}>
                    {payload?.map((entry, index) => (
                      <li key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: colorOverrides[entry.dataKey as string] ?? entry.color,
                          }}
                        />
                        <span style={{ color: "#666", fontSize: "12px" }}>{entry.value}</span>
                      </li>
                    ))}
                  </ul>
                );
              }}
            />

            <Bar name="Min" dataKey="min" fill="#FCC1B6" radius={[6, 6, 0, 0]} barSize={14} />

            <Line
              name="Max BPM"
              type="monotone"
              dataKey="avg"
              dot={{ r: 2, fill: "#0B23F4", stroke: "#0B23F4" }}
              activeDot={{ r: 6, fill: "#0B23F4", stroke: "#0B23F4" }}
              stroke="#F2F3FF"
              strokeWidth={3}
            />

            <Bar name="Max BPM" dataKey="max" fill="#F4320B" radius={[6, 6, 0, 0]} barSize={14} />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
