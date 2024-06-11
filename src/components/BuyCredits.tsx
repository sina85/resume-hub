// components/BuyCredits.tsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

//published-key
const stripePromise = loadStripe("pk_test_51PPuUSJRWTt0fuT4evrWhVMwgVPG3QP0TItmu6zhoGdWWENO6wBnEtj7R0QeGLN1Z8mCdkwUGnqdWIIkNgJzlNky00sJ5I7zLu");

const creditOptions = [
  { credits: 5, amount: 500 }, // 5 credits for $5.00
  { credits: 10, amount: 900 }, // 10 credits for $9.00 (10% discount)
  { credits: 20, amount: 1600 }, // 20 credits for $16.00 (20% discount)
  { credits: 50, amount: 3500 }, // 50 credits for $35.00 (30% discount)
];

const BuyCredits: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleBuyCredits = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const response = await axios.post("http://localhost:8000/api/create-checkout-session", {
      user_id: 1,
      credits: creditOptions[selectedOption].credits,
      amount: creditOptions[selectedOption].amount,
    });

    const { id: sessionId } = response.data;
    if (stripe) {
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result && result.error) {
        console.error(result.error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Buy Credits</h2>
      <div>
        <label>Select Credit Option:</label>
        <select value={selectedOption} onChange={(e) => setSelectedOption(Number(e.target.value))}>
          {creditOptions.map((option, index) => (
            <option key={index} value={index}>
              {option.credits} credits for ${(option.amount / 100).toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleBuyCredits} disabled={loading}>
        {loading ? "Loading..." : "Buy Credits"}
      </button>
    </div>
  );
};

export default BuyCredits;
