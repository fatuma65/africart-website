import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./context";
// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const perProducts = 8;
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // to display only a few products on the page.
  const navigate = useNavigate();

  const fetchApiProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://africart-strapi-api.onrender.com/api/products/?populate=*`
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
      } else {
        console.log("An error occured");
      }
    } catch (error) {
      console.log("An Error occured", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApiProducts();
  }, []);

  // For paginating
  useEffect(() => {
    setDisplayedProducts(
      products.slice(0,8)
    );
  }, [perProducts, products, currentPage]);

  const handleNextProducts = () => {
    if ((currentPage + 1) * perProducts < products.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleBackProducts = () => {
    if (currentPage > 0) {
      setCurrentPage((prevpage) => prevpage - 1);
    }
  };
  // to show how many characters can be displayed on the products title.
  const handleTitle = (title) => {
    let preferredTitleLength = 20;
    if (title?.length > preferredTitleLength) {
      return title.substring(0, preferredTitleLength) + "...";
    } else {
      return title;
    }
  };

  const handleViewNextProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const convertNumber = (price) => {
    return price?.toLocaleString();
  };

  const displayRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full ${i}`} className="bx bxs-star"></i>);
    }

    if (halfStars) {
      stars.push(<i key={"half"} className="bx bxs-star-half"></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty ${i}`} className="bx bx-star"></i>);
    }

    return stars;
  };

  return (
    <>
      <ProductContext.Provider
        value={{
          products,
          handleTitle,
          handleViewNextProduct,
          convertNumber,
          isLoading,
          displayRating,
          displayedProducts,
          perProducts,
          handleBackProducts,
          handleNextProducts,
        }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};
