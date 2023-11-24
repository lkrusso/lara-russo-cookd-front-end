import "./EditRecipe.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditRecipe() {
  let recipeID = 1;
  let recipeData;
  let fieldData = {};
  const ingredientList = {};
  const [ingredients, setIngredients] = useState([]);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({
    title: "",
    duration: "",
    serves: "",
    cuisine_type: "",
  });
  //const [cookbookID, setCookbookID] = useState(null);
  //const navigate = useNavigate();

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
        const { data } = await axios.post(
          `http://localhost:5050/api/ingredients`,
          { recipe_id: recipeID }
        );
        setIngredients(data);

        for (let i = 0; i < data.length; i++) {
          let currentIngredient = data[i].quantity + " " + data[i].name;
          let currentIngredientName = `ingredient${i}`;
          fieldData[currentIngredientName] = currentIngredient;
        }
        console.log(fieldData);
        setFields(fieldData);
        console.log(fields);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipe().then(getIngredients);
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
    console.log(currentField);
    console.log(currentField.name);
    console.log(currentField.value);
    checkField(currentField);
    setFields({ ...fields, [currentField.name]: currentField.value });
    return;
  };

  return (
    <div className="edit-wrapper">
      <section className="edit-recipe">
        <div className="edit-recipe__header">
          <h1>Edit Recipe</h1>
        </div>
        <form className="edit-recipe__main">
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
            </div>
          </div>
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
