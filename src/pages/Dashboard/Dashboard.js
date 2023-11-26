import "./Dashboard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Cookbook from "../../components/Cookbook/Cookbook";
import * as mdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import DeleteRecipe from "../../components/DeleteRecipe/DeleteRecipe";

function Dashboard() {
  let { userID } = useParams();
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isRecipeError, setIsRecipeError] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isCookbookError, setIsCookbookError] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clickedID, setClickedID] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const getDisplayRecipes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5050/api/recipes/users/nocookbooks/${userID}`
      );
      setRecipes(data);
      setIsRecipeError(false);
      return;
    } catch (error) {
      console.error(error);
      setIsRecipeError(true);
      return;
    }
  };

  const getCookbooks = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5050/api/cookbooks/users/${userID}`
      );
      setCookbooks(data);
      setIsCookbookError(false);
    } catch (error) {
      console.error(error);
      setIsCookbookError(true);
      return;
    }
  };

  const login = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:5050/api/auth/details",
        { headers: { Authorization: "Bearer " + token } }
      );
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setFailedAuth(true);
      return;
    }
    return;
  };

  useEffect(() => {
    login();
    getCookbooks();
    getDisplayRecipes();
  }, []);

  const redirectLogin = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  if (failedAuth) {
    return (
      <>
        <main className="dashboard">You must log in to see this page</main>
        <button className="redirect-button" onClick={redirectLogin}>
          Return to login page
        </button>
      </>
    );
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

  // const seeCookbookDetails = (event) => {
  //   navigate("/cookbook");
  // };

  return (
    <IconContext.Provider value={{ color: "#4b6c37" }}>
      <main className="dashboard">
        {showDeleteModal && (
          <DeleteRecipe
            clickedID={clickedID}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
        <h2 className="dashboard__subtitle">Cookbooks</h2>
        <div className="add-cookbook">
          <Link to={`/user/${userData.id}/cookbooks/add`}>
            <mdIcons.MdAdd />
          </Link>
        </div>
        <div className="cookbooks">
          {cookbooks.map((cookbook) => {
            return <Cookbook cookbook={cookbook} />;
          })}
        </div>
        <h2 className="dashboard__subtitle">Recipes</h2>
        <div className="add-recipe">
          <Link to={`/user/${userData.id}/recipes/add`}>
            <mdIcons.MdAdd />
          </Link>
        </div>
        <div className="recipes">
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                recipe={recipe}
                setClickedID={setClickedID}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })}
        </div>
      </main>
    </IconContext.Provider>
  );
}

export default Dashboard;
