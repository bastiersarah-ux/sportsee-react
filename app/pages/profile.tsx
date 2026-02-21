import { useContext } from "react";
import UserCard from "~/components/UserCard";
import { UserContext } from "~/contexts/UserContext";
import { formatMinutesToString } from "~/utils/date-utils";
import styles from "./profile.module.css";

const Profile = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user!;
  const { profile, statistics } = user!;

  const totalDuration = formatMinutesToString(statistics.totalDuration);

  return (
    <div className={styles["profile-container"]}>
      <section className={styles["user-card"]}>
        <UserCard user={user} isProfile={true} />
      </section>

      <section className={styles["profile-info"]}>
        <div className={`card bg-white ${styles["card-profile"]}`}>
          <h1>Votre profil</h1>
          <div className="divider"></div>
          <ul className={styles["profile-typo"]}>
            <li>Âge : {profile.age} ans</li>
            <li>Genre : {profile.gender === "female" ? "Femme" : "Homme"}</li>
            <li>Taille : {profile.height} cm</li>
            <li>Poids : {profile.weight} kg</li>
          </ul>
        </div>
      </section>

      <section className={styles["statistics"]}>
        <div>
          <h1>Vos statistiques</h1>
          <h2>
            depuis le{" "}
            {new Date(profile.createdAt!).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
        </div>
        <ul className={styles["statistic-section"]}>
          <li className="card">
            <legend>Temps total couru</legend>
            <p>
              {totalDuration.hours > 0 && <span className="text-[22px] mr-1">{totalDuration.hours}h</span>}
              {totalDuration.minutes}min
            </p>
          </li>
          <li className="card">
            <legend>Calories brûlées</legend>
            <p>
              <span className="text-[22px] mr-1">{statistics.totalcaloriesBurned}</span> cal
            </p>
          </li>
          <li className="card">
            <legend>Distance totale parcourue</legend>
            <p>
              <span className="text-[22px] mr-1">{Math.floor(+statistics.totalDistance)}</span> km
            </p>
          </li>
          <li className="card">
            <legend>Nombre de jours de repos</legend>
            <p>
              <span className="text-[22px] mr-1">{statistics.totalDayOff}</span> jours
            </p>
          </li>
          <li className="card">
            <legend>Nombre de sessions</legend>
            <p>
              <span className="text-[22px] mr-1">{statistics.totalSessions}</span> sessions
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Profile;
