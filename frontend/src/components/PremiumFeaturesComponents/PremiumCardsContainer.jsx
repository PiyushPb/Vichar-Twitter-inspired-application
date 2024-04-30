import React from "react";
import { Link } from "react-router-dom";
import { premiumFeaturesSchema } from "./PremiumFeaturesSchema";
import PremiumFeatureCard from "./PremiumFeatureCard";

const PremiumCardsContainer = () => {
  return (
    <div className="w-full max-w-[700px] mx-auto">
      {premiumFeaturesSchema.map((item) => (
        <div className="mt-5 w-full" key={item.id}>
          <PremiumFeatureCard
            title={item.title}
            description={item.description}
            premiumAccess={item.premiumAccess}
          />
        </div>
      ))}
    </div>
  );
};

export default PremiumCardsContainer;
