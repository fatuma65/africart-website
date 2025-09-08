import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./context";

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const perProducts = 8;
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showProducts, setShowProducts] = useState(false);
  const artist = localStorage.getItem("userDetails");
  const parseArtist = JSON.parse(artist);
  const [artistProduct, setArtistProduct] = useState({
    productTitle: "",
    description: "",
    price: 0,
    rating: 0,
  });

  const [productImage, setProductImage] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] =useState(false)
  const [userProducts, setUserProducts] = useState([]);

  const handlePicture = (e) => {
    setProductImage(e.target.files[0]);
  };
  const handleInput = (event) => {
    setArtistProduct({ ...artistProduct, [event.target.name]: event.target.value });
  };
  // to display only a few products on the page.
  const navigate = useNavigate();
  const formData = new FormData();
  formData.append("files", productImage);
  const fetchApiProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://africart-strapi-api.onrender.com/api/products/?populate=*`
      );
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

  console.log(products)
  useEffect(() => {
    const startIndexOfProducts = currentPage * perProducts;
    const lastIndexOfProducts = startIndexOfProducts + perProducts;
    setDisplayedProducts( 
      products.slice(startIndexOfProducts, lastIndexOfProducts)
    );
  }, [currentPage, products]);
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

  useEffect(() => {
    window.scroll(0,0)
  }, [products])

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

  const  handleCategory = async () => {
    const response = await fetch ('https://africart-strapi-api.onrender.com/api/categories')
    const data = await response.json()
    console.log(data.data)
    setDisplayedCategories(data.data)
  }

  useEffect(() => {
    handleCategory()
  }, [])

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
          artistProduct,
          handleInput,
          productImage,
          handlePicture,
          displayedCategories,
          showProducts, 
          setShowProducts,
          setIsLoading,
          refreshProducts, 
          setRefreshProducts,
          token,
          isEditing, 
          setIsEditing,
          setArtistProduct,
          parseArtist,
          userProducts, 
          setUserProducts,
        }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};
