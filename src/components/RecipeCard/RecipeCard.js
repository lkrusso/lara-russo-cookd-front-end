import RecipeInstructions from "../RecipeInstructions/RecipeInstructions";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import "./RecipeCard.scss";
import { useEffect } from "react";

function RecipeCard({ recipe }) {
  useEffect(async () => {}, []);
  return (
    <article className="recipe">
      <h3 className="recipe__name">{recipe.title}</h3>
      <img
        src={recipe.image_url ? recipe.image_url : "https://placehold.co/75x25"}
        alt={
          recipe.image_url ? `image of ${recipe.title}` : "placeholder image"
        }
        className="recipe__image"
      />
      <section className="recipe__details">
        <p className="recipe__duration">Duration: {recipe.duration}</p>
        <p className="recipe__serve">Serves: {recipe.serves}</p>
        <p className="recipe__type">Type: {recipe.cuisine_type}</p>
        <div className="recipe__further-details">
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipeInstructions instructions={recipe.instructions} />
        </div>
      </section>
      <section className="recipe__info">
        <p className="recipe__review">Review:</p>
        <div className="recipe__rating">Rating:</div>
        <p className="recipe__comments">
          Further comments about the recipe such as changes or thoughts
        </p>
      </section>
    </article>
  );
}

export default RecipeCard;
