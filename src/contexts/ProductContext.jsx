import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchApiProducts = async () => {
    const response = await fetch(
      `https://africart-strapi-api.onrender.com/api/products/?populate=*`
    );
    const data = await response.json();
    setProducts(data.data);
  };

  useEffect(() => {
    fetchApiProducts();
  }, []);

  // to show how many characters can be displayed on the products title.
  const handleTitle = (title) => {
    let preferredTitleLength = 25;
    return title.substring(0, preferredTitleLength);
  };

  const handleViewNextProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <ProductContext.Provider
        value={{
          products,
          handleTitle,
          handleViewNextProduct,
        }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};
