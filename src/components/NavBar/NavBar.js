import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useState } from "react";
import * as mdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import logo from "../../assets/logo.png";

function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  //const navigate = useNavigate();

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  //   const logout = () => {
  //     sessionStorage.removeItem("token");
  //     navigate("/login");
  //   };
  return (
    <>
      <IconContext.Provider value={{ color: "#fefae0" }}>
        <div className="navbar">
          <div
            className={sidebar ? "menu-bars menu-bars--inactive" : "menu-bars"}
            onClick={showSidebar}
          >
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
            <li className="navbar-toggle">
              <div className="menu-bars cross-icon">
                <mdIcons.MdClose />
              </div>
            </li>

            <li
              className="nav-text"
              onclick={() => {
                setSidebar(!sidebar);
              }}
            >
              <Link to="">
                <mdIcons.MdRestaurantMenu />
                <span>Recipes</span>
              </Link>
            </li>

            <li
              className="nav-text"
              onclick={() => {
                setSidebar(!sidebar);
              }}
            >
              <Link to="">
                <mdIcons.MdMenuBook />
                <span>Menu board</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="">
                <mdIcons.MdLogout />
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
