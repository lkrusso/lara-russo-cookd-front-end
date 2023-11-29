import "./EditCookbook.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import * as mdIcons from "react-icons/md";
import Checkbox from "../Checkbox/Checkbox";

function EditCookbook() {
  const userID = sessionStorage.getItem("id");
  let { id } = useParams();
  const recipeList = [];
  let updatedDeselectedRecipes = [];
  let updatedSelectedRecipes = [];
  const [recipes, setRecipes] = useState([]);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({ title: "", recipe: "" });
  const [publish, setPublish] = useState({});

  useEffect(() => {
    const getCookbook = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/cookbooks/${id}`
        );
        setFields(data[0]);
      } catch (error) {
        return console.error(error);
      }
    };

    const getRecipes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/recipes/users/${userID}`
        );
        setRecipes(data);
        setFields({ ...fields, recipes });
      } catch (error) {
        console.error(error);
      }
    };

    getCookbook().then(getRecipes);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const messages = {};
    const form = event.target;
    console.log(form);
    recipes.forEach((recipe) => {
      let currentRecipe = form[`recipe${recipe.id}`];
      if (currentRecipe.checked) {
        updatedSelectedRecipes.push(recipe);
      } else {
        updatedDeselectedRecipes.push(recipe);
      }
    });
    console.log(updatedSelectedRecipes);
    console.log(updatedDeselectedRecipes);

    const updatedCookbook = {
      id: id,
      name: form.name.value,
      checkedRecipes: updatedSelectedRecipes,
      unCheckedRecipes: updatedDeselectedRecipes,
    };
    console.log(updatedCookbook);

    // create updated cookbook {id: id, name: updatedName, checkedRecipes: updatedCheckList, unCheckedRecipes: updatedUnCheckList}
  };

  return (
    <IconContext.Provider value={{ color: "#4b6c37", size: 30 }}>
      <section className="edit-cookbook">
        <div className="edit-cookbook__header">
          <div className="edit-cookbook__back">
            <Link to={`/user/${fields.user_id}`}>
              <mdIcons.MdArrowBack />
            </Link>
          </div>
          <h1 className="edit-cookbook__title">Edit Cookbook</h1>
        </div>
        <form className="edit-cookbook__main" onSubmit={handleSubmit}>
          <div className="form-questions">
            <h3>Cookbook Details</h3>
            <div className="edit">
              <label htmlFor="name" className="edit__label">
                Name
              </label>
              <input
                className="edit__input"
                type="text"
                name="name"
                onChange={updateFields}
                value={fields.name}
              />
            </div>
            <p className="error-message">{errors.name}</p>
            {recipes.map((recipe) => {
              return (
                <div className="field" key={recipe.id}>
                  <label htmlFor="recipe" className="field__label">
                    {recipe.title}
                  </label>
                  <Checkbox
                    type={"checkbox"}
                    className={"field_checkbox"}
                    name={`recipe${recipe.id}`}
                    id={recipe.id}
                    checkedStatus={recipe.cookbook_id === parseInt(id)}
                  />
                </div>
              );
            })}
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

export default EditCookbook;
