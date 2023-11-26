import { useEffect } from "react";
import "./CookbookPage.scss";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import DeleteRecipe from "../../components/DeleteRecipe/DeleteRecipe";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

function CookbookPage() {
  let { id } = useParams();
  const [cookbookDetails, setCookbookDetails] = useState([]);
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [cookbookRecipes, setCookbookRecipes] = useState([]);
  const [clickedID, setClickedID] = useState(false);
  const [showDeleteRecipe, setShowDeleteRecipe] = useState(false);

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

  const getCookbookRecipes = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5050/api/cookbooks/${id}/recipes`
      );
      if (!data) {
        return <p>Loading...</p>;
      }
      setCookbookRecipes(data);
    } catch (error) {
      return <p>Error loading recipes...</p>;
    }
  };

  const getSelectedCookbook = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5050/api/cookbooks/${id}`
      );
      if (!data) {
        return <p>Loading...</p>;
      }
      setCookbookDetails(data);
    } catch (error) {
      return <p>Error loading cookbook...</p>;
    }
  };

  const handleDeleteRecipeClick = () => {
    setShowDeleteRecipe(true);
  };

  useEffect(() => {
    login();
    getSelectedCookbook();
    getCookbookRecipes();
  }, []);

  if (cookbookDetails.length === 0) {
    return <p>There are no recipes stored in this cookbook!</p>;
  }

  return (
    <>
      <main className="cookbook__page">
        {showDeleteRecipe && (
          <DeleteRecipe
            clickedID={clickedID}
            setShowDeleteRecipe={setShowDeleteRecipe}
          />
        )}
        <h2 className="cookbook__header">{cookbookDetails.name}</h2>
        <div className="cookbook__recipes">
          {cookbookRecipes.map((recipe) => {
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
    </>
  );
}

export default CookbookPage;
