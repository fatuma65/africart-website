import { useEffect, useState } from "react";
import { useAuth, useCart, useProduct } from "../contexts/customHook";
import Spinner from "./Spinner";
const Order = () => {
  const { cartItems, total } = useCart();
  const { userData } = useAuth();
  const {isLoading, setIsLoading, parseArtist} = useProduct()
//   const [order_status, setOrderState] = useState("pending");
//   const [order_date, setOrderDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState(null);

const orderRequest = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        "https://africart-strapi-api.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              users_permission_user: userData,
              order_date: new Date(),
              total_amount: total,
              order_status: "pending",
              products: cartItems.map((item) => ({
                quantity: item.quantity,
                price: item.attributes.price,
                id: item.id,
                productImage: item.attributes?.productImage.data.map(
                  (image) => image.attributes.url
                ),
              })),
            },
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setOrderData(data.data);
        localStorage.setItem("orderPlaced", "true");
        setIsLoading(false)
      } else {
        console.error("Order failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (
      cartItems.length > 0 &&
      total > 0 &&
      !localStorage.getItem("orderPlaced")
    ) {
      orderRequest();
    }
  }, [cartItems, total]);

  const fetchOrders = async () => {
    setIsLoading(true)
    const response = await fetch(
      `https://africart-strapi-api.onrender.com/api/orders?filters[users_permissions_user][id]=${userData.id}&populate=*`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setOrders(data.data);
        setIsLoading(false)
      }
    }
  };
  useEffect(() => {
    if (userData?.id) {
        fetchOrders();
    }
  }, [userData]);

  const fetchAllOrders = async () => {
    const response = await fetch(
      `https://africart-strapi-api.onrender.com/api/orders?filters[users_permissions_user][id]=${userData.artist.id}&populate=*`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setOrders(data.data);
      }
    }
  };

  useEffect(() => {
    if (userData?.artist?.id) {
      fetchAllOrders();
    }
  }, [userData]);
  return (
    <>
        <div className="overflow-x-auto p-6">
      {parseArtist ? (
        <div>
          <h2 className="text-2xl text-center font-bold">Products Ordered by Users</h2>
          {orders.length > 0 ? (
            <table className="table table-xs">
              {isLoading && <Spinner />}
              <thead>
                <tr className="text-black text-sm">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0,7).map((order) => (
                  <tr key={order.id}>
                    <td>{order.attributes?.products.data.map(item => item.attributes.productTitle).join(', ')}</td>
                    <td>{order.attributes?.products.data.map(item => item.attributes.price).join(', ')}</td>
                    <td>{order.attributes?.products.data.map(item => item.attributes.quantity).join(', ')}</td>
                    <td>{order.attributes?.user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center m-2">No orders placed yet</p>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl text-center font-bold">Your Orders</h2>
          {orders.length > 0 ? (
            <table className="table table-xs">
              {isLoading && <Spinner />}
              <thead>
                <tr className="text-black text-sm">
                    <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0,8).map((order) => (
                  <tr key={order.id}>
                    <td></td>
                    <td>{order.attributes?.products.data.map(item => item.attributes.productTitle).join(', ')}</td>
                    <td>{order.attributes?.products.data.map(item => item.attributes.price)}</td>
                    <td>{order.attributes.total_amount}</td>
                    <td>{new Date( order.attributes.order_date).toLocaleString()}</td>
                    <td>{order.attributes.order_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders placed yet</p>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default Order;

