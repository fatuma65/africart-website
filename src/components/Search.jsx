/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./SearchStyles.css";
const Search = ({ productsFiltered, searchText }) => {
  const navigate = useNavigate();
  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={`${searchText.length !== 0 && "search-container"}`}>
      {productsFiltered.length === 0 ? (
        <p>No Product Found</p>
      ) : (
        searchText &&
        productsFiltered.map((product) => (
          <div key={product.id}>
            <p
              onClick={() => handleProduct(product.id)}
              className="cursor-pointer">
              {product.attributes.productTitle}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;
