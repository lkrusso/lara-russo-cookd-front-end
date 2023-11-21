import "./Dashboard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Cookbook from "../../components/Cookbook/Cookbook";

function Dashboard() {
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const login = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const { data } = await axios.get(
          "http://localhost:5050/api/auth/details",
          { headers: { Authorization: "Bearer " + token } }
        );
        setUserData(data);
      } catch (error) {
        console.error(error);
        setFailedAuth(true);
      }
      setIsLoading(false);
    };
    login();
  }, []);

  if (failedAuth) {
    return <main className="dashboard">You must log in to see this page</main>;
  }
  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }

  return (
    <main className="dashboard">
      <Cookbook />
      <RecipeCard />
      <button onClick={logout}>Log out</button>
    </main>
  );
}

export default Dashboard;
