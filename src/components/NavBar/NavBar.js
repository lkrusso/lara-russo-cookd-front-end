import { Link } from "react-router-dom";
import "./NavBar.scss";
import { navBarData } from "./NavBarData";
import { useState } from "react";
import * as mdIcons from "react-icons/md";

function NavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <mdIcons.MdMenu onclick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu--active" : "nav-menu"}>
        <ul className="nav-menu__items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <mdIcons.MdClose />
            </Link>
          </li>
          {navBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
