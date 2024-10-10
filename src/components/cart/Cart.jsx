import { useNavigate } from "react-router-dom";
import {useProduct, useCart} from "../../contexts/customHook";
import "./CartStyles.css";
const Cart = () => {
  const {
    cartItems,
    setCartItems,
    decreaseQuantity,
    incrementQuantity,
    total,
  } = useCart();
  const {
    handleTitle,
    convertNumber
  } = useProduct();
  const navigate = useNavigate();
  const removeItemFromCart = (id) => {
    const filteredItems = cartItems.filter((cart) => cart.id !== id);
    setCartItems(filteredItems);
  };

  const redirectToCheckout = () => {
    navigate("/checkout");
  };
  return (
    <>
      <h1 className="text-3xl font-bold p-2 text-center mt-4">Shopping Cart</h1>

      <div className="lg:flex mt-2 ">
        <table className="lg:w-3/5 lg:m-8 m-24">
          <thead className=" m-2 p-2">
            <tr className=" border-head">
              <th className="p-2"></th>
              <th className="p-2  "></th>
              <th className="p-2 ">Product</th>
              <th className="p-2 ">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item) => (
              <tr key={item.id} className="border-head">
                <td className="p-2 text-center mx-auto">
                  <i
                    className="bx bx-x cursor-pointer text-center"
                    onClick={() => removeItemFromCart(item.id)}></i>
                </td>
                <td>
                  <img
                    src={item.attributes?.productImage.data.map(
                      (image) => image.attributes.url
                    )}
                    alt="Product Image"
                    className="cart-image w-32 h-32 m-2 rounded mx-auto"
                  />
                </td>
                <td className="text-center">
                  {handleTitle(item.attributes?.productTitle, "increase")}
                </td>
                <td className="text-[#D51C75] font-semibold text-center">
                  UGX {convertNumber(item.attributes?.price)}
                </td>
                <td>
                  <div className=" flex items-center justify-center">
                    <button
                      className="border-2 border-[#ddd] p-2 w-8"
                      onClick={() => decreaseQuantity(item.id)}>
                      -
                    </button>
                    <span className="p-2">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="border-2 border-[#ddd] p-2 w-8">
                      +
                    </button>
                  </div>
                </td>
                <td className="text-center">{convertNumber(item.subTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="lg:w-1/3 m-8 p-6 rounded-lg shadows lg:h-96">
          <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-bold">Subtotal:</td>
                <td className="p-4">UGX {convertNumber(total)}</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-bold">Shipping:</td>
                <td className="p-4">
                  <p>Free Shipping</p>
                  <p>Flat Rate: UGX 5000</p>
                  <p style={{ fontSize: "14px" }}>
                    Shipping options will be updated during checkout.
                  </p>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-bold">Total:</td>
                <td className="p-4">UGX {convertNumber(total + 5000)}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="mt-4 w-full bg-[#102262] text-white p-2 rounded-lg hover:bg-blue-600"
            onClick={redirectToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
