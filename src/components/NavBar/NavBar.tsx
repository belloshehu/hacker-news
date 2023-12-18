import { useAuthProvider } from "../../context/auth-context";
import { AuthContextType } from "../../context/types";
import "./NavBar.scss";
import { NavLink, Link } from "react-router-dom";

export const NavBar = () => {
  const { token, clearToken } = useAuthProvider() as AuthContextType;

  return (
    <div className="nav-bar">
      <div className="nav-bar__brand">
        <Link to={"/"}>
          <h3>hacker news</h3>
        </Link>
      </div>
      <ul className="nav-bar__items">
        <li>
          <NavLink to={"/top"}>Top links</NavLink>
        </li>
        <li>
          <NavLink to={"/"}>New</NavLink>
        </li>
        {token ? (
          <li>
            <button
              className="btn "
              onClick={() => {
                clearToken();
                localStorage.removeItem("token");
              }}>
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink to={"/auth"}>Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
