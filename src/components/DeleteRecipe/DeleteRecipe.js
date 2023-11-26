import "./DeleteRecipe.scss";
import * as mdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteRecipe({ clickedID, setShowDeleteRecipe }) {
  const [recipe, setRecipe] = useState([]);
  const [isRecipeError, setIsRecipeError] = useState(false);
  const currentRecipeID = clickedID;
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/recipes/${clickedID}`
        );
        console.log(data);
        setIsRecipeError(false);
        setRecipe(data[0]);
      } catch (error) {
        setIsRecipeError(true);
        return console.error(error);
      }
    };
    getRecipe();
  }, []);

  const handleDelete = () => {
    const sendDeleteRecipe = async () => {
      return await axios.delete(
        `http://localhost:5050/api/recipes/${currentRecipeID}/delete`
      );
    };
    sendDeleteRecipe();
    return setTimeout(() => {
      navigate(`/user/${recipe.user_id}`);
    }, 2500);
  };

  const handleCancel = () => {
    setShowDeleteRecipe(false);
  };

  if (isRecipeError) {
    return <p>Error getting recipe</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <IconContext.Provider value={{ color: "#4b6c37" }}>
      <div className="delete-recipe__wrapper">
        <section className="delete-recipe">
          <div className="delete-recipe__close-icon" onClick={handleCancel}>
            <mdIcons.MdClose />
          </div>
          <h2 className="delete-recipe__title">
            Delete recipe for "{recipe.title}"?
          </h2>
          <p className="delete-recipe__text">
            Please confirm that you’d like to delete the recipe for "
            {recipe.title}
            ".
          </p>
          <p className="delete-recipe__text">
            You won’t be able to undo this action.
          </p>
          <div className="btn-container">
            <button className="btn--delete" onClick={handleCancel}>
              Cancel
            </button>

            <button className="btn btn--delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </section>
      </div>
    </IconContext.Provider>
  );
}

export default DeleteRecipe;
