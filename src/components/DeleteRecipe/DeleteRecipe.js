import "./DeleteRecipe.scss";
import * as mdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function DeleteRecipe({ clickedID, setShowDeleteModal }) {
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
      navigate("/");
    }, 2500);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  if (isRecipeError) {
    return <p>Error getting recipe</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <section className="delete-recipe">
      <div className="delete-recipe__close-icon" onClick={handleCancel}>
        <mdIcons.MdClose />
      </div>
      <h2 className="delete-recipe__title">Delete recipe "{recipe.title}"?</h2>
      <p className="delete-recipe__text">
        Please confirm that you’d like to delete the recipe for "{recipe.title}
        ". You won’t be able to undo this action.
      </p>

      <div className="btn-div">
        <Link className="cancel__link" to={`/user/${recipe.user_id}`}>
          Cancel
        </Link>

        <button className="btn btn--delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </section>
  );
}

export default DeleteRecipe;
