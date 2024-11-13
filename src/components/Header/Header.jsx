/* eslint-disable react/prop-types */
import "boxicons";
import "./Header.css";
import { useEffect, useState } from "react";
import { useAuth, useCart, useProduct } from "../../contexts/customHook";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import Search from "../Search";
import { Link } from "react-router-dom";
const Header = () => {
  const { cartItems } = useCart();
  const { displayedProducts } = useProduct();
  const [searchText, setSearchText] = useState("");
  const [productsFiltered, setProductsFiltered] = useState([]);
  const { userData, islogedIn, logoutUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const redirect = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };

  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const handleInputText = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const filteredProducts = displayedProducts.filter((product) =>
      product.attributes.productTitle
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setProductsFiltered(filteredProducts);
  }, [searchText, displayedProducts]);

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToDashboard = () => {
    redirect("/user");
  };
  return (
    <>
      <div className="header font-poppins">
        <h2>
          <Link to={"/"}>
            Afri<span className="logo">Cart</span>
          </Link>
        </h2>
        <div className="search-box ">
          <input
            type="text"
            placeholder="Search Products"
            value={searchText}
            name="searchText"
            onChange={handleInputText}
            className="input input-bordered"
          />
          <i className="bx bx-search text-2xl mr-4"></i>
        </div>

        <div className="icons flex">
          <div className="  flex justify-center items-center">
            <div className="relative py-0 px-2">
              <div className="mb-8 absolute left-9 pb-4 ">
                <p className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500  text-xs text-white cart-count-icon">
                  {cartItems.length}
                </p>
              </div>
              <i
                className="bx bx-cart-alt cart-icon"
                onClick={navigateToCart}></i>
            </div>
          </div>
          {!islogedIn ? (
            <>
              <details className="dropdown dropdown-end">
                <summary className="flex">
                  <i
                    className={`bx bx-user-circle text-4xl cursor-pointer ${
                      theme === "light" ? "icon-white" : "icon-black"
                    } `}></i>
                </summary>
                <ul className="menu dropdown-content bg-base-100 text-white rounded z-[1] w-32 p-2 ">
                  <li>
                    <a onClick={handleClick}>My Account</a>
                  </li>
                  <li>
                    <a>Support</a>
                  </li>
                </ul>
              </details>
            </>
          ) : (
            <>
              <details className="dropdown dropdown-end">
                <summary className="flex flex-row  items-center">
                  <img
                    src={userData?.profilePicture?.url}
                    alt=""
                    className="user-image mx-auto cursor-pointer rounded-full"
                  />
                </summary>
                <ul className="menu dropdown-content bg-base-100 text-white rounded z-[1] w-32 p-2 ">
                  <li>
                    <a onClick={navigateToDashboard}>My Account</a>
                  </li>
                  <li>
                    <a onClick={logoutUser}>Logout</a>
                  </li>
                </ul>
              </details>
            </>
          )}

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
      <Search productsFiltered={productsFiltered} searchText={searchText} />
    </>
  );
};

export default Header;
