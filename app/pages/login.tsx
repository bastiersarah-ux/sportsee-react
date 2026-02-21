import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { LoginForm, TokenResponse } from "~/models/authentication";
import type { ErrorServer } from "~/models/common";
import styles from "./Login.module.css";

export const tokenKey = "auth-key";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem(tokenKey)) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const serverUrl = "http://localhost:8000";

    const res = await fetch(`${serverUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      } as LoginForm),
    });

    if (!res.ok) {
      const error: ErrorServer = await res.json();
      alert(error.message);
      return;
    }

    const data: TokenResponse = await res.json();
    localStorage.setItem(tokenKey, data.token);

    navigate("/");
  };

  return (
    <div className="flex">
      <section className={styles["left-section"]}>
        <img src="/img/logo-sportsee.svg" alt="Sportsee logo" className={styles["logo"]} />
        <div>
          <div className="card bg-white w-[75%] rounded-[20px] p-10 pb-20 gap-10">
            <h1>Transformez vos&nbsp;stats en résultats</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <h2>Se connecter</h2>
              <fieldset className="fieldset">
                <label className="label" htmlFor="email">
                  Adresse email
                </label>
                <input id="email" type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </fieldset>

              <fieldset className="fieldset">
                <label htmlFor="password" className="label">
                  Mot de passe
                </label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <button className="btn btn-primary w-full rounded-[10px] mt-4" type="submit">
                Se connecter
              </button>
            </form>

            <Link to="/forgot-password">Mot de passe oublié ?</Link>
          </div>
        </div>
      </section>

      <section className={styles["right-section"]}>
        <img className="w-202" src="/public/img/marathon.svg" alt="Course marathon" />
        <span>Analysez vos performances en un clin d’œil, suivez vos progrès et atteignez vos objectifs.</span>
      </section>
    </div>
  );
};

export default Login;
