import "./EditRecipe.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditRecipe() {
  let recipeID = 1;
  let fieldData = {};
  let updatedIngredients = [];
  let modifiedInstructions = [];
  let updatedRecipeDetails = {};
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({
    title: "",
    duration: "",
    serves: "",
    cuisine_type: "",
  });
  const [publish, setPublish] = useState({});
  //const [cookbookID, setCookbookID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/recipes/${recipeID}`
        );
        setFields(data[0]);
        return (fieldData = data[0]);
      } catch (error) {
        return console.error(error);
      }
    };
    const getIngredients = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/ingredients/${recipeID}`
        );
        setIngredients(data);
        console.log(ingredients);
        for (let i = 0; i < data.length; i++) {
          let currentIngredient = data[i].quantity + data[i].name;
          let currentIngredientName = `ingredient${i}`;
          fieldData[currentIngredientName] = currentIngredient;
        }
        return fieldData;
      } catch (error) {
        console.error(error);
      }
    };
    const getInstructions = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/instructions/${recipeID}`
        );
        setInstructions(data);
        for (let i = 0; i < data.length; i++) {
          let currentInstruction = data[i].instruction;
          let currentInstructionName = `instruction${i}`;
          fieldData[currentInstructionName] = currentInstruction;
        }
        setFields(fieldData);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipe().then(getIngredients).then(getInstructions);
  }, []);

  const checkField = (field) => {
    if (!field.value) {
      setErrors({
        ...errors,
        [field.name]: `Please fill in this field`,
      });
    } else {
      setErrors({ ...errors, [field.name]: "" });
    }
  };

  const updateFields = (event) => {
    const currentField = event.target;
    checkField(currentField);
    setFields({ ...fields, [currentField.name]: currentField.value });
    return;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const messages = {};
    const updatedRecipe = { ...fields };
    let updatedRecipeArray = Object.entries(updatedRecipe);
    let ingredientsArray = [];
    let instructionsArray = [];
    let recipeArray = [];
    updatedRecipeArray.forEach(([key, value]) => {
      if (key.includes(`ingredient`)) {
        ingredientsArray.push(["ingredient", value]);
      } else if (key.includes(`instruction`)) {
        instructionsArray.push(["instruction", value]);
      } else {
        recipeArray.push([key, value]);
      }
    });

    ingredientsArray.forEach(([key, value], index) => {
      let ingredient = {};
      let ingredientID = ingredients[index].id;
      let ingredientQuantity = value.match(/\d+/g);
      if (!ingredientQuantity) {
        messages["error"] =
          "Please ensure there is a quantity for the ingredient";
        setPublish(messages);
      }
      let ingredientName = value.match(/[A-Za-z ]/g).join("");
      ingredient.id = ingredientID;
      ingredient.quantity = ingredientQuantity[0];
      ingredient.name = ingredientName;
      ingredient.recipe_id = recipeID;
      updatedIngredients.push(ingredient);
    });
    console.log(updatedIngredients);

    try {
      await axios.patch(
        "http://localhost:5050/api/ingredients/edit",
        updatedIngredients
      );
    } catch (error) {
      console.error(error);
    }

    instructionsArray.forEach(([key, value], index) => {
      let instruction = {};
      let instructionID = instructions[index].id;
      instruction.id = instructionID;
      instruction.instruction = value;
      instruction.recipe_id = recipeID;
      modifiedInstructions.push(instruction);
    });
    let updatedInstructions = { instructions: modifiedInstructions };

    try {
      await axios.patch(
        "http://localhost:5050/api/instructions/edit",
        updatedInstructions
      );
    } catch (error) {
      console.error(error);
    }
    console.log(recipeArray);
    recipeArray.forEach(([key, value]) => {
      updatedRecipeDetails[key] = value;
    });
    delete updatedRecipeDetails.date_created;
    delete updatedRecipeDetails.date_last_cooked;

    try {
      await axios.patch(
        `http://localhost:5050/api/recipes/edit`,
        updatedRecipeDetails
      );
      messages["success"] = "Recipe successfully updated!";
      setPublish(messages);
      return setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error(error);
      messages["error"] = "Unable to update the recipe";
      setPublish(messages);
      return;
    }
  };

  return (
    <div className="edit-wrapper">
      <section className="edit-recipe">
        <div className="edit-recipe__header">
          <h1>Edit Recipe</h1>
        </div>
        <form className="edit-recipe__main" onSubmit={handleSubmit}>
          <div className="form-questions">
            <div className="recipe">
              <h3>Recipe Details</h3>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                onChange={updateFields}
                value={fields.title}
              />
              <p className="error-message">{errors.title}</p>
              <label htmlFor="duration">Duration in minutes</label>
              <input
                type="text"
                name="duration"
                onChange={updateFields}
                value={fields.duration}
              />
              <p className="error-message">{errors.duration}</p>
              <label htmlFor="serves">Serves</label>
              <input
                type="text"
                name="serves"
                onChange={updateFields}
                value={fields.serves}
              />
              <p className="error-message">{errors.serves}</p>
              <label htmlFor="cuisine_type">Type of cuisine</label>
              <input
                type="text"
                name="cuisine_type"
                onChange={updateFields}
                value={fields.cuisine_type}
              />
              <p className="error-message">{errors.cuisine_type}</p>
              {ingredients.map((ingredient, index) => {
                return (
                  <>
                    <label htmlFor={`ingredient${index}`} key={ingredient.id}>
                      Ingredient {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`ingredient${index}`}
                      name={`ingredient${index}`}
                      value={fields[`ingredient${index}`]}
                      onChange={updateFields}
                    />
                    <p className="error-message">
                      {errors[`ingredient${index}`]}
                    </p>
                  </>
                );
              })}
              {instructions.map((_instruction, index) => {
                return (
                  <>
                    <label htmlFor={`instruction${index}`} key={index}>
                      Instruction {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`instruction${index}`}
                      name={`instruction${index}`}
                      value={fields[`instruction${index}`]}
                      onChange={updateFields}
                    />
                    <p className="error-message">
                      {errors[`instruction${index}`]}
                    </p>
                  </>
                );
              })}
            </div>
          </div>
          {publish.success && (
            <p className="message message--success">{publish.success}</p>
          )}
          {publish.error && (
            <p className="message message--error">{publish.error}</p>
          )}
          <div className="btn-container">
            <button className="update-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditRecipe;
