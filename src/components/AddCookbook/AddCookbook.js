import { useEffect, useState } from "react";
import "./AddCookbook.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IconContext } from "react-icons";
import * as mdIcons from "react-icons/md";

function AddCookbook() {
  const userID = sessionStorage.getItem("id");
  let currentCookbookID = null;
  const navigate = useNavigate();
  const [publish, setPublish] = useState({});
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/recipes/users/nocookbooks/${userID}`
        );
        setRecipes(data);
      } catch (error) {
        console.error(error);
        return;
      }
    };
    getRecipes();
  }, []);

  if (!recipes) {
    return (
      <div className="add-cookbook__header">
        <IconContext.Provider value={{ color: "#4b6c37", size: 30 }}>
          <div className="add-cookbook__back">
            <Link to={`/user/${userID}`}>
              <mdIcons.MdArrowBack />
            </Link>
          </div>
          <p className="add-cookbook__title">
            No recipes to store into the cookbook! Please make a recipe first!
          </p>
        </IconContext.Provider>
      </div>
    );
  }

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
      user_id: parseInt(userID),
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

    messages["success"] = "Cookbook created successfully!";
    setPublish(messages);
    return setTimeout(() => {
      navigate(`/user/${userID}`);
    }, 2500);
  };
  return (
    <IconContext.Provider value={{ color: "#4b6c37", size: 30 }}>
      <main className="add-cookbook">
        <div className="add-cookbook__header">
          <div className="add-cookbook__back">
            <Link to={`/user/${userID}`}>
              <mdIcons.MdArrowBack />
            </Link>
          </div>
          <h1 className="add-cookbook__title">Add Cookbook</h1>
        </div>
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
    </IconContext.Provider>
  );
}

export default AddCookbook;
