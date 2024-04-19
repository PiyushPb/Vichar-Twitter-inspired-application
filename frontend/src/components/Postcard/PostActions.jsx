import React, { useEffect, useState } from "react";
import { backend_url } from "../../config/config";
import axios from "axios";
import { motion } from "framer-motion";

import { BiComment } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";

const PostActions = ({ actions, tweetId, userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(actions.likes.count);
  const [heartBeat, setHeartBeat] = useState(false);

  useEffect(() => {
    if (actions.likes.users.some((user) => user.userId === userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [actions.likes.users, userId]);

  const likeDislike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios.post(
        `${backend_url}/v1/tweet/likeTweet/`,
        {
          tweetId: tweetId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLikeCount(response.data.tweet.likes.count);
      setIsLiked(!isLiked);
      setHeartBeat(true);
      setTimeout(() => {
        setHeartBeat(false);
      }, 1000);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="flex justify-between items-center gap-5 mt-5">
      <div className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-primaryBlue dark:hover:text-primaryBlue transition duration-200 ease-in-out">
        <BiComment size={20} />
        <p className="text-[14px]">2.5k</p>
      </div>
      <div className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-green-400 dark:hover:text-green-400 transition duration-200 ease-in-out">
        <AiOutlineRetweet size={20} />
        <p className="text-[14px]">2.5k</p>
      </div>
      <div
        className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-rose-500 dark:hover:text-rose-500 transition duration-200 ease-in-out"
        onClick={likeDislike}
      >
        {isLiked ? (
          <motion.div
            animate={{ scale: heartBeat ? [1, 1.5, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <AiFillHeart size={20} className="text-rose-500" />
          </motion.div>
        ) : (
          <AiOutlineHeart size={20} />
        )}
        <p className="text-[14px]">
          {isLiked ? (
            <span className="text-rose-500">{likeCount}</span>
          ) : (
            likeCount
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-orange-400 dark:hover:text-orange-400 transition duration-200 ease-in-out">
        <AiOutlineBarChart size={20} />
        <p className="text-[14px]">2.5k</p>
      </div>
    </div>
  );
};

export default PostActions;
