import "./Dashboard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Cookbook from "../../components/Cookbook/Cookbook";
import * as mdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import DeleteRecipe from "../../components/DeleteRecipe/DeleteRecipe";
import DeleteCookbook from "../../components/DeleteCookbook/DeleteCookbook";

function Dashboard() {
  let { userID } = useParams();
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [cookbooks, setCookbooks] = useState([]);
  const [showDeleteRecipe, setShowDeleteRecipe] = useState(false);
  const [showDeleteCookbook, setShowDeleteCookbook] = useState(false);
  const [clickedID, setClickedID] = useState(false);
  const navigate = useNavigate();

  const handleDeleteRecipeClick = () => {
    setShowDeleteRecipe(true);
  };

  const handleDeleteCookbookClick = () => {
    setShowDeleteCookbook(true);
  };

  const getDisplayRecipes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5050/api/recipes/users/nocookbooks/${userID}`
      );
      setRecipes(data);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const getCookbooks = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5050/api/cookbooks/users/${userID}`
      );
      setCookbooks(data);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const login = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:5050/api/auth/details`,
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

  if (!recipes || !cookbooks) {
    return <p>Loading...</p>;
  }

  return (
    <IconContext.Provider value={{ color: "#4b6c37", size: 40 }}>
      <main className="dashboard">
        {showDeleteRecipe && (
          <DeleteRecipe
            clickedID={clickedID}
            setShowDeleteRecipe={setShowDeleteRecipe}
          />
        )}
        {showDeleteCookbook && (
          <DeleteCookbook
            clickedID={clickedID}
            setShowDeleteCookbook={setShowDeleteCookbook}
          />
        )}
        <h2 className="dashboard__subtitle">Cookbooks</h2>
        <div className="add-cookbook-btn">
          <Link to={`/user/${userData.id}/cookbooks/add`}>
            <mdIcons.MdAdd />
          </Link>
        </div>
        <div className="cookbooks">
          {cookbooks.map((cookbook) => {
            return (
              <Cookbook
                cookbook={cookbook}
                handleDeleteCookbookClick={handleDeleteCookbookClick}
                setClickedID={setClickedID}
              />
            );
          })}
        </div>
        <h2 className="dashboard__subtitle dashboard__subtitle--second">
          Recipes
        </h2>
        <div className="add-recipe-btn">
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
                handleDeleteRecipeClick={handleDeleteRecipeClick}
              />
            );
          })}
        </div>
      </main>
    </IconContext.Provider>
  );
}

export default Dashboard;
