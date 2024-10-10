import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import Detail from './Pages/DetailsOfProduct';
import CartPage from "./Pages/CartPage";
import Checkout from "./Pages/Checkout";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/payment-success" element={<PaymentSuccess />}></Route>
        <Route path="/product/:id" element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
