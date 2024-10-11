import "./TrendingStyles.css";
import "boxicons";
import { useProduct } from "../../contexts/customHook.js";

const Trending = () => {
  const {
    displayedProducts,
    handleTitle,
    handleViewNextProduct,
    convertNumber,
    displayRating,
  } = useProduct();

  return (
    <>
      <div className="bg-[#D9D9D9]">
        <h1 className="text-4xl font-bold text-center p-4">
          Trending <span className="text-[#D51C75]">Products</span>
        </h1>
        <p className="lg:w-1/2 text-center mx-auto p-2 text-2xl lg:text-base">
          Discover the richness of african culture through our curated selection
          of trending products. From handcrafted jewerlly and vibrant fashion to
          unique home decor, each item tells a story of heritage, creativity and
          craftmanship.
        </p>
        <div className="buttons mx-auto p-2 font-semibold lg:w-1/2">
          <button className="bg-[#fff] btn">New Product</button>
          <button className="text-white bg-[#D51C75]">Features Product</button>
          <button className="bg-[#fff] btn">Best Seller</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-3/4 w-full mx-auto p-4 sm:p-6 md:p-8">
          {displayedProducts.map((product) => (
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
                className="bg-[#102262] text-white p-2 m-2 font-semibold w-full text-center mx-auto hover:bg-[#000]"
                onClick={() => handleViewNextProduct(product.id)}>
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
