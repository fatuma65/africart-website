import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5174/payment-success'
      }
    });
    console.log(response);

    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <h1 className="p-16">Page is still loading</h1>}
      <div className="container mx-auto p-16">
        <form onSubmit={handleSubmit}>
          <div className="card w-100 bg-base-100 bg-gray-200 shadow-xl rounded-lg">
            <div className="card-body p-6">
              <h1 className="card-title font-bold text-2xl mb-4 text-center p-4 justify-center">
                Complete your payment here
              </h1>
              <PaymentElement />
              <div className="card-actions justify-center">
                <button
                  className="bg-[#000] rounded-xl text-white px-4 py-2 mt-6"
                  disabled={isLoading || !stripe || !elements}>
                  {isLoading ? "Loading..." : "Pay now"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
