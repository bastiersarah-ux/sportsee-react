import type { Route } from "./+types/dashboard";
import { useEffect, useState } from "react";
import type { UserInfo } from "~/models/dashboard";
import { tokenKey } from "./login";
import dayjs from "dayjs";
import PerformancesKm from "~/components/PerformancesKm";
import PerformancesBpm from "~/components/PerformancesBpm";
import Goals from "~/components/Goals";
import UserCard from "~/components/UserCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Bienvenue sur votre dashboard" },
  ];
}

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serverUrl = "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem(tokenKey);
      if (!token) return;

      try {
        const res = await fetch(`${serverUrl}/api/user-info`, {
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

        const data: UserInfo = await res.json();
        setUserProfile(data);
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <>
      <UserCard user={userProfile} />
      <PerformancesKm />
      <PerformancesBpm />
      <Goals />
    </>
  );
};

export default Dashboard;
