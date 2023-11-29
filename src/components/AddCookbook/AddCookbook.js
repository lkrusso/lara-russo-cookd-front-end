import { useEffect, useState } from "react";
import "./AddCookbook.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddCookbook() {
  let { userID } = useParams();
  let currentCookbookID = null;
  const navigate = useNavigate();
  const [publish, setPublish] = useState({});
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/recipes/users/${userID}`
        );
        setRecipes(data);
      } catch (error) {
        console.error(error);
        return;
      }
    };
    getRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messages = {};
    const form = event.target;
    let checkBoxes = document.querySelectorAll("input.field__checkbox");
    let isOneChecked = Array.prototype.slice
      .call(checkBoxes)
      .some((x) => x.checked);

    if (!form.name.value || !isOneChecked) {
      console.error();
      messages["error"] = "Please ensure all fields are filled in";
      setPublish(messages);
      return;
    }

    const cookbookResponse = {
      user_id: userID,
      name: form.name.value,
    };

    const sendCookbook = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/cookbooks/add`,
          cookbookResponse
        );
        currentCookbookID = data[0].id;

        let recipeList = [];
        checkBoxes.forEach((checkbox) => {
          if (checkbox.checked === true) {
            let chosenRecipe = { id: checkbox.id, user_id: userID };
            recipeList.push(chosenRecipe);
          }
        });

        const updateRecipes = {
          cookbookID: currentCookbookID,
          recipeList: recipeList,
        };

        const sendRecipes = async () => {
          try {
            await axios.patch(
              `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/recipes/update`,
              updateRecipes
            );
            return;
          } catch (error) {
            console.error(error);
            messages["error"] = "There was an error creating the recipe";
            setPublish(messages);
            return;
          }
        };
        sendRecipes();
        return;
      } catch (error) {
        console.error(error);
        messages["error"] = "There was an error creating the recipe";
        setPublish(messages);
        return;
      }
    };

    sendCookbook();

    messages["success"] = "Recipe created successfully!";
    setPublish(messages);
    return setTimeout(() => {
      navigate("/");
    }, 2500);
  };
  return (
    <main className="add-cookbook">
      <h1 className="add-cookbook__title">Add a new cookbook</h1>
      <form className="add-cookbook__form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name" className="field__label">
            Cookbook title
          </label>
          <input type="text" id="name" name="name" className="field__input" />
        </div>
        <div className="field">
          <label htmlFor="duration" className="field__label">
            Recipes
          </label>
          {recipes &&
            recipes.map((recipe) => {
              return (
                <div className="field" key={recipe.id}>
                  <label className="field__label field__label--recipes">
                    {recipe.title}
                  </label>
                  <input
                    type="checkbox"
                    id={recipe.id}
                    name="recipe"
                    className="field__checkbox"
                  />
                </div>
              );
            })}
        </div>
        <button type="submit" className="add-cookbook__submit">
          Submit
        </button>
        {publish.success && (
          <p className="message message--success">{publish.success}</p>
        )}
        {publish.error && (
          <p className="message message--error">{publish.error}</p>
        )}
      </form>
    </main>
  );
}

export default AddCookbook;
