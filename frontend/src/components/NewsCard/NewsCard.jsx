import React, { useState, useEffect } from "react";
import UserInformation from "../Postcard/UserInformation";
import { BsThreeDots } from "react-icons/bs";

const NewsCard = ({ postIndex, post }) => {
  const [toggleCardSettings, setToggleCardSettings] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(`.card-settings-container-${postIndex}`)) {
        setToggleCardSettings(false);
      }
    };

    if (toggleCardSettings) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [toggleCardSettings, postIndex]);

  const toggleSettings = (e) => {
    e.stopPropagation();
    setToggleCardSettings(!toggleCardSettings);
  };

  return (
    <div className="w-full p-5 py-7 border-b-2 border-solid border-gray-300 dark:border-darkBorderColor cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover duration-150 ease-in-out transition">
      <div className="flex items-center">
        <div>
          <figure className="w-[50px] h-[50px] object-cover rounded-full overflow-hidden mr-2">
            <img
              src={post.user.data.profilePic}
              alt="pr"
              className="w-full h-full object-cover object-center"
            />
          </figure>
        </div>
        <div className="flex flex-row justify-between items-center w-full font-montserrat">
          <UserInformation
            username={post.user.data.name}
            handle={post.user.data.username}
            isVerified={post.user.data.isVerified}
            plan={post.user.data.plan}
          />
          <div className="flex items-center justify-center sm:justify-center md:justify-start relative">
            <BsThreeDots
              className="text-textLight dark:text-textDark p-2 rounded-full hover:text-primaryBlue hover:bg-blue-200 cursor-pointer transition ease-in-out duration-200 dark:hover:text-primaryBlue dark:hover:bg-gray-700"
              size={35}
              onClick={(e) => toggleSettings(e)}
            />
            <div
              className={`card-settings-container-${postIndex} absolute top-0 right-0 min-w-[250px] w-fit p-3 rounded-md text-textLight dark:text-textDark bg-[#ececec] dark:bg-[#202020] text-[14px]  ${
                toggleCardSettings ? "block" : "hidden"
              }`}
            >
              <ul className="whitespace-nowrap">
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-[10px] text-red-500 bg-red-100 px-2 py-1 rounded-full border-solid border-[1px] border-red-300 w-fit">
        This post has been done using Premium feature
      </div>
      <div className="mt-3">
        <h1 className="text-textLight dark:text-textDark font-bold text-[20px]">
          "{post.title}"
        </h1>
        <p className="text-textLight dark:text-textDark text-[14px] mt-3">
          <span className="font-bold">Article published at :</span>{" "}
          {post.createdOn}
        </p>
        <div className="w-[50px] border-b-[2px] border-solid border-gray-700 dark:border-darkBorderColor mt-3"></div>

        <p className="text-textLight dark:text-textDark text-[14px] mt-3">
          {post.summary}
        </p>

        <a
          href={post.artileURL || "#"}
          target="_blank"
          className="text-textLight dark:text-textDark text-[12px] mt-1"
        >
          Read full article
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
