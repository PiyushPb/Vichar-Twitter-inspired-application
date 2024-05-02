import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { premiumFeaturesSchema } from "./PremiumFeaturesSchema";
import PremiumFeatureCard from "./PremiumFeatureCard";
import { authContext } from "../../Context/AuthContext";

const PremiumCardsContainer = () => {
  const { user } = useContext(authContext);
  console.log(user);
  return (
    <div className="w-full max-w-[700px] mx-auto">
      {premiumFeaturesSchema.map((item) => (
        <div className="mt-5 w-full" key={item.id}>
          <PremiumFeatureCard
            path={item.path}
            title={item.title}
            description={item.description}
            premiumAccess={item.premiumAccess}
            userPremiumStatus={user.plan}
          />
        </div>
      ))}
    </div>
  );
};

export default PremiumCardsContainer;
