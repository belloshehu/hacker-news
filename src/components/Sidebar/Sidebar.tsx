import { NavLink, Link } from "react-router-dom";
import { useAuthProvider } from "../../context/auth-context";
import { AppContextType, AuthContextType } from "../../context/types";
import "./Sidebar.scss";
import { LiaTimesSolid } from "react-icons/lia";
import { useAppContext } from "../../context/app-context";

export const Sidebar = () => {
  const { token, clearToken } = useAuthProvider() as AuthContextType;
  const { setShowSidebar } = useAppContext() as AppContextType;
  return (
    <div className="sidebar">
      <LiaTimesSolid
        className="times-icon"
        onClick={() => {
          setShowSidebar(false);
        }}
      />
      <ul className="sidebar__items">
        <div className="nav-bar__brand">
          <Link to={"/"}>hacker news</Link>
        </div>
        <li className="sidebar__items__link">
          <NavLink to={"/top"}>Top links</NavLink>
        </li>
        <li className="sidebar__items__link">
          <NavLink to={"/"}>New</NavLink>
        </li>
        {token ? (
          <li className="sidebar__items__link">
            <button
              className=""
              onClick={() => {
                clearToken();
                localStorage.removeItem("token");
              }}>
              Logout
            </button>
          </li>
        ) : (
          <li className="sidebar__items__link">
            <NavLink to={"/auth"}>Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
