import dayjs from "dayjs";
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
import { DateRange } from "~/models/common";
import { tokenKey } from "~/pages/login";

const data = [
  { week: "S1", km: 20 },
  { week: "S2", km: 25 },
  { week: "S3", km: 15 },
  { week: "S4", km: 30 },
];

export default function MyBarChart() {
  const [userActivity, setUserActivity] = useState();
  const [dateRange, setDateRange] = useState(new DateRange(4, "week"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serverUrl = "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem(tokenKey);
      if (!token) return;

      try {
        const res = await fetch(
          `${serverUrl}/api/user-activity?startWeek=${dateRange.start}&endWeek=${dateRange.end}`,
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
  }, [dateRange]);

  const substractWeeks = () => {
    const newDate = dayjs(dateRange.start).toDate();
    setDateRange(new DateRange(4, "week", newDate));
  };

  const addWeeks = () => {
    let newDate = dayjs(dateRange.end).add(4, "week").toDate();
    if (newDate > new Date()) {
      newDate = new Date();
    }
    setDateRange(new DateRange(4, "week", newDate));
  };

  if (loading) {
    return <></>;
  }

  return (
    <div
      className="card"
      style={{
        minWidth: 450,
        flex: 1,
        height: "350px",
        background: "#FFFFFF",
        padding: 20,
        borderRadius: 16,
      }}
    >
      <h3 style={{ margin: 0, color: "#ff3b30" }}>18Km en moyenne</h3>
      <p style={{ marginTop: 4, color: "#777" }}>
        Total des kilomètres 4 dernières semaines
      </p>

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
