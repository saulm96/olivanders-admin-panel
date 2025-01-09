import "./navBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navBar">
      <ul className="navBar__list">
        <li>
          <NavLink
            to="/admin-panel/cores"
            className={({ isActive }) => (isActive ? "active-location" : "")}
          >
            Cores
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-panel/woods"
            className={({ isActive }) => (isActive ? "active-location" : "")}
          >
            Woods
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-panel/wandmakers"
            className={({ isActive }) => (isActive ? "active-location" : "")}
          >
            Wandmakers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-panel/wands"
            className={({ isActive }) => (isActive ? "active-location" : "")}
          >
            Wands
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-panel/languages"
            className={({ isActive }) => (isActive ? "active-location" : "")}
          >
            Languages
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
