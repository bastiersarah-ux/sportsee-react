import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { tokenKey } from "~/routes/login";

const data = [
  { week: "S1", km: 20 },
  { week: "S2", km: 25 },
  { week: "S3", km: 15 },
  { week: "S4", km: 30 },
];

export default function MyBarChart() {
  const [userActivity, setUserActivity] = useState();
  const [dateEnd, setDateEnd] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serverUrl = "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem(tokenKey);
      if (!token) return;

      try {
        const res = await fetch(
          `${serverUrl}/api/user-activity?startWeek=2025-01-04&endWeek=2025-03-08`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          const errorData: { message: string } = await res.json();
          setError(errorData.message);
          return;
        }

        const data = await res.json();
        setUserActivity(data.userActivity);
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //  dayjs(dateEnd).subtract(4, "week");

  if (loading) {
    return <></>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        background: "#FFFFFF",
      }}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="km" fill="#B6BDFC" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
