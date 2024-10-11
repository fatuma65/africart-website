/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {useProduct} from "../../contexts/customHook";

const RelatedProducts = ({ singleProduct, setLoading }) => {
  const { products, handleTitle, handleViewNextProduct, convertNumber } = useProduct();
  const [filteredRelatedProducts, setFilteredRelatedProducts] = useState([]);

  console.log(products)
  useEffect(() => {
    setLoading(true);
    const relatedProducts = singleProduct !== null && products.filter(
      (product) =>
        product?.attributes?.category.data?.attributes?.categoryTitle ===
        singleProduct?.attributes?.category?.data.attributes.categoryTitle && product.id !== singleProduct.id
    );
    if (relatedProducts) {
      setFilteredRelatedProducts(relatedProducts);
    } else {
      console.log("Related Products not found");
    };

    setLoading(false);
  }, [singleProduct, products]);
  return (
    <>
      <div className="flex flex-col m-auto justify-center items-start lg:ml-24 p-4">
        <h1 className="font-bold text-2xl">Related Products</h1>
        <hr className="w-36  hr1" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          {filteredRelatedProducts.length !== 0 ? (
            filteredRelatedProducts.map((filtered) => (
              <div key={filtered.id} className="lg:w-72 w-full p-2 ">
                <img
                  src={filtered.attributes?.productImage.data.map(
                    (image) => image.attributes.url
                  )}
                  alt="Product Image"
                  className="lg:h-52 h-64 w-full"
                />
                <h1 className="text-[#000] text-xl font-bold p-2">
                  {handleTitle(filtered.attributes.productTitle)}
                </h1>
                <h3 className="p-2 text-xl font-semibold">
                  {" "}
                  Category:{" "}
                  {filtered.attributes.category.data?.attributes.categoryTitle}
                </h3>
                <h3 className="text-[red] text-xl font-bold p-2">
                  UGX {convertNumber(filtered.attributes.price)}
                </h3>
                <button
                  className="bg-[#102262] text-white p-2 m-2 font-semibold w-full text-center mx-auto hover:bg-[#000]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewNextProduct(filtered.id);
                  }}>
                  View Product
                </button>
              </div>
            ))
          ) : (
            <h1>No related Products Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
