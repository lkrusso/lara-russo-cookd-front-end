import "./RecipeInstructions.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function RecipeInstructions({ recipeID }) {
  const [isError, setIsError] = useState(false);
  const [instructions, setInstructions] = useState([]);
  useEffect(() => {
    const getInstructions = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5050/api/instructions",
          {
            id: recipeID,
          }
        );
        setInstructions(data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    };
    getInstructions();
  }, []);

  if (isError) {
    return <p>Error</p>;
  }
  if (!instructions) {
    return <p>Loading...</p>;
  }
  return (
    <ol className="recipe__instructions">
      Instructions:
      {instructions.map((instruction) => {
        return (
          <li className="recipe__instruction" key={instruction.id}>
            {instruction.instruction}
          </li>
        );
      })}
    </ol>
  );
}

export default RecipeInstructions;
