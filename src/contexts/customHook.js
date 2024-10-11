import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import { CartContext } from "./CartContext";

export const useProduct = () => {
  return useContext(ProductContext);
};


export const useCart = () => {
  return useContext(CartContext);
};
