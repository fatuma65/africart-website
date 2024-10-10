import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import {useCart} from "../contexts/customHook";

const stripePromise = loadStripe(
  "pk_test_51Q6U2l2KhaiPAp5sogK0qyxtr72MyYm2DuP0vtDVuExXD2k1kQ0yGnAfsB48Glz56QUQt7IYIhX1IYgJjAFLPYnz00lHOJuULQ"
);

const StripePayment = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const [amountInCents, setAmountInCents] = useState(null);
  const [loading, setLoading] = useState(false)
  const { total } = useCart();

  useEffect(() => {
    const fetchExchangeRateAndConvert = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/UGX"
        );
        const data = await response.json();
        const exchangeRate = data.rates.USD;
        console.log("Exchange Rate (UGX to USD):", exchangeRate);

        const amountInUSD = total * exchangeRate;
        console.log("Amount in USD:", amountInUSD);

        const amountInCents = Math.round(amountInUSD * 100);
        console.log("Amount in Cents:", amountInCents);

        setAmountInCents(amountInCents);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchExchangeRateAndConvert();
  }, [total]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!amountInCents) return;

      try {
        const response = await fetch(
          "https://africart-strapi-api.onrender.com/api/payments/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: amountInCents,
              currency: "usd",
            }),
          }
        );

        const data = await response.json();
        console.log("Payment Intent Data:", data);

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    fetchClientSecret();
  }, [amountInCents]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <>
    <div className="h-1/2">
    {loading && <h1 className="text-2xl text-center font-bold">Loading</h1>}
    </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};

export default StripePayment;
