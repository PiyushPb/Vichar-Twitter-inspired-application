import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../../config/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetTrend = () => {
  const navigate = useNavigate();
  const [trend, setTrend] = useState("");

  const handleChange = (event) => {
    setTrend(event.target.value);
  };

  const handleAddTrend = async () => {
    try {
      await axios.post(`${backend_url}/v1/tweet/setTrending`, {
        trends: trend,
      });

      setTrend("");
      toast.success("Trend added successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="add text here"
        value={trend}
        onChange={handleChange}
      />
      <button onClick={handleAddTrend}>Set</button>
    </div>
  );
};

export default SetTrend;
