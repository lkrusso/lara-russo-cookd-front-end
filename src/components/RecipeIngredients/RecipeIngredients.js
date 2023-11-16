import "./RecipeIngredients.scss";

function RecipeIngredients({ ingredients }) {
  return (
    <ul className="recipe__ingredients">
      Ingredients:
      {ingredients.map((ingredient) => {
        return <li className="recipe__ingredient">{ingredient}</li>;
      })}
    </ul>
  );
}

export default RecipeIngredients;
