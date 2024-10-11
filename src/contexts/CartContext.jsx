/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const itemsInStorage = localStorage.getItem("cartItems");
  const [cartItems, setCartItems] = useState(
    itemsInStorage ? JSON.parse(itemsInStorage) : []
  );

  const handleAddToCart = (item) => {
    const isItemInCart = cartItems.find((cart) => cart.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map((items) =>
          items.id === item.id
            ? {
                ...items,
                quantity: items.quantity + 1,
                subTotal: (items.quantity + 1) * items?.attributes.price,
              }
            : items
        )
      );
      alert("Quantity has been updated successfully");
    } else {
      const itemPrice = item.attributes.price;
      setCartItems([
        ...cartItems,
        { ...item, subTotal: itemPrice, quantity: 1 },
      ]);
      alert("Product added to Cart Successfully");
    }
  };
  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subTotal: (item.quantity + 1) * item.attributes.price,
            }
          : item
      )
    );
  };
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              subTotal: (item.quantity - 1) * item.attributes.price,
            }
          : item
      )
    );
  };

  const total = cartItems.reduce((sum, acc) => sum + acc.subTotal, 0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        cartItems,
        setCartItems,
        incrementQuantity,
        decreaseQuantity,
        total,
      }}>
      {children}
    </CartContext.Provider>
  );
};
