import "./EditRecipe.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditRecipe() {
  let recipeID = 1;
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({
    title: "",
    duration: "",
    serves: "",
    cuisine_type: "",
  });
  //const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/recipes/${recipeID}`
        );
        setFields(data[0]);
      } catch (err) {
        return console.error(err);
      }
    };
    getRecipe();
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
                name={"title"}
                onChange={updateFields}
                value={fields.title}
              />
              <p className="error-message">{errors.title}</p>
              <label htmlFor="duration">Duration in minutes</label>
              <input
                type="text"
                name={"duration"}
                onChange={updateFields}
                value={fields.duration}
              />
              <p className="error-message">{errors.duration}</p>
              <label htmlFor="serves">Serves</label>
              <input
                type="text"
                name={"serves"}
                onChange={updateFields}
                value={fields.serves}
              />
              <p className="error-message">{errors.serves}</p>
              <label htmlFor="cuisine_type">Type of cuisine</label>
              <input
                type="text"
                name={"cuisine_type"}
                onChange={updateFields}
                value={fields.serves}
              />
              <p className="error-message">{errors.cuisine_type}</p>
              <label htmlFor="cookbook__name">Cookbook name</label>
              <input
                type="text"
                name={"cookbook_name"}
                onChange={updateFields}
                value={fields.cookbook_name}
              />
              {/* <p className="error-message">{errors.cookbook_name}</p> */}
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
