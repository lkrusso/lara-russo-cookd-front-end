import "./EditRecipe.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import * as mdIcons from "react-icons/md";

function EditRecipe() {
  let { id } = useParams();
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
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/recipes/${id}`
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
          `http://localhost:5050/api/ingredients/${id}`
        );
        setIngredients(data);
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
          `http://localhost:5050/api/instructions/${id}`
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
      ingredient.recipe_id = id;
      updatedIngredients.push(ingredient);
    });
    console.log(updatedIngredients);

    try {
      await axios.patch(
        `http://localhost:5050/api/ingredients/edit`,
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
      instruction.recipe_id = id;
      modifiedInstructions.push(instruction);
    });
    let updatedInstructions = { instructions: modifiedInstructions };

    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL} + ${process.env.REACT_APP_}}/api/instructions/edit`,
        updatedInstructions
      );
    } catch (error) {
      console.error(error);
    }
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
        navigate(`/user/${updatedRecipeDetails.user_id}`);
      }, 2500);
    } catch (error) {
      console.error(error);
      messages["error"] = "Unable to update the recipe";
      setPublish(messages);
      return;
    }
  };

  return (
    <IconContext.Provider value={{ color: "#4b6c37", size: 30 }}>
      <section className="edit-recipe">
        <div className="edit-recipe__header">
          <div className="edit-recipe__back">
            <Link to={`/user/${fields.user_id}`}>
              <mdIcons.MdArrowBack />
            </Link>
          </div>
          <h1 className="edit-recipe__title">Edit Recipe</h1>
        </div>
        <form className="edit-recipe__main" onSubmit={handleSubmit}>
          <div className="form-questions">
            <div className="recipe">
              <h3>Recipe Details</h3>
              <div className="edit">
                <label htmlFor="title" className="edit__label">
                  Title
                </label>
                <input
                  className="edit__input"
                  type="text"
                  name="title"
                  onChange={updateFields}
                  value={fields.title}
                />
              </div>
              <p className="error-message">{errors.title}</p>
              <div className="edit">
                <label className="edit__label" htmlFor="duration">
                  Duration in minutes
                </label>
                <input
                  className="edit__input"
                  type="text"
                  name="duration"
                  onChange={updateFields}
                  value={fields.duration}
                />
              </div>

              <p className="error-message">{errors.duration}</p>
              <div className="edit">
                <label className="edit__label" htmlFor="serves">
                  Serves
                </label>
                <input
                  className="edit__input"
                  type="text"
                  name="serves"
                  onChange={updateFields}
                  value={fields.serves}
                />
              </div>

              <p className="error-message">{errors.serves}</p>
              <div className="edit">
                <label className="edit__label" htmlFor="cuisine_type">
                  Type of cuisine
                </label>
                <input
                  className="edit__input"
                  type="text"
                  name="cuisine_type"
                  onChange={updateFields}
                  value={fields.cuisine_type}
                />
              </div>
              <p className="error-message">{errors.cuisine_type}</p>
              {ingredients.map((ingredient, index) => {
                return (
                  <div className="edit">
                    <label
                      className="edit__label"
                      htmlFor={`ingredient${index}`}
                      key={ingredient.id}
                    >
                      Ingredient {index + 1}
                    </label>
                    <input
                      className="edit__input"
                      type="text"
                      id={`ingredient${index}`}
                      name={`ingredient${index}`}
                      value={fields[`ingredient${index}`]}
                      onChange={updateFields}
                    />
                    <p className="error-message">
                      {errors[`ingredient${index}`]}
                    </p>
                  </div>
                );
              })}
              {instructions.map((_instruction, index) => {
                return (
                  <div className="edit">
                    <label
                      className="edit__label"
                      htmlFor={`instruction${index}`}
                      key={index}
                    >
                      Instruction {index + 1}{" "}
                    </label>
                    <input
                      className="edit__input"
                      type="text"
                      id={`instruction${index}`}
                      name={`instruction${index}`}
                      value={fields[`instruction${index}`]}
                      onChange={updateFields}
                    />
                    <p className="error-message">
                      {errors[`instruction${index}`]}
                    </p>
                  </div>
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
          <button className="update-btn" type="submit">
            Update
          </button>
        </form>
      </section>
    </IconContext.Provider>
  );
}

export default EditRecipe;
