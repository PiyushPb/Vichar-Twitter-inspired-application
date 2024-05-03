import React from "react";
import SubToPremium from "./TrendingSection/SubToPremium";
import TrendingContainer from "./TrendingSection/TrendingContainer";

const TrendingSection = () => {
  return (
    <div className="relative">
      <div className="w-fit h-fit bg-bgLight dark:bg-bgDark">
        <div className="p-6 xl:max-w-[350px] xl:min-w-[350px] w-fit hidden xl:flex h-screen border-l-2 border-solid border-gray-300 dark:border-darkBorderColor flex-col gap-5">
          <SubToPremium />
          <TrendingContainer />
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;
