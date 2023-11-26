import { Link, useNavigate, useParams } from "react-router-dom";
import "./NavBar.scss";
import { useState } from "react";
import * as mdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import logo from "../../assets/logo.png";

function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const logoutButton = () => {
    showSidebar();
    logout();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fefae0" }}>
        <div className="navbar">
          <div className="menu-bars" onClick={showSidebar}>
            <mdIcons.MdMenu />
          </div>
          <div className="logo-container">
            <img className="logo" src={logo} alt="Cookd logo" />
          </div>
        </div>
        <nav
          className={
            sidebar
              ? "nav-menu nav-menu--active"
              : "nav-menu nav-menu--inactive"
          }
        >
          <ul className="nav-menu__items">
            <li className="navbar-toggle" onClick={showSidebar}>
              <div className="menu-bars cross-icon">
                <mdIcons.MdClose />
              </div>
            </li>

            <li className="nav-text" onClick={showSidebar}>
              <Link to="*">
                <mdIcons.MdRestaurantMenu />
                <span>Recipes</span>
              </Link>
            </li>

            <li className="nav-text" onClick={showSidebar}>
              <Link to="*">
                <mdIcons.MdMenuBook />
                <span>Menu board</span>
              </Link>
            </li>

            <li className="nav-text" onClick={logoutButton}>
              <mdIcons.MdLogout />
              <span>Log out</span>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
