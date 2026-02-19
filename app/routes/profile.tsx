import type { Route } from "./+types/profile";
import { useEffect, useState } from "react";
import type { UserInfo } from "~/models/dashboard";
import { tokenKey } from "./login";
import styles from "../components/CharacteristicsCard.module.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
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

        const data = await res.json();
        setUserInfo(data.typeUserInfo);
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
      <section>
        <div className="Avatar">
          <img
            src={userInfo?.profile.profilePicture}
            alt={userInfo?.profile.firstName}
            className="profile-pic"
          />
          <div className="profile-info">
            <h2>
              {userInfo?.profile.firstName}, {userInfo?.profile.lastName}
            </h2>
            <p>
              Membre depuis le
              {new Date(userInfo?.profile.createdAt!).toLocaleDateString(
                "fr-FR",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </p>
          </div>
          <div className="user-total-distance">
            <p>
              Distance totale parcourue: {userInfo?.statistics.totalDistance} km
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.card}>
          <h1>Votre profil</h1>
          <ul className={styles.characteristics}>
            <li>Âge : {userInfo?.profile.age} ans</li>
            <li>Genre : {userInfo?.profile.gender}</li>
            <li>Taille : {userInfo?.profile.height} cm</li>
            <li>Poids : {userInfo?.profile.weight} kg</li>
          </ul>
        </div>
      </section>

      <section>
        <div>
          <h1>Vos statistiques</h1>
          <p>
            depuis le{" "}
            {new Date(userInfo?.profile.createdAt!).toLocaleDateString(
              "fr-FR",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </p>
          <ul>
            <li>
              Temps total couru : {userInfo?.statistics.totalDuration} min
            </li>
            <li>
              Distance totale parcourue : {userInfo?.statistics.totalDistance}{" "}
              km
            </li>
            <li>
              Nombre de sessions : {userInfo?.statistics.totalSessions} sessions
            </li>
            <li>Calories brûlées : {} cal</li>
            <li>Nombre de jours de repos : {} jours</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Profile;
