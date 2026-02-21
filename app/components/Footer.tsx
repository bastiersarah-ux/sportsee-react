import { Link, useNavigate } from "react-router";
import { tokenKey } from "~/pages/login";
import styles from "./Footer.module.css";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(tokenKey);
    navigate("/login");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.start}>
        <a href="#">© Sportsee Tous droits réservés</a>
      </div>
      <div className={styles.end}>
        <a href="#">Conditions générales</a>
        <a href="#">Contact</a>
        <img src="/img/logo-miniature.svg" alt="Logo Sportsee" />
      </div>
    </footer>
  );
};

export default Footer;
