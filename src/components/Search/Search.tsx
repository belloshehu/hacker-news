import React, { useEffect, useState } from "react";
import "./Search.scss";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "use-debounce";
import { useLocation, useNavigate } from "react-router-dom";

export const Search = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSeachTerm] = useState("");
  const [debouncedValue] = useDebounce(searchTerm, 1000);

  function changeHandler(e: React.FormEvent<HTMLInputElement>) {
    setSeachTerm(e.currentTarget.value);
  }

  useEffect(() => {
    // send query to backend

    console.log(debouncedValue);
  }, [debouncedValue]);
  const handleSearchClick = () => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };
  if (pathname.includes("/auth") || pathname.includes("*")) return null;
  return (
    <div className="search__control">
      <input
        type="search"
        autoFocus
        placeholder="Search key"
        className="search__control--input"
        onChange={changeHandler}
      />
      {/* <CiSearch /> */}
      <button
        type="button"
        className="search__control--btn"
        onClick={handleSearchClick}>
        <CiSearch />
      </button>
    </div>
  );
};
