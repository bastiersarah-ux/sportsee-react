import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { LoginForm, TokenResponse } from "~/models/authentication";
import type { ErrorServer } from "~/models/common";

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
    <main>
      <section>
        <div className="card">
          <header>
            <h2>Transformez vos stats en résultats</h2>
            <p>Se connecter</p>
          </header>

          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Se connecter</button>

            <div>
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </div>
          </form>
        </div>
      </section>

      <section>
        <img src="/public/img/marathon.svg" alt="Course marathon" />
        <span>
          Analysez vos performances en un clin d’œil, suivez vos progrès et
          atteignez vos objectifs.
        </span>
      </section>
    </main>
  );
};

export default Login;
