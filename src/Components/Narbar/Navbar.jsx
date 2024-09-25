import React from "react";
import "./Navbar.css";
import logo_light from "../../assets/logo_dark.png";
import logo_dark from "../../assets/logo_light.png";
import toggle_light from "../../assets/night.png";
import toggle_dark from "../../assets/day.png";
import login_light from "../../assets/login_d.png";
import login_dark from "../../assets/login-w.png";
import cart_light from "../../assets/dark_cart.png";
import cart_dark from "../../assets/cart.png";
const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="navbar">
      <img
        src={theme == "light" ? logo_light : logo_dark}
        alt=""
        className="logo"
      />

      <h2>AfriCart</h2>
      <ul>
        <li>
          <a href="#"  style={{color: 'red'}}>
          Home</a>
        </li>
        <li>
          <a href="#">Shop</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>

      <img
        onClick={() => {
          toggle_mode();
        }}
        src={theme == "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />
      <img
        src={theme == "light" ? cart_light : cart_dark}
        alt=""
        className="cart-icon"
      />
      <img
        src={theme == "light" ? login_light : login_dark}
        alt=""
        className="login-icon"
      />
    </div>
  );
};

export default Navbar;
