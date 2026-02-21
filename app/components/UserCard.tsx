import styles from "./UserCard.module.css";
import type { UserInfo } from "../models/dashboard";

type UserCardProps = {
  user?: UserInfo;
  showDistance?: boolean;
  useGradient?: boolean;
};

const UserCard = ({ user, showDistance, useGradient }: UserCardProps) => {
  return (
    user && (
      <div
        className={`${styles.card} card ${useGradient ? styles.gradient : ""}`}
      >
        <div className="flex items-center gap-6">
          <img
            src={user?.profile.profilePicture}
            alt={user?.profile.firstName}
            className={styles["card-avatar"]}
          />
          <div className={styles["card-info"]}>
            <h1>
              {user?.profile.firstName} {user?.profile.lastName}
            </h1>
            <h2>
              Membre depuis le{" "}
              {new Date(user?.profile.createdAt!).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
          </div>
        </div>
        {showDistance && (
          <div className="flex items-center gap-3">
            <h2>Distance totale parcourue :</h2>
            <div className={styles["card-blue"]}>
              {user?.statistics.totalDistance} km
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UserCard;
