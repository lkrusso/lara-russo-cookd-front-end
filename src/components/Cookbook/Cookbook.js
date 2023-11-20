import "./Cookbook.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function Cookbook() {
  const selectedUserID = 1;
  const [isError, setIsError] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);

  useEffect(() => {
    const getCookbooks = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5050/api/cookbooks",
          { id: selectedUserID }
        );
        setCookbooks(data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    };
    getCookbooks();
  });
  return (
    <>
      {cookbooks.map((cookbook) => {
        return (
          <article className="cookbook">
            <h3 className="cookbook__title">{cookbook.name}</h3>
          </article>
        );
      })}
    </>
  );
}

export default Cookbook;
