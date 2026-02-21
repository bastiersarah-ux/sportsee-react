import { useContext } from "react";
import Goals from "~/components/Goals";
import PerformancesBpm from "~/components/PerformancesBpm";
import PerformancesKm from "~/components/PerformancesKm";
import UserCard from "~/components/UserCard";
import { UserContext } from "~/contexts/UserContext";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }, { name: "description", content: "Bienvenue sur votre dashboard" }];
}

const Dashboard = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <UserCard user={userContext.user} />
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
