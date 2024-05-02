import React, { useEffect, useState, useContext } from "react";
import { backend_url } from "../../config/config";
import axios from "axios";
import { motion } from "framer-motion";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiSolidShareAlt } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../Context/AuthContext";

const PostActions = ({ actions, tweetId, userId, commentsNumber }) => {
  const { user } = useContext(authContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(actions.likes.count);
  const [heartBeat, setHeartBeat] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkBeat, setBookmarkBeat] = useState(false); // New state for bookmark animation

  useEffect(() => {
    setIsLiked(actions.likes.users.some((user) => user.userId === userId));
    setIsBookmarked(user.bookmarks.includes(tweetId));
  }, [actions.likes.users, userId, user.bookmarks, tweetId]);

  const handleShareButtonClicked = () => {
    toast.success("Copied to clipboard");
    navigator.clipboard.writeText(
      `https://pb-vichar-app.web.app/vichar/${tweetId}`
    );
  };

  const addRemovebookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios.post(
        `${backend_url}/v1/tweet/bookmarkTweet/`,
        {
          tweetId: tweetId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsBookmarked(!isBookmarked);
      setBookmarkBeat(true); // Trigger bookmark animation
      setTimeout(() => {
        setBookmarkBeat(false);
      }, 1000);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

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
      <Link
        to={`/vichar/${tweetId}`}
        className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-primaryBlue dark:hover:text-primaryBlue transition duration-200 ease-in-out"
      >
        <BiComment size={20} />
        <p className="text-[14px]">{commentsNumber}</p>
      </Link>
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
      <div className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-green-400 dark:hover:text-green-400 transition duration-200 ease-in-out">
        {isBookmarked ? (
          <motion.div
            animate={{ scale: bookmarkBeat ? [1, 1.5, 1] : 1 }} // Apply animation to the bookmark icon
            transition={{ duration: 0.3 }}
          >
            <BsBookmarkFill
              size={20}
              className="text-green-400"
              onClick={addRemovebookmark}
            />
          </motion.div>
        ) : (
          <BsBookmark size={20} onClick={addRemovebookmark} />
        )}
      </div>
      <div className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-orange-400 dark:hover:text-orange-400 transition duration-200 ease-in-out">
        <BiSolidShareAlt size={20} onClick={handleShareButtonClicked} />
      </div>
    </div>
  );
};

export default PostActions;
