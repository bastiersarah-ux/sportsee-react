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
        <div className={`divider divider-horizontal divider-primary select-none ${styles.separator}`}></div>

        <button className={`${styles.linkblue} btn-link`} onClick={handleLogout}>
          Se déconnecter
        </button>
      </nav>
    </header>
  );
};

export default Header;
