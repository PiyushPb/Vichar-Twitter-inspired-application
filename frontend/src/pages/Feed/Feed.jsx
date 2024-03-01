import React from "react";
import FeedHeader from "./FeedHeader";
import "../../App.css";
import PostCard from "../../components/Postcard/PostCard";

const Feed = () => {
  const images = [
    "https://source.unsplash.com/random?q=1",
    "https://source.unsplash.com/random?q=2",
    "https://source.unsplash.com/random?q=3",
    "https://source.unsplash.com/random?q=4",
  ];
  return (
    <div className="w-fullrelative">
      <FeedHeader />
      <div className="w-full overflow-y-scroll pb-[220px] sm:pb-[20px] feedScroll">
        <PostCard postIndex={1} images={images} />
      </div>
    </div>
  );
};

export default Feed;
