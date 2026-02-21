import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import type { UserInfo } from "~/models/dashboard";
import ErrorPage from "~/pages/error";
import { tokenKey } from "~/pages/login";

export const UserContext = createContext<{ user?: UserInfo }>({});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const serverUrl = "http://localhost:8000";

  useEffect(() => {
    setLoading(true);
    setError(null);

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
          if (res.status == 401) {
            navigate("/login");
            return;
          }
          const errorData: { message: string } = await res.json();
          setError(errorData.message);
          return;
        }

        const data: UserInfo = await res.json();
        setUser(data);
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname]);

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (error)
    return (
      <>
        <ErrorPage error={error} />
      </>
    );

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
