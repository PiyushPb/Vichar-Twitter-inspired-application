import React, { useEffect, useState, useContext } from "react";
import FeedHeader from "./FeedHeader";
import "../../App.css";

import NewsFeed from "./NewsFeed";
import FeedContainer from "../../components/Feed/FeedContainer";

const Feed = () => {
  const [feedLoaded, setFeedLoaded] = useState("following");

  return (
    <div className="w-full relative">
      <FeedHeader feedLoaded={feedLoaded} setFeedLoaded={setFeedLoaded} />

      {feedLoaded === "following" ? <FeedContainer /> : <NewsFeed />}
    </div>
  );
};

export default Feed;
