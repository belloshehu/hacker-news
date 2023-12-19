import { useAuthProvider } from "../../context/auth-context";
import { AppContextType, AuthContextType } from "../../context/types";
import "./NavBar.scss";
import { NavLink, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Search } from "../Search/Search";
import { useAppContext } from "../../context/app-context";
import { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Sidebar } from "../Sidebar/Sidebar";

export const NavBar = () => {
  const { token, clearToken } = useAuthProvider() as AuthContextType;
  const { showSearch, setShowSearch } = useAppContext() as AppContextType;
  const { showSidebar, setShowSidebar } = useAppContext() as AppContextType;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowSearch(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className="nav-bar">
      <div className="nav-bar__brand">
        <Link to={"/"}>hacker news</Link>
      </div>
      {showSearch && <Search />}
      <CiSearch
        className="search-icon"
        onClick={() => {
          setShowSearch(!showSearch);
        }}
      />
      <FaBarsStaggered
        className="bar-icon"
        onClick={() => {
          setShowSidebar(!showSidebar);
        }}
      />
      {showSidebar && <Sidebar />}
      <ul className="nav-bar__items">
        <li></li>
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
