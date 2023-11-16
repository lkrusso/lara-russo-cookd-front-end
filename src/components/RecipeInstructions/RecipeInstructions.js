import "./RecipeInstructions.scss";

function RecipeInstructions({ instructions }) {
  return (
    <ol className="recipe__instructions">
      Instructions:
      {instructions.map((instruction) => {
        return <li className="recipe__instruction">{instruction}</li>;
      })}
    </ol>
  );
}

export default RecipeInstructions;
