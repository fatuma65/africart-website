<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
import login_light from "../../assets/login-w.png";
import login_dark from "../../assets/login_d.png";
import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import "boxicons";
=======
/* eslint-disable react/prop-types */
import "boxicons";
import "./Header.css";
import { useState } from "react";
>>>>>>> 7d2770e47b7a36bbaede9d4513af913ec019668c
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
<<<<<<< HEAD
      <div className="icons">
        <img
          onClick={() => {
            toggle_mode();
          }}
          src={theme == "light" ? toggle_light : toggle_dark}
          alt=""
          className="toggle-icon"
        />
        <div class="  flex justify-center items-center">
          <div class="relative py-0 px-2">
            <div class="mb-8 absolute left-9 pb-4 ">
              <p class="flex h-4 w-4 items-center justify-center rounded-full bg-red-500  text-xs text-white cart-count-icon">
=======

      <div className="icons flex">
        <div className="  flex justify-center items-center">
          <div className="relative py-0 px-2">
            <div className="mb-8 absolute left-9 pb-4 ">
              <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500  text-xs text-white cart-count-icon">
>>>>>>> 7d2770e47b7a36bbaede9d4513af913ec019668c
                0
              </p>
            </div>
            <i className="bx bx-cart-alt cart-icon"></i>
          </div>
        </div>
<<<<<<< HEAD
        <Link to={"/login"}><img
          src={theme == "light" ? login_light : login_dark}
          alt=""
          className="login"
        /></Link>
=======
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
>>>>>>> 7d2770e47b7a36bbaede9d4513af913ec019668c
      </div>
    </div>
  );
};

export default Header;
