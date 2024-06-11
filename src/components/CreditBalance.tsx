// components/CreditBalance.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CreditBalance: React.FC = () => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get("/api/credits/balance", { params: { user_id: 1 } });
        setCredits(response.data.credits);
      } catch (error) {
        setError("Failed to fetch credit balance");
      } finally {
        setLoading(false);
      }
    };
    fetchCredits();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Credit Balance</h2>
      <p>You have {credits} credits.</p>
    </div>
  );
};

export default CreditBalance;
