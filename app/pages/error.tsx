import { useNavigate } from "react-router";

export default function ErrorPage({ error }: { error: string }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Une erreur est survenue :</h1>
      <p>{error}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Retour au dashboard
      </button>
    </div>
  );
}
