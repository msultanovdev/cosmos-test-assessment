import { NavLink } from "react-router-dom";
import cl from "./Header.module.css";

const Header = () => {
  return (
    <header className={cl.header}>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? cl.active : "")}
      >
        Home
      </NavLink>
      <NavLink
        to={"map"}
        className={({ isActive }) => (isActive ? cl.active : "")}
      >
        Map
      </NavLink>
    </header>
  );
};

export default Header;
