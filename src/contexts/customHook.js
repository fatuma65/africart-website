import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";

export const useProduct = () => {
  return useContext(ProductContext);
};


export const useCart = () => {
  return useContext(CartContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
}
