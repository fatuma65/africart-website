/* eslint-disable react/prop-types */
import "boxicons";
import "./Header.css";
import { useState } from "react";
const Header = ({ theme, setTheme }) => {
  const [searchText, setSearchText] = useState("");
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const handleInputText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="header">
      <h2>
        Afri<span className="logo">Cart</span>
      </h2>
      <div className="search-box ">
        <input
          type="text"
          placeholder="Search Products Here"
          value={searchText}
          onChange={handleInputText}
        />
        <i className="bx bx-search text-2xl mr-4"></i>
      </div>

      <div className="icons flex">
        <div className="  flex justify-center items-center">
          <div className="relative py-0 px-2">
            <div className="mb-8 absolute left-9 pb-4 ">
              <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500  text-xs text-white cart-count-icon">
                0
              </p>
            </div>
            <i className="bx bx-cart-alt cart-icon"></i>
          </div>
        </div>
        <i
          className={`bx bx-user-circle text-4xl ${
            theme === "light" ? "icon-white" : "icon-black"
          } `}></i>
        {theme === "light" ? (
          <i
            className="bx bxs-sun text-4xl cursor-pointer"
            onClick={toggle_mode}></i>
        ) : (
          <i
            className="bx bxs-moon text-4xl cursor-pointer"
            onClick={toggle_mode}></i>
        )}
      </div>
    </div>
  );
};

export default Header;
