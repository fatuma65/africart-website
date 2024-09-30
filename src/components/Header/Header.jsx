import React from "react";
import "./Header.css";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
import login_light from "../../assets/login-w.png";
import login_dark from "../../assets/login_d.png";
import cart_light from "../../assets/dark_cart.png";

import search_icon_light from "../../assets/search-w.png";
import search_icon_dark from "../../assets/search-b.png";
import 'boxicons'
const Header = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="header">
      <h2>
        Afri<span className="logo">Cart</span>
      </h2>
      <div className="search-box">
        <input type="text" placeholder="Search Here" />
        <img
          src={theme == "light" ? search_icon_light : search_icon_dark}
          alt=""
          className="search-icon"
        />
      </div>
      <div className="icons">
        <img
          onClick={() => {
            toggle_mode();
          }}
          src={theme == "light" ? toggle_light : toggle_dark}
          alt=""
          className="toggle-icon"
        />
        {/* <img
          src={theme == "light" ? cart_light : cart_dark}
          alt=""
          className="cart-icon"
        /> */}
        {/* <i className='bx bx-cart-alt cart-icon'></i>
        <sub>
          <span className="nav-cart-count">0</span>
        </sub> */}
        <div class="  flex justify-center items-center">
    <div class="relative py-0 px-2">
  <div class="mb-8 absolute left-9 pb-4 ">
    <p class="flex h-4 w-4 items-center justify-center rounded-full bg-red-500  text-xs text-white cart-count-icon">0</p>
  </div>
  <i className='bx bx-cart-alt cart-icon'></i>
</div>
</div>
        <img
          src={theme == "light" ? login_light : login_dark}
          alt=""
          className="login-icon"
        />
      </div>
    </div>
  );
};

export default Header;
