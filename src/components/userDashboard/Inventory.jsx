import { useEffect } from "react";
import { useAuth, useProduct } from "../../contexts/customHook";
import "./Dashboard.css";
import ProductForm from "../products/ProductForm";
import Spinner from "../Spinner";
const Inventory = () => {
  const {
    handleBackProducts,
    handleNextProducts,
    showProducts,
    setShowProducts,
    setIsLoading,
    isLoading,
    setArtistProduct,
    isEditing,
    refreshProducts, 
    setRefreshProducts,
    token,
    artistProduct,
    setIsEditing,
    userProducts, 
    setUserProducts
  } = useProduct();
  const { userData } = useAuth();
 

  const handleAddProducts = () => {
    setShowProducts(true);
    setIsEditing(false)
  };
  const closeProducts = () => {
    setShowProducts(false);
    setIsEditing(false)
  };

  const handleEdit = (product) => {
    setShowProducts(true)
    setIsEditing(!isEditing)
    // setArtistProduct(product)
    setArtistProduct(product ? {
      id: product.id,
      productTitle: product.attributes?.productTitle,
      description: product.attributes?.description,
      price: product.attributes?.price,
      category: product.attributes?.category.data?.id, 
    } : {});
  }
  const fetchProductOfArtist = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://africart-strapi-api.onrender.com/api/products?filters[artists][id]=${userData.artist.id}&populate=*`
    );
    const data = await response.json();
    setUserProducts(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductOfArtist();
  }, [refreshProducts]);

  const deleteProduct = async (id) => {
    const deleteResponse = await fetch(
      `https://africart-strapi-api.onrender.com/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (deleteResponse.ok) {
      setRefreshProducts((prev) => !prev);
    }
  };

  return (
    <>
      <div className="mt-6 mr-8 gap-2 flex justify-end">
        <button
          onClick={handleAddProducts}
          className=" bg-[#102262] flex items-center justify-center  gap-2 w-40 font-semibold text-white p-2 rounded hover:bg-[#000]">
          <i className="bx bx-plus-circle m-0 text-xl"></i>
          Add Product
        </button>
      </div>
      {(showProducts ) && (
        <div className="fixed inset-0 flex-col flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg max-w-lg items-center flex justify-center p-4 relative">
            <button
              className="absolute text-2xl text-black text-center font-bold text-gray-700 hover:text-gray-900"
              onClick={closeProducts}>
              &times;
            </button>
          </div>
          <ProductForm product={isEditing ? artistProduct : null} />

        </div>
      )}
      <div className="overflow-x-auto p-6 ">
        <table className="table table-xs tables">
          {isLoading && <Spinner />}
          <thead>
            <tr className="text-black text-sm">
              <th>Id</th>
              <th>Product Title</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="">
            {userProducts.slice(0, 7).map((product) => (
              // <>
                <tr key={product.id}>
                  <th>{product.id}</th>
                  <td>{product.attributes.productTitle}</td>
                  <td>
                    {
                      product.attributes?.category.data?.attributes
                        ?.categoryTitle
                    }
                  </td>
                  <td>{product.attributes.price}</td>
                  <div className=" flex items-center justify-end gap-2">
                    <button
                    onClick={() => handleEdit(product)}
                      className="btn btn-primary w-24 m-2 outline-none border-0 text-white"
                      >
                      Edit
                    </button>
                    <button
                      className="btn btn-error text-white w-24"
                      onClick={() => deleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </tr>
              // </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-center m-4">
        <button
          className="join-item btn bg-[#102262] text-white"
          onClick={handleBackProducts}>
          «
        </button>
        <button className="join-item btn bg-[#102262] text-white">
          Page 1
        </button>
        <button
          className="join-item btn bg-[#102262] text-white"
          onClick={handleNextProducts}>
          »
        </button>
      </div>
    </>
  );
};

export default Inventory;
