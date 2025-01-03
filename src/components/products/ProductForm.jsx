/* eslint-disable react/prop-types */
import "../LoginSignUp/SignUp.css";
import { useAuth, useProduct } from "../../contexts/customHook";
import { useEffect, useState } from "react";

const ProductForm = ({ product }) => {
  const {
    artistProduct,
    handleInput,
    handlePicture,
    productImage,
    setShowProducts,
    isLoading,
    setIsLoading,
    setArtistProduct,
    setRefreshProducts,
    isEditing,
  } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedCategories, setDisplayedCategories] = useState([]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const token = localStorage.getItem("token");
  const { artistData } = useAuth();
  const formData = new FormData();
  formData.append("files", productImage);
  useEffect(() => {
    if (isEditing && product) {
      setArtistProduct({
        id: product.id,
        productTitle: product.attributes?.productTitle,
        description: product.attributes?.description,
        price: product.attributes?.price,
        category: product.attributes?.category.data?.id,
      });
    }
  }, []);

  const  handleCategory = async () => {
    const response = await fetch ('https://africart-strapi-api.onrender.com/api/categories')
    const data = await response.json()
    console.log(data.data)
    setDisplayedCategories(data.data)
  }

  useEffect(() => {
    handleCategory()
  }, [])

  const methodRequest = isEditing ? "PUT" : "POST";
  const createProducts = async () => {
    setIsLoading(true);

    try {
      const uploadImage = await fetch(
        "https://africart-strapi-api.onrender.com/api/upload",
        {
          method: "POST",
          mode: "cors",
          body: formData,
        }
      );
      const imageResponse = await uploadImage.json();
      const imageId = imageResponse[0]?.id;

      const newProductsResponse = await fetch(
        isEditing
          ? `https://africart-strapi-api.onrender.com/api/products/${product?.id}`
          : "https://africart-strapi-api.onrender.com/api/products/",
        {
          method: methodRequest,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              productTitle: artistProduct.productTitle,
              description: artistProduct.description,
              price: artistProduct.price,
              artists: artistData,
              category: {
                data: {
                  id:selectedCategory,
                },
              },
              productImage: imageId,
            },
          }),
        }
      );

      if (newProductsResponse.ok) {
        setRefreshProducts((prev) => !prev);
      }

      setShowProducts(false);
      console.log(newProductsResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const submit = (event) => {
    event.preventDefault();
    createProducts();
  };

  console.log(selectedCategory);
  return (
    <>
      <div className="wrapper font-poppins ">
        <form
          className="bg-white shadow-lg rounded-lg p-4 max-w-lg w-full mx-auto space-y-2"
          onSubmit={submit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600">
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="productTitle"
              value={artistProduct.productTitle}
              onChange={handleInput}
              required
              className="mt-1 w-full p-2 border border-gray-300 bg-white text-black rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={artistProduct.description}
              onChange={handleInput}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:outline-none"
              placeholder="Enter product description"
              rows="4"></textarea>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={artistProduct.price}
              onChange={handleInput}
              required
              className="mt-1 w-full p-2 border border-gray-300 bg-white text-black rounded focus:border-blue-500 focus:outline-none"
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1 w-full p-2 border border-gray-300 bg-white text-black rounded focus:border-blue-500 focus:outline-none">
              <option value="">Select Category</option>
              {displayedCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.attributes.categoryTitle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="file"
              onChange={handlePicture}
              className="file-input file-input-bordered w-full max-w-xs w-full max-w-xs"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#102262] text-white font-semibold px-6 py-2 rounded hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-blue-400">
              {isLoading ? (
                <span className="loading loading-spinner loading-lg "></span>
              ) : isEditing ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;