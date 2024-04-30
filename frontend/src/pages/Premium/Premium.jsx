import React, { useContext, useEffect } from "react";
import PremiumCards from "../../components/Premium/PremiumCards";

import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

const Premium = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user.isVerified) {
      navigate("/premium");
    }
  }, []);

  return (
    <div className="bg-[url('https://tailwindcss.com/_next/static/media/docs@tinypng.d9e4dcdc.png')] bg-contain bg-top bg-no-repeat bg-white dark:bg-bgDark min-h-screen">
      <PremiumCards />
    </div>
  );
};

export default Premium;
