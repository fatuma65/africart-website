import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Detail from './Pages/DetailsOfProduct';
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import Login from "./components/LoginSignUp/Login";
import SignUp from "./components/LoginSignUp/SignUp";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import Dashboard from "./components/userDashboard/Dashboard"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/payment-success" element={<PaymentSuccess />}></Route>
        <Route path="/product/:id" element={<Detail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user" element={<Dashboard />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </>
  );
}

export default App;
