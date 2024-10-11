import { useProduct } from "../../contexts/customHook";
import { useTheme } from "../../contexts/ThemeContext";

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
<<<<<<< HEAD
      {isLoading && (
        <p className="text-5xl font-bold h-screen flex items-center justify-center">
          Loading...
        </p>
      )}
=======
      {isLoading && <p className="text-5xl font-bold h-screen flex items-center justify-center">Loading...</p>}
>>>>>>> cf23b59 (implement search functionality)
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-3/4 w-full mx-auto p-4 sm:p-6 md:p-8">
        {displayedProducts.map((product) => (
          <div key={product.id}>
            <img
              src={product.attributes.productImage.data.map(
                (image) => image.attributes.url
              )}
              alt="African artifact"
              className="lg:h-52 h-64 w-full"
            />
            <h3
              className={` ${
                theme === "dark" ? "text-white" : "text-[#000]"
              } font-semibold p-2`}>
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
      <div className="flex gap-2 justify-center items-center p-6  ">
        <i
          className="bx bx-left-arrow-alt bg-[#102262] text-white p-2 text-4xl rounded hover:bg-[grey] w-24 text-center "
          onClick={handleBackProducts}></i>
        <i
          className="bx bx-right-arrow-alt  bg-[#102262] text-white p-2 rounded text-4xl hover:bg-[grey] w-24 text-center "
          onClick={handleNextProducts}></i>
      </div>
    </>
  );
};

export default ProductList;
