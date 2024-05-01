import React from "react";
import NewsCard from "../../components/NewsCard/NewsCard";

const NewsFeed = () => {
  return (
    <div className="w-full overflow-y-scroll pb-[220px] sm:pb-[20px] feedScroll">
      {/* ====================== */}
      <NewsCard />
      {/* ====================== */}
    </div>
  );
};

export default NewsFeed;
