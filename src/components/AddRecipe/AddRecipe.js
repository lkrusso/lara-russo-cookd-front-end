import "./AddRecipe.scss";
import { useState } from "react";

function AddRecipe() {
  const [publish, setPublish] = useState({});
  const [ingredientIndex, setIngredientIndex] = useState(1);
  const [instructionIndex, setInstructionIndex] = useState(1);
  const [addIngredientField, setAddIngredientField] = useState([]);
  const [addInstructionField, setAddInstructionField] = useState([]);

  let ingredientResponse = [];
  let instructionResponse = [];

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
      title: form.title.value,
      duration: form.duration.value,
      serves: form.serves.value,
      cuisine_type: form.cuisine_type.value,
    };

    ingredientResponse = [{ ingredient: form.ingredient.value }];
    if (addIngredientField.length > 0) {
      for (let i = 0; i < addIngredientField.length; i++) {
        ingredientResponse.push({ ingredient: addIngredientField[i].value });
      }
    }

    instructionResponse = [{ instruction: form.instruction.value }];
    if (addInstructionField.length > 0) {
      for (let i = 0; i < addInstructionField.length; i++) {
        instructionResponse.push({ instruction: addInstructionField[i].value });
      }
    }
  };

  const updateIngredientField = (event) => {
    const currentField = event.target;
    const currentIndex = addIngredientField
      .map((e) => e.id)
      .indexOf(currentField.id);
    addIngredientField[currentIndex].value = event.target.value;
    console.log(addIngredientField[currentIndex]);
  };

  const updateInstructionField = (event) => {
    const currentField = event.target;
    const currentIndex = addInstructionField
      .map((e) => e.id)
      .indexOf(currentField.id);
    addInstructionField[currentIndex].value = event.target.value;
    console.log(addInstructionField[currentIndex]);
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
    <article className="add-recipe">
      <form className="add-recipe__form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="field__label">
            Recipe title
          </label>
          <input type="text" id="title" name="title" className="field__input" />
        </div>
        <div className="field">
          <label htmlFor="duration" className="field__label">
            Duration
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
                Ingredient {index + 1}
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
        <button className="add-ingredient" onClick={addIngredient}>
          Add another ingredient
        </button>
        <button className="add-instruction" onClick={addInstruction}>
          Add another instruction
        </button>
        <button type="submit" className="add-recipe__submit">
          Submit
        </button>
      </form>
    </article>
  );
}

export default AddRecipe;
