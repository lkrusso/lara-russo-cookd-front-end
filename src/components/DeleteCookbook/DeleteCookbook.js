import "./DeleteCookbook.scss";
import * as mdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteCookbook({ clickedID, setShowDeleteCookbook }) {
  const [cookbook, setCookbook] = useState([]);
  const [isCookbookError, setIsCookbookError] = useState(false);
  const currentCookbookID = clickedID;
  const navigate = useNavigate();

  useEffect(() => {
    const getCookbook = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/cookbooks/${clickedID}`
        );
        setIsCookbookError(false);
        setCookbook(data[0]);
      } catch (error) {
        setIsCookbookError(true);
        return console.error(error);
      }
    };
    getCookbook();
  }, []);

  const handleDelete = () => {
    const sendDeleteCookbook = async () => {
      return await axios.delete(
        `http://localhost:5050/api/cookbooks/${currentCookbookID}/delete`
      );
    };
    sendDeleteCookbook();
    setShowDeleteCookbook(false);
    return setTimeout(() => {
      navigate(`/user/${cookbook.user_id}`);
    }, 2500);
  };

  const handleCancel = () => {
    setShowDeleteCookbook(false);
  };

  if (isCookbookError) {
    return <p>Error getting cookbook</p>;
  }

  if (!cookbook) {
    return <p>Loading...</p>;
  }

  return (
    <IconContext.Provider value={{ color: "#4b6c37" }}>
      <div className="delete-cookbook__wrapper">
        <section className="delete-cookbook">
          <div className="delete-cookbook__close-icon" onClick={handleCancel}>
            <mdIcons.MdClose />
          </div>
          <h2 className="delete-cookbook__name">
            Delete cookbook "{cookbook.name}"?
          </h2>
          <p className="delete-cookbook__text">
            Please confirm that you’d like to delete the cookbook named "
            {cookbook.name}
            ". You won’t be able to undo this action.
          </p>
          <div className="btn-container">
            <button className="btn--delete" onClick={handleCancel}>
              Cancel
            </button>

            <button className="btn btn--delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </section>
      </div>
    </IconContext.Provider>
  );
}

export default DeleteCookbook;
