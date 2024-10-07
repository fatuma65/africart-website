import { useEffect, useState } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import RelatedProducts from "./Related.jsx";

const ProductDetail = () => {
  let params = useParams();
  console.log(params);
  let numberId = parseInt(params.id);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://africart-strapi-api.onrender.com/api/products/${numberId}/?populate=*`
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setSingleProduct(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleProduct();
  }, [numberId]);

  return (
    <>
      {loading && <p className="text-2xl">Loading....</p>}
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
              <h4 className="font-semibold text-xl p-2">
                Category:{" "}
                {
                  singleProduct.attributes.category?.data?.attributes
                    .categoryTitle
                }
              </h4>
              <h2 className="text-[red] font-semibold p-2 text-xl">
                UGX {singleProduct.attributes.price}
              </h2>
              <p className="p-2 text-base ">
                {singleProduct.attributes.description}
              </p>
              <div className="quantity-buttons ">
                <button className="">-</button>
                <span className="text-2xl ">1</span>
                <button>+</button>
              </div>
              <button className=" m-4 bg-[#102262] text-white font-semibold text-center w-64">
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
      <RelatedProducts singleProduct={singleProduct} setLoading={setLoading} />
    </>
  );
};

export default ProductDetail;