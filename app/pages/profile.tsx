import { useContext } from "react";
import { UserContext } from "~/contexts/UserContext";
import UserCard from "~/components/UserCard";
import styles from "./profile.module.css";
import { formatMinutesToString } from "~/utils/date-utils";

const Profile = () => {
  const userContext = useContext(UserContext);
  const user = userContext.user!;
  const { profile, statistics } = user!;

  const totalDuration = formatMinutesToString(statistics.totalDuration);

  return (
    <div className={styles["profile-container"]}>
      <section className={styles["user-card"]}>
        <UserCard user={user} />
      </section>

      <section className={styles["profile-info"]}>
        <div className={`card bg-white ${styles["card-profile"]}`}>
          <h1>Votre profil</h1>
          <div className="divider"></div>
          <ul className={styles["profile-typo"]}>
            <li>Âge : {profile.age} ans</li>
            <li>Genre : {profile.gender}</li>
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
          <ul className={styles["statistic-section"]}>
            <li className="card bg-primary text-white py-5 px-7.5">
              Temps total couru :
              <p>
                {totalDuration.hours > 0 && (
                  <span className="text-[22px] mr-1">
                    {totalDuration.hours}h
                  </span>
                )}
                <span>{totalDuration.minutes}min</span>
              </p>
            </li>
            <li className="card bg-primary text-white py-5 px-7.5">
              {" "}
              Calories brûlées : {} cal
            </li>
            <li className="card bg-primary text-white py-5 px-7.5">
              {" "}
              Distance totale parcourue :{" "}
              {Math.floor(+statistics.totalDistance)} km
            </li>
            <li className="card bg-primary text-white py-5 px-7.5">
              {" "}
              Nombre de jours de repos : {} jours
            </li>
            <li className="card bg-primary text-white py-5 px-7.5">
              {" "}
              Nombre de sessions : {statistics.totalSessions} sessions
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Profile;
