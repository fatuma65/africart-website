//
import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth, useProduct } from "../../contexts/customHook";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import "./Dashboard.css";
import Order from "../Order";
import Inventory from "./Inventory";
const Dashboard = () => {
  const { userData, logoutUser } = useAuth();
  const { parseArtist, products } = useProduct();
  const { theme } = useTheme();

  // State to track if ProductForm should be displayed
  const [showOrders, setShowOrders] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const handleView = (type) => {
    if (type === "orders") {
      setShowOrders(true);
    } else if (type === "inventory") {
      setShowInventory(true);
    } else {
      setShowOrders(false);
      setShowInventory(false);
    }
  };

  useEffect(() => {
    handleView("dashboard");
  }, []);

  return (
    <>
      <Header />
      {theme === "dark" && <hr />}
      <div className="lg:flex dashboard justify-center font-poppins min-h-screen">
        <div className="flex flex-col lg:w-80 main-dash bg-[#fff] m-2 rounded">
          <h1
            className="bg-[#102262] text-white font-bold text-xl mx-auto p-3 w-72 text-center rounded mt-12 cursor-pointer shadow-xl"
            onClick={() => handleView("dashboard")}
          >
            Dashboard
          </h1>
          <div className="mx-auto mt-4 text-left m-12 cursor-pointer">
            {!parseArtist?.artist ? (
              <ul id="user-list">
                <li onClick={() => handleView("orders")}>Orders</li>
                <li>Saved Items</li>
                <li>Close Account</li>
                <li
                  onClick={logoutUser}
                  className={`${
                    theme === "dark" ? "bg-[#fff] text-black" : "bg-[#D9D9D9]"
                  } p-2 w-64 text-center rounded hover:bg-[#102262] hover:text-[#fff]`}
                >
                  Logout
                </li>
              </ul>
            ) : (
              <ul>
                <li onClick={() => handleView("orders")}>Orders</li>
                <hr />
                <li className="font-bold">Management</li>
                <hr />
                <li onClick={() => handleView("inventory")}>Inventory</li>
                <li>Close Account</li>
                <li
                  className={`${
                    theme === "dark" ? "bg-[#fff] text-black" : "bg-[#D9D9D9]"
                  } p-2 w-64 text-center rounded hover:bg-[#102262] hover:text-[#fff]`}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="detail-section mt-2 bg-[#fff] w-5/6 rounded lg:max-w-screen-lg w-full">
          {showOrders ? (
            <Order />
          ) : showInventory ? (
            <Inventory />
          ) : (
            <>
              {!parseArtist?.artist ? (
                <>
                  <div className="m-6 name-user">
                    <h2 className="text-4xl font-bold p-2">
                      Welcome {userData?.lastname},
                    </h2>
                    <h3 className="ml-2">
                      Today is a beautiful day, ready to explore the African
                      culture?
                    </h3>
                  </div>
                  <div className="lg:flex detail-account">
                    <div className="m-6 mb-6 name-user1 p-6">
                      <h2 className="text-2xl main-h3 font-semibold p-2">
                        Account Details
                      </h2>
                      <h3 className="p-2">
                        Name: {userData?.firstname + " " + userData?.lastname}
                      </h3>
                      <h3 className="p-2">Email: {userData?.email}</h3>
                    </div>
                    <div className="m-6 name-user1 p-6">
                      <h2 className="text-2xl font-semibold p-2 main-h3">
                        Shipping Details
                      </h2>
                      <h3 className="p-2">Your Default shipping address</h3>
                      <h3 className="p-2">Please add a shipping address</h3>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-4 gap-3 lg:flex p-2 icon-div">
                    <div className="bg-[orangered] text-white p-2 w-64 flex justify-between items-center rounded">
                      <div className="flex flex-col gap-4">
                        <p className="text-xl"> Total Sales</p>
                        <h1 className="font-bold text-2xl">0 USD</h1>
                      </div>
                      <i className="bx bx-trending-up text-4xl p-2 text-center"></i>
                    </div>
                    <div className="bg-[#2E284C] text-white p-2 w-64 flex justify-between items-center rounded">
                      <div className="flex flex-col gap-4">
                        <p className="text-xl">Daily Sales</p>
                        <h1 className="font-bold text-2xl">0 USD</h1>
                      </div>
                      <i className="bx bx-run text-4xl p-2 text-center"></i>
                    </div>
                    <div className="bg-[#102262] text-white p-2 w-64 flex justify-between items-center rounded">
                      <div className="flex flex-col gap-4">
                        <p className="text-xl">Products</p>
                        <h1 className="font-bold text-2xl">
                          {products.length}
                        </h1>
                      </div>
                      <i className="bx bxs-data text-4xl p-2 text-center"></i>
                    </div>
                    <div className="bg-[#d51c75] text-white p-2 w-64 flex justify-between items-center rounded">
                      <div className="flex flex-col gap-4">
                        <p className="text-xl">Daily Users</p>
                        <h1 className="font-bold text-2xl">0</h1>
                      </div>
                      <i className="bx bxs-group text-4xl p-2 text-center"></i>
                    </div>
                  </div>
                  <Order />
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
