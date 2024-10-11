import Footer from "./footer/Footer";
import Navbar from "./Navbar";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold mt-8 text-center">
        Payment has been successful
      </h1>
      <Footer/>
    </>
  );
};

export default PaymentSuccess;
