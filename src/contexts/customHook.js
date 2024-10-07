import { useContext } from "react";
import { ProductContext } from "./ProductContext";

const useProduct = () => {
  return useContext(ProductContext);
};
export default useProduct;
