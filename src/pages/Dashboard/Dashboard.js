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
  const [isRecipeError, setIsRecipeError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isCookbookError, setIsCookbookError] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

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

  const getRecipes = async () => {
    try {
      const { data } = await axios.post("http://localhost:5050/api/recipes", {
        id: userData.id,
      });
      setRecipes(data);
      setIsRecipeError(false);
    } catch (error) {
      setIsRecipeError(true);
    }
  };

  const getCookbooks = async () => {
    try {
      const { data } = await axios.post("http://localhost:5050/api/cookbooks", {
        id: userData.id,
      });
      setCookbooks(data);
      setIsCookbookError(false);
    } catch (error) {
      setIsCookbookError(true);
    }
  };

  useEffect(() => {
    login();
    getRecipes();
    getCookbooks();
  }, [userData, recipes, cookbooks]);

  if (failedAuth) {
    return <main className="dashboard">You must log in to see this page</main>;
  }
  if (isLoading) {
    return <main className="dashboard">Loading...</main>;
  }
  if (isRecipeError) {
    return <p>Error getting recipes</p>;
  }
  if (isCookbookError) {
    return <p>Error getting cookbooks</p>;
  }

  if (!recipes || !cookbooks) {
    return <p>Loading...</p>;
  }

  return (
    <main className="dashboard">
      {cookbooks.map((cookbook) => {
        return <Cookbook cookbook={cookbook} />;
      })}
      {recipes.map((recipe) => {
        return <RecipeCard recipe={recipe} />;
      })}
      <button onClick={logout}>Log out</button>
    </main>
  );
}

export default Dashboard;
