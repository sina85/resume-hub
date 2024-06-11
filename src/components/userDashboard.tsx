// components/UserDashboard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDashboard: React.FC = () => {
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const fetchCredits = async () => {
      const response = await axios.get("http://localhost:8000/api/credits/balance", { params: { user_id: 1 } });
      setCredits(response.data.credits);
    };
    fetchCredits();
  }, []);

  const handleProcessFile = async (file: File) => {
    await axios.post("/api/files/process", { file, user_id: 1 });
    setCredits(credits - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleProcessFile(files[0]);
    }
  };

  return (
    <div>
      <h2>Your Credits: {credits}</h2>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default UserDashboard;