import "./AddRecipe.scss";
import { useState } from "react";

function AddRecipe() {
  const [ingredientIndex, setIngredientIndex] = useState(1);
  const [instructionIndex, setInstructionIndex] = useState(1);
  const [addIngredientField, setAddIngredientField] = useState([]);
  const [addInstructionField, setAddInstructionField] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addIngredient = () => {
    let newIngredientField = {
      htmlFor: `ingredient${ingredientIndex}`,
      id: `ingredient${ingredientIndex}`,
      name: `ingredient${ingredientIndex}`,
    };
    setAddIngredientField([...addIngredientField, newIngredientField]);
    let newIngredientIndex = ingredientIndex + 1;
    setIngredientIndex(newIngredientIndex);
  };

  const addInstruction = () => {
    let newInstructionField = {
      htmlFor: `instruction${instructionIndex}`,
      id: `instruction${instructionIndex}`,
      name: `instruction${instructionIndex}`,
    };
    setAddInstructionField([...addInstructionField, newInstructionField]);
    let newInstructionIndex = instructionIndex + 1;
    setInstructionIndex(newInstructionIndex);
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
            id="ingredient1"
            name="ingredient1"
            className="field__input"
          />
        </div>
        {addIngredientField.map((input, index) => {
          return (
            <div className="field">
              <label htmlFor={input.htmlFor} className="field__label">
                Ingredient {index + 1}
              </label>
              <input
                type="text"
                id={input.id}
                name={input.name}
                className="field__input"
              />
            </div>
          );
        })}
        <div className="field">
          <label htmlFor="instruction1" className="field__label">
            Instruction
          </label>
          <input
            type="text"
            id="instruction1"
            name="instruction1"
            className="field__input"
          />
        </div>
        {addInstructionField.map((input, index) => {
          return (
            <div className="field">
              <label htmlFor={input.htmlFor} className="field__label">
                Instruction {index + 1}
              </label>
              <input
                type="text"
                id={input.id}
                name={input.name}
                className="field__input"
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
