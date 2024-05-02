import React, { useState, useEffect, useContext } from "react";
import { BsThreeDots } from "react-icons/bs";
import UserInformation from "./UserInformation";
import PostContent from "./PostContent";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import { authContext } from "../../Context/AuthContext";

const PostCard = ({ postIndex, postData, userData }) => {
  const { user: currentUser } = useContext(authContext);

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

  const markTag = (text) => {
    return text.split(/\s+/).map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} style={{ color: "#3DADF2ff" }}>
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  let gridClassName;

  switch (postData.images.length) {
    case 1:
      gridClassName = "grid-cols-1";
      break;
    case 2:
      gridClassName = "grid-cols-2";
      break;
    case 3:
      gridClassName = "grid-cols-4";
      break;
    case 4:
      gridClassName = "grid-cols-2 md:grid-cols-2";
      break;
    default:
      gridClassName = "grid-cols-1";
  }

  return (
    <>
      <div
        className="w-full p-5 py-7 border-b-2 border-solid border-gray-300 dark:border-darkBorderColor cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover duration-150 ease-in-out transition"
        onClick={() => console.log("container clicked")}
      >
        <div className="max-w-[600px] m-auto z-1">
          <div className="flex items-center">
            <div>
              <figure className="w-[50px] h-[50px] object-cover rounded-full overflow-hidden mr-2">
                <img
                  src={userData.profilePic}
                  alt="pr"
                  className="w-full h-full object-cover object-center"
                />
              </figure>
            </div>
            <div className="flex flex-row justify-between items-center w-full font-montserrat">
              <UserInformation
                username={userData.name}
                isVerified={userData.isVerified}
                plan={userData.plan}
                handle={userData.username}
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
          {/* post content */}
          <PostContent
            content={postData.tweet}
            markTag={markTag}
            isPremium={postData.isPremium}
          />
          {/* post image */}
          <PostImage images={postData.images} gridClassName={gridClassName} />
          <PostActions
            actions={postData}
            tweetId={postData._id}
            userId={currentUser._id}
          />
        </div>
      </div>
    </>
  );
};

export default PostCard;
