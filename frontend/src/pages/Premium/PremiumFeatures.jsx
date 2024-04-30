import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authContext } from "../../Context/AuthContext";
import PremiumCardsContainer from "../../components/PremiumFeaturesComponents/PremiumCardsContainer";

const PremiumFeatures = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  useEffect(() => {
    console.log(user);
    if (!user.isVerified) {
      navigate("/premium_signup");
    }
  }, []);

  console.log(user);
  return (
    <div className="p-5 w-full relative">
      <PremiumCardsContainer />
    </div>
  );
};

export default PremiumFeatures;
