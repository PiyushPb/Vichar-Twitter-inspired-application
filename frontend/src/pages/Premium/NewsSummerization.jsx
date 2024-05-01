import React from "react";
import NewsSummerizationContainer from "../../components/PremiumFeaturesComponents/NewsSummerization/NewsSummerizationContainer";

const NewsSummerization = () => {
  return (
    <div className="h-screen w-full p-5">
      <div className="w-full overflow-y-scroll pb-[220px] sm:pb-[20px] feedScroll">
        <NewsSummerizationContainer />
      </div>
    </div>
  );
};

export default NewsSummerization;
