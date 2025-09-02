import { useProduct } from "../../contexts/customHook";
import { useTheme } from "../../contexts/ThemeContext";
import Spinner from "../Spinner";

const ProductList = () => {
  const {
    convertNumber,
    handleTitle,
    handleViewNextProduct,
    isLoading,
    displayRating,
    displayedProducts,
    handleBackProducts,
    handleNextProducts,
  } = useProduct();
  const { theme } = useTheme();
  return (
    <>
      {isLoading && <Spinner />}
      {displayedProducts.length !== 0 ? (
        <>
          <div className="grid grid-cols-1  font-poppins sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-3/4 w-full mx-auto p-4 sm:p-6 md:p-8">
            {displayedProducts.map((product) => (
              <div key={product.id}>
                <img
                  src={product.attributes.productImage.data.map(
                    (image) => image.attributes.url
                  )}
                  alt="African artifact"
                  className="lg:h-52 h-64 w-full rounded"
                />
                <h3
                  className={` ${
                    theme === "dark" ? "text-white" : "text-[#000]"
                  } font-semibold p-2`}
                >
                  {handleTitle(product.attributes.productTitle)}
                </h3>
                <h4 className="text-[red] font-semibold p-2">
                  UGX {convertNumber(product.attributes.price)}
                </h4>
                <div className="text-2xl text-[orange]">
                  {displayRating(product.attributes.rating)}
                </div>
                <button
                  className="bg-[#102262] text-white btn m-2 font-semibold w-full text-center mx-auto hover:bg-[#000]"
                  onClick={() => handleViewNextProduct(product.id)}
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
          <div className="mx-auto gap-2 m-4 flex justify-center ">
            <button
              className=" btn btn-outline w-28 text-black "
              onClick={handleBackProducts}
            >
              <i className="bx bx-left-arrow-alt"></i>
              Previous
            </button>
            <button
              className=" w-28
           btn btn-outline text-black"
              onClick={handleNextProducts}
            >
              Next
              <i className="bx bx-right-arrow-alt "></i>
            </button>
          </div>
        </>
      ) : (
        <p className="text-center m-24">No Products Found</p>
      )}
    </>
  );
};

export default ProductList;
