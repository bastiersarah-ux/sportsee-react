import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("auth-key")) {
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
      }),
    });

    if (!res.ok) {
      const error: { message: string } = await res.json();
      alert(error.message);
      return;
    }

    const data: { token: string; userId: string } = await res.json();
    localStorage.setItem("auth-key", data.token);

    navigate("/");

    // if (email === "test@test.com" && password === "1234") {
    //   navigate("/dashboard");
    // } else {
    //   alert("Identifiants incorrects");
    // }
  };

  return (
    <div>
      <section>
        <div>
          <h1>SPORTSEE</h1>
        </div>

        <div>
          <header>
            <h2>Transformez vos stats en résultats</h2>
            <p>Se connecter</p>
          </header>

          <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Login;
