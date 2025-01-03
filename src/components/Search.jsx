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
      {productsFiltered.length !== 0 ? (
        searchText &&
        productsFiltered.map((product) => (
          <ul key={product.id}>
            <li
              onClick={() => handleProduct(product.id)}
              className="cursor-pointer text-search text-black">
              {product.attributes.productTitle}
            </li>
          </ul>
        ))
      ) : searchText.length !== 0 && <p className='found'>Not Found</p>}
    </div>
  );
};

export default Search;
