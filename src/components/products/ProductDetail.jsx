import { useEffect, useState } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import RelatedProducts from "./Related.jsx";
import { useProduct, useCart } from "../../contexts/customHook.js";
import Spinner from "../Spinner.jsx";

const ProductDetail = () => {
  let params = useParams();
  let numberId = parseInt(params.id);
  const [singleProduct, setSingleProduct] = useState(null);
  const { isLoading, setIsLoading } = useProduct();
  const { convertNumber } = useProduct();
  const { handleAddToCart } = useCart();

  const fetchSingleProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://africart-strapi-api.onrender.com/api/products/${numberId}/?populate=*`
      );
      if (response.ok) {
        const data = await response.json();
        setSingleProduct(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSingleProduct();
  }, [numberId]);

  return (
    <>
      {isLoading && <Spinner />}
      <h1 className="font-semibold product-det text-2xl">Product Details</h1>
      <hr className="w-36 hr" />
      <div className=" mt-8 flex flex-col lg:flex-row lg:p-4 p-2 lg:justify-center">
        {singleProduct !== null && (
          <>
            <img
              src={singleProduct.attributes.productImage.data.map(
                (image) => image.attributes.url
              )}
              alt="Product Image"
              className="lg:w-1/3 detail  "
            />
            <div className="lg:w-1/2 p-2 cont">
              <h1 className="font-bold text-2xl lg:p-2 ">
                {singleProduct.attributes.productTitle}
              </h1>
              <h6 className="p-2 text-base ">
                {singleProduct.attributes.description}
              </h6>
              <h2 className="text-[red] font-semibold p-2 text-xl">
                UGX {convertNumber(singleProduct.attributes.price)}
              </h2>
              <button
                className=" m-2 bg-[#102262] text-white font-semibold text-center w-96 hover:bg-[#222]"
                onClick={() => handleAddToCart(singleProduct)}
              >
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
      <RelatedProducts
        singleProduct={singleProduct}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductDetail;
