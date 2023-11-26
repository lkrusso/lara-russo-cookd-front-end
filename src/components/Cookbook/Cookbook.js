import { IconContext } from "react-icons";
import * as mdIcons from "react-icons/md";
import "./Cookbook.scss";
import { Link } from "react-router-dom";

function Cookbook({ cookbook, handleDeleteCookbookClick, setClickedID }) {
  return (
    <IconContext.Provider value={{ color: "#4b6c37" }}>
      <article className="cookbook" key={cookbook.id}>
        <button
          className="cookbook__delete"
          onClick={() => {
            setClickedID(cookbook.id);
            handleDeleteCookbookClick();
          }}
        >
          <mdIcons.MdDelete />
        </button>
        <div className="cookbook__edit">
          <Link to={`/cookbooks/${cookbook.id}/edit`}>
            <mdIcons.MdEdit />
          </Link>
        </div>
        <Link className="cookbook__title" to={`/cookbooks/${cookbook.id}`}>
          {cookbook.name}
        </Link>
      </article>
    </IconContext.Provider>
  );
}

export default Cookbook;
