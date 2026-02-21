// app/layout/default-layout.tsx

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { tokenKey } from "~/pages/login";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { UserProvider } from "~/contexts/UserContext";

export default function DefaultLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(tokenKey)) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <main>
        <Header />
        <UserProvider>
          <Outlet />
        </UserProvider>
      </main>
      <Footer />
    </>
  );
}
