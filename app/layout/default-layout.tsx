// app/layout/default-layout.tsx

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { tokenKey } from "~/routes/login";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

export default function DefaultLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(tokenKey)) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
