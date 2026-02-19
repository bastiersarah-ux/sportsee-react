import styles from "./UserCard.module.css";
import type { UserInfo } from "../models/dashboard";

type UserCardProps = { user?: UserInfo };

const UserCard = ({ user }: UserCardProps) => {
  return (
    user && (
      <div className={`${styles.card} card`}>
        <img
          src={user?.profile.profilePicture}
          alt={user?.profile.firstName}
          className={styles["card-avatar"]}
        />
        <div className={styles["card-info"]}>
          <h3>
            {user?.profile.firstName}, {user?.profile.lastName}
          </h3>
          <p>
            Membre depuis le{" "}
            {new Date(user?.profile.createdAt!).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className={styles["card-blue"]}>
          <p>Distance totale parcourue: {user?.statistics.totalDistance} km</p>
        </div>
      </div>
    )
  );
};

export default UserCard;
