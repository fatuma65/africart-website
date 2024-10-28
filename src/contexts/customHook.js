import { useContext } from "react";
import { ProductContext } from './context';
import { CartContext } from "./context";
import { AuthContext } from "./context";

export const useProduct = () => {
  return useContext(ProductContext);
};


export const useCart = () => {
  return useContext(CartContext);
};

export const useAuth = () => {
  return useContext(AuthContext);
}
