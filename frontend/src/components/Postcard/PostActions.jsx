import React from "react";

import { BiComment } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineBarChart } from "react-icons/ai";

const PostActions = () => {
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
      <div className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-rose-500 dark:hover:text-rose-500 transition duration-200 ease-in-out">
        <AiOutlineHeart size={20} />
        <p className="text-[14px]">2.5k</p>
      </div>
      <div className="flex items-center gap-2 text-textLight dark:text-textDark cursor-pointer hover:text-orange-400 dark:hover:text-orange-400 transition duration-200 ease-in-out">
        <AiOutlineBarChart size={20} />
        <p className="text-[14px]">2.5k</p>
      </div>
    </div>
  );
};

export default PostActions;
