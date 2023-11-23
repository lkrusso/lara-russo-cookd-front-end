import { useEffect, useState } from "react";
import "./AddCookbook.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCookbook() {
  const currentUserID = 1;
  let currentCookbookID = null;
  let updateRecipes = {};
  const navigate = useNavigate();
  const [publish, setPublish] = useState({});
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.post("http://localhost:5050/api/recipes", {
          id: currentUserID,
        });
        console.log(data);
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
      user_id: currentUserID,
      name: form.name.value,
    };

    const sendCookbook = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5050/api/cookbooks/add",
          cookbookResponse
        );
        currentCookbookID = data[0].id;

        let recipeList = [];
        checkBoxes.forEach((checkbox) => {
          if (checkbox.checked === true) {
            let chosenRecipe = { id: checkbox.id, user_id: currentUserID };
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
              "http://localhost:5050/api/recipes/update",
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
    <article className="add-cookbook">
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
                  <label>{recipe.title}</label>
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
        {publish.success && (
          <p className="message message--success">{publish.success}</p>
        )}
        {publish.error && (
          <p className="message message--error">{publish.error}</p>
        )}
        <button type="submit" className="add-recipe__submit">
          Submit
        </button>
      </form>
    </article>
  );
}

export default AddCookbook;
