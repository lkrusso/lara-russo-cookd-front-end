import "./RecipeIngredients.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeIngredients({ recipeID }) {
  const [isError, setIsError] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}${process.env.SERVER_PORT}/api/ingredients/${recipeID}`
        );
        setIngredients(data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    };
    getIngredients();
  }, []);

  if (isError) {
    return <p>Error</p>;
  }
  if (!ingredients) {
    return <p>Loading...</p>;
  }
  return (
    <ul className="recipe-card__ingredients">
      <span className="italic">Ingredients: </span>
      {ingredients.map((ingredient) => {
        return (
          <li className="recipe-card__ingredient" key={ingredient.id}>
            {ingredient.quantity} {ingredient.name}
          </li>
        );
      })}
    </ul>
  );
}

export default RecipeIngredients;
