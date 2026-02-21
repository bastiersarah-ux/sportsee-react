import { Link, useNavigate } from "react-router";
import { tokenKey } from "~/pages/login";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(tokenKey);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <img src="/img/logo-sportsee.svg" alt="Logo Sportsee" />

      <nav className={styles.nav}>
        <Link to="/">Dashboard</Link>
        <Link to="/profile">Mon profil</Link>

        <button className={styles.linkblue} onClick={handleLogout}>
          | Se déconnecter
        </button>
      </nav>
    </header>
  );
};

export default Header;
