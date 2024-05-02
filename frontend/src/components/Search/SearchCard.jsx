import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { backend_url, token } from "../../config/config";

import { RiVerifiedBadgeFill } from "react-icons/ri";

const SearchCard = ({ user }) => {
  const { user: currentUser } = useContext(authContext);
  const isCurrentUser = currentUser._id === user._id;
  const [isHovered, setIsHovered] = useState(false);

  const [followersCount, setFollowersCount] = useState(user?.followers.length);

  useEffect(() => {
    setIsFollowed(currentUser.following.includes(user._id));
  }, [currentUser.following, user._id]);

  const handleFollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentUser) {
      return;
    }

    try {
      const response = await axios.put(
        `${backend_url}/v1/user/follow/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsFollowed(true);
      setFollowersCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentUser) {
      return;
    }

    try {
      const response = await axios.put(
        `${backend_url}/v1/user/unfollow/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsFollowed(false);
      setFollowersCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <div className="w-full h-fit bg-gray-200/60 dark:bg-baseDark p-5 rounded-md mb-5">
      <div className="flex gap-5 items-center">
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
          <img
            src={user.profilePic}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h1 className="font-bold text-textLight dark:text-textDark flex gap-1 justify-start items-center">
            <span
              className={
                user?.isVerified && user?.plan === "premiumPlus"
                  ? "text-[#ffc936] dark:text-[#FFD700]"
                  : null
              }
            >
              {user?.username}
            </span>
            {user?.isVerified && user?.plan && (
              <RiVerifiedBadgeFill
                size={18}
                className={
                  user?.plan === "basic"
                    ? "text-primaryBlue"
                    : "text-[#ffc936] dark:text-[#FFD700]"
                }
                title={user?.plan}
              />
            )}
          </h1>
          <h1 className="text-textLight dark:text-textDark text-[14px]">
            {user.name}
          </h1>
          <p className="text-textLight/70 dark:text-textDark/80 text-[14px]">
            {followersCount} Followers
          </p>
        </div>
        {isCurrentUser ? null : (
          <div className="transition duration-200 ease-in-out">
            {isFollowed ? (
              <div
                className="text-textLight dark:text-textDark py-2.5 px-4 border-2 rounded-full hover:border-red-400 hover:text-red-400 dark:hover:text-red-400 transition duration-200 ease-in-out cursor-pointer mt-5 flex justify-center items-center bg-white hover:bg-white dark:bg-darkBorderColor"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleUnfollow}
              >
                {isHovered ? "Unfollow" : "Followed"}
              </div>
            ) : (
              <div className="follow-btn bg-white" onClick={handleFollow}>
                Follow
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
