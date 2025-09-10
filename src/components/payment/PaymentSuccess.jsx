
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../Navbar";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const searchParameters = new URLSearchParams(location.search)
  const paymentIntent = searchParameters.get('payment_intent')
  const redirectStatus = searchParameters.get('redirect_status')

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      alert('Your payment is sucessful')
      navigate('/')
    }
    else {
      alert('Payment has failed')
      navigate('/checkout')
    }
  }, [paymentIntent, redirectStatus])

  return (
    <>
      <Navbar />
      <div className='mt-24 flex justify-center items-center h-screen'>
        {redirectStatus === 'succeeded' ?
          <h1 className="text-2xl font-bold mt-8 text-center">
            Your Payment has been successful
          </h1>
          :
          <h1>Payment has failed</h1>
        }
      </div>
    </>
  );
};

export default PaymentSuccess;
