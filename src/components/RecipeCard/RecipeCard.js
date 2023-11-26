import RecipeInstructions from "../RecipeInstructions/RecipeInstructions";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import "./RecipeCard.scss";
import * as mdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

function RecipeCard({ recipe, handleDeleteRecipeClick, setClickedID }) {
  return (
    <IconContext.Provider value={{ color: "#4b6c37", size: 30 }}>
      <article className="recipe-card" key={recipe.id}>
        <div className="recipe-card__buttons">
          <button
            className="recipe-card__delete"
            onClick={() => {
              setClickedID(recipe.id);
              handleDeleteRecipeClick();
            }}
          >
            <mdIcons.MdDelete />
          </button>
          <div className="recipe-card__edit">
            <Link to={`/recipes/${recipe.id}/edit`}>
              <mdIcons.MdEdit />
            </Link>
          </div>
        </div>
        <h3 className="recipe-card__name">{recipe.title}</h3>
        <img
          src={
            recipe.image_url ? recipe.image_url : "https://placehold.co/75x25"
          }
          alt={
            recipe.image_url ? `image of ${recipe.title}` : "placeholder image"
          }
          className="recipe-card__image"
        />
        <section className="recipe-card__details">
          <div className="recipe-card__left">
            <p className="recipe-card__duration">
              <span className="italic">Duration: </span>
              {recipe.duration}
            </p>
            <p className="recipe-card__serve">
              {" "}
              <span className="italic">Serves: </span>
              {recipe.serves}
            </p>
            <p className="recipe-card__type">
              <span className="italic">Type: </span>
              {recipe.cuisine_type}
            </p>
            <RecipeIngredients recipeID={recipe.id} />
          </div>
          <div className="recipe-card__right">
            <RecipeInstructions recipeID={recipe.id} />
          </div>
        </section>
        <section className="recipe-card__info">
          <p className="recipe-card__review">
            <span className="italic">Review: </span>
          </p>
          <div className="recipe-card__rating">
            <span className="italic">Rating: </span>
          </div>
          <p className="recipe-card__comments">
            Further comments about the recipe such as changes or thoughts
          </p>
        </section>
      </article>
    </IconContext.Provider>
  );
}

export default RecipeCard;
