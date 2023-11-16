import RecipeInstructions from "../RecipeInstructions/RecipeInstructions";
import "./RecipeCard.scss";

function RecipeCard({ recipe }) {
  return (
    <article className="recipe">
      <h3 className="recipe__name">Recipe name</h3>
      <img
        src="https://placehold.co/75x25"
        alt="placeholder image"
        className="recipe__image"
      />
      <section className="recipe__details">
        <p className="recipe__duration">Duration:</p>
        <p className="recipe__serve">Serves:</p>
        <p className="recipe__type">Type: </p>
        <div className="recipe__further-details">
          <ul className="recipe__ingredients">
            {" "}
            Ingredients:
            <li>Ingredient one</li>
            <li>Ingredient two</li>
          </ul>
          <RecipeInstructions
            instructions={["Instruction one", "Instruction two"]}
          />
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
