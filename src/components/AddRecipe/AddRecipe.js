import "./AddRecipe.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as mdIcons from "react-icons/md";

function AddRecipe() {
  const userID = sessionStorage.getItem("id");
  let currentRecipeID = "";
  const navigate = useNavigate();
  const [publish, setPublish] = useState({});
  const [ingredientIndex, setIngredientIndex] = useState(1);
  const [instructionIndex, setInstructionIndex] = useState(1);
  const [addIngredientField, setAddIngredientField] = useState([]);
  const [addInstructionField, setAddInstructionField] = useState([]);

  let ingredientList = [];
  let instructionList = [];

  const handleSubmit = (event) => {
    event.preventDefault();
    const messages = {};
    const form = event.target;

    if (
      !form.title ||
      !form.duration ||
      !form.serves ||
      !form.cuisine_type ||
      !form.ingredient ||
      !form.instruction
    ) {
      console.error();
      messages["error"] = "Please ensure all fields are filled in";
      setPublish(messages);
      return;
    }

    const recipeResponse = {
      user_id: parseInt(userID),
      title: form.title.value,
      duration: parseInt(form.duration.value),
      serves: parseInt(form.serves.value),
      cuisine_type: form.cuisine_type.value,
    };

    const sendRecipe = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/recipes/add`,
        recipeResponse
      );
      currentRecipeID = data[0].id;
      return currentRecipeID;
    };

    let quantity = form.ingredient.value.match(/\d+/g);
    let ingredientName = form.ingredient.value.match(/[A-Za-z ]/g).join("");

    ingredientList = [
      {
        ingredient: ingredientName,
        quantity: quantity[0],
      },
    ];

    if (addIngredientField.length > 0) {
      for (let i = 0; i < addIngredientField.length; i++) {
        let quantity = addIngredientField[i].value.match(/\d+/g);
        let alteredIngredientName = addIngredientField[i].value
          .match(/[A-Za-z ]/g)
          .join("");
        ingredientList.push({
          ingredient: alteredIngredientName,
          quantity: quantity[0],
        });
      }
    }

    const sendIngredients = async () => {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/ingredients/add`,
        {
          ingredientList: ingredientList,
          recipe_id: currentRecipeID,
        }
      );
    };

    instructionList = [{ instruction: form.instruction.value }];

    if (addInstructionField.length > 0) {
      for (let i = 0; i < addInstructionField.length; i++) {
        instructionList.push({ instruction: addInstructionField[i].value });
      }
    }

    const sendInstructions = async () => {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/instructions/add`,
        {
          instructionList: instructionList,
          recipe_id: currentRecipeID,
        }
      );
    };

    sendRecipe().then(sendIngredients).then(sendInstructions);
    setAddIngredientField([]);
    setAddInstructionField([]);

    messages["success"] = "Recipe created successfully!";
    setPublish(messages);
    return setTimeout(() => {
      navigate(`/user/${userID}`);
    }, 2500);
  };

  const updateIngredientField = (event) => {
    const currentField = event.target;
    const currentIndex = addIngredientField
      .map((e) => e.id)
      .indexOf(currentField.id);
    addIngredientField[currentIndex].value = event.target.value;
  };

  const updateInstructionField = (event) => {
    const currentField = event.target;
    const currentIndex = addInstructionField
      .map((e) => e.id)
      .indexOf(currentField.id);
    addInstructionField[currentIndex].value = event.target.value;
  };

  const addIngredient = (event) => {
    event.preventDefault();
    let newIngredientField = {
      htmlFor: `ingredient${ingredientIndex}`,
      id: `ingredient${ingredientIndex}`,
      name: `ingredient${ingredientIndex}`,
    };
    setAddIngredientField([...addIngredientField, newIngredientField]);
    let newIngredientIndex = ingredientIndex + 1;
    setIngredientIndex(newIngredientIndex);
    return;
  };

  const addInstruction = (event) => {
    event.preventDefault();
    let newInstructionField = {
      htmlFor: `instruction${instructionIndex}`,
      id: `instruction${instructionIndex}`,
      name: `instruction${instructionIndex}`,
    };
    setAddInstructionField([...addInstructionField, newInstructionField]);
    let newInstructionIndex = instructionIndex + 1;
    setInstructionIndex(newInstructionIndex);
    return;
  };

  return (
    <IconContext.Provider value={{ color: "#4b6c37", size: 30 }}>
      <main className="add-recipe">
        <div className="add-recipe__header">
          <div className="add-recipe__back">
            <Link to={`/user/${userID}`}>
              <mdIcons.MdArrowBack />
            </Link>
          </div>
          <h1 className="add-recipe__title">Add Recipe</h1>
        </div>
        <form className="add-recipe__form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title" className="field__label">
              Recipe title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="duration" className="field__label">
              Duration in minutes
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="serves" className="field__label">
              Serves
            </label>
            <input
              type="text"
              id="serves"
              name="serves"
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="cuisine_type" className="field__label">
              Type
            </label>
            <input
              type="text"
              id="cuisine_type"
              name="cuisine_type"
              className="field__input"
            />
          </div>
          <div className="field">
            <label htmlFor="ingredient1" className="field__label">
              Ingredient
            </label>
            <input
              type="text"
              id="ingredient"
              name="ingredient"
              className="field__input"
            />
          </div>
          {addIngredientField.map((input, index) => {
            return (
              <div className="field" key={index}>
                <label htmlFor={input.htmlFor} className="field__label">
                  Ingredient {index + 2}
                </label>
                <input
                  type="text"
                  id={input.id}
                  name={input.name}
                  className="field__input"
                  onChange={updateIngredientField}
                />
              </div>
            );
          })}
          <div className="field">
            <label htmlFor="instruction" className="field__label">
              Instruction
            </label>
            <input
              type="text"
              id="instruction"
              name="instruction"
              className="field__input"
            />
          </div>
          {addInstructionField.map((input, index) => {
            return (
              <div className="field" key={index}>
                <label htmlFor={input.htmlFor} className="field__label">
                  Instruction {index + 1}
                </label>
                <input
                  type="text"
                  id={input.id}
                  name={input.name}
                  className="field__input"
                  onChange={updateInstructionField}
                />
              </div>
            );
          })}
          {publish.success && (
            <p className="message message--success">{publish.success}</p>
          )}
          {publish.error && (
            <p className="message message--error">{publish.error}</p>
          )}
          <div className="container">
            <button
              className="button add-ingredient--btn"
              onClick={addIngredient}
            >
              Add another ingredient
            </button>
            <button
              className="button add-instructon--btn"
              onClick={addInstruction}
            >
              Add another instruction
            </button>
          </div>
          <button type="submit" className="button add-recipe__submit">
            Submit
          </button>
        </form>
      </main>
    </IconContext.Provider>
  );
}

export default AddRecipe;
