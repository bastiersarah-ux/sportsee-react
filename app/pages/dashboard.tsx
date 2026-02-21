import type { Route } from "./+types/dashboard";
import { useContext } from "react";
import PerformancesKm from "~/components/PerformancesKm";
import PerformancesBpm from "~/components/PerformancesBpm";
import Goals from "~/components/Goals";
import UserCard from "~/components/UserCard";
import { UserContext } from "~/contexts/UserContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Bienvenue sur votre dashboard" },
  ];
}

const Dashboard = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <UserCard
        user={userContext.user}
        useGradient={true}
        showDistance={true}
      />
      <div className="flex flex-col gap-8">
        <h1>Vos dernières performances</h1>
        <div className="flex gap-8 flex-wrap">
          <PerformancesKm />
          <PerformancesBpm />
        </div>
      </div>
      <Goals />
    </>
  );
};

export default Dashboard;
