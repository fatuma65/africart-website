/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./SearchStyles.css";
const Search = ({ productsFiltered, searchText }) => {
  const navigate = useNavigate();
  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={`${searchText.trim() && "search-container"}`}>
      {productsFiltered === null && productsFiltered.length === 0 ? (
        <p>No products Found</p>
      ) : (
        searchText &&
        productsFiltered.map((product) => (
          <ul key={product.id}>
            <li
              onClick={() => handleProduct(product.id)}
              className="cursor-pointer text-black">
              {product.attributes.productTitle}
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default Search;
