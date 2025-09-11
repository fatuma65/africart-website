import "./TrendingStyles.css";
import "boxicons";
import { useProduct } from "../../contexts/customHook.js";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useEffect, useState } from "react";
import Spinner from "../Spinner.jsx";

const Trending = () => {
  const {
    handleTitle,
    handleViewNextProduct,
    convertNumber,
    displayRating,
    isLoading,
    products,
  } = useProduct();
  const { theme } = useTheme();

  const [newProducts, setNewProducts] = useState([]);

  // function to filter out the products based on the button being clicked.
  const handleNewProducts = (type) => {
    const today = new Date();

    const recentProducts = products.filter((product) => {
      if (type === "new") {
        const createdAt = new Date(product.attributes.createdAt);
        // convert the day which is in milliseconds into days.
        const dayDifference = (today - createdAt) / (1000 * 60 * 60 * 24);
        // return the products which were created less than 36 days ago.
        return dayDifference <= 18;
      } else if (type === "featured") {
        return product.attributes.rating >= 4;
      } else if (type === "bestSeller") {
        return product.attributes.price >= 50000;
      } else {
        return true;
      }
    });

    setNewProducts(recentProducts);
  };
  useEffect(() => {
    handleNewProducts("new");
  }, [products]);

  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-center p-4">
          Trending <span className="text-[#D51C75]">Products</span>
        </h1>
        <p className="lg:w-1/2 w-full text-center mx-auto p-2 text-base">
          Discover the richness of african culture through our curated selection
          of trending products. From handcrafted jewerlly and vibrant fashion to
          unique home decor, each item tells a story of heritage, creativity and
          craftmanship.
        </p>
        <div className="buttons flex md:flex-row flex-col justify-center mt-4  gap-2  font-medium w-full">
          <button
            className={`${
              theme === "dark" ? "text-[#fff]" : ""
            } border-black btn border-2 text-black hover:bg-black hover:text-white`}
            onClick={() => handleNewProducts("new")}
          >
            New Products
          </button>
          <button
            className="text-white active:bg-rose-400 btn border-none text-nowrap hover:bg-slate-500 bg-[#D51C75]"
            onClick={() => handleNewProducts("featured")}
          >
            Featured Products
          </button>
          <button
            className={`${
              theme === "dark" ? "text-[#fff]" : ""
            } border-black btn border-2 text-black hover:bg-black hover:text-white`}
            onClick={() => handleNewProducts("bestSeller")}
          >
            Best Sellers
          </button>
        </div>
        {isLoading && <Spinner />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-3/4 w-full mx-auto p-4 sm:p-6 md:p-8">
          {newProducts.map((product) => (
            <div key={product.id} className=" w-full p-2 each-product">
              <img
                src={product.attributes.productImage.data.map(
                  (image) => image.attributes.url
                )}
                alt="African artifact"
                className="lg:h-52 h-64 w-full"
              />
              <h3 className="text-[#000] font-semibold p-2">
                {handleTitle(product.attributes.productTitle)}
              </h3>
              <h4 className="text-[red] font-semibold p-2">
                UGX {convertNumber(product.attributes.price)}
              </h4>
              <div className="text-2xl text-[orange]">
                {displayRating(product.attributes.rating)}
              </div>
              <button
                className="bg-[#102262] text-white btn  m-2 font-semibold w-full text-center mx-auto hover:bg-[#000]"
                onClick={() => handleViewNextProduct(product.id)}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
