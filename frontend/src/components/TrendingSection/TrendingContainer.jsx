import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../config/config";

const TrendingContainer = () => {
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const response = await axios.get(`${backend_url}/v1/tweet/getTrending`);

    setTrending(response.data.trends);
    console.log(response.data.trends);
  };

  useEffect(() => {
    getTrending();
  }, []);
  return (
    <div className="border-[1px] border-solid border-gray-300 dark:border-darkBorderColor p-3 rounded-[10px]">
      <p className="text-textLight dark:text-textDark text-[16px] font-bold">
        What's Trending
      </p>
      {trending.length === 0 ? (
        <p className="text-textLight dark:text-textDark text-[14px]">
          No trending found
        </p>
      ) : (
        trending.map((trend) => <p key={trend._id}>#{trend.trends}</p>)
      )}
    </div>
  );
};

export default TrendingContainer;
