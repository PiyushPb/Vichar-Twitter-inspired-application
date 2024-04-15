import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import axios from "axios";
import { backend_url, token } from "../../config/config";

import ProfileCover from "./Components/ProfileCover";
import ProfileInfo from "./Components/ProfileInfo";

const ProfileSection = ({ user }) => {
  const { user: currentUser } = useContext(authContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [followersCount, setFollowersCount] = useState(user?.followers.length);
  const [followingCount, setFollowingCount] = useState(user?.following.length);

  const isCurrentUser = currentUser._id === user._id;

  useEffect(() => {
    setIsFollowed(currentUser.following.includes(user._id));
  }, [currentUser.following, user._id]);

  const handleFollow = async () => {
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
      setFollowersCount((prevCount) => prevCount + 1); // Increment followers count
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async () => {
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
      setFollowersCount((prevCount) => prevCount - 1); // Decrement followers count
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* profile cover photo */}
      <ProfileCover />
      {/* profile photo */}
      <div className="flex items-center justify-between w-full h-fit px-5">
        <div className="mt-[-60px] sm:mt-[-70px]">
          <img
            src={user?.profilePic}
            alt="Profile"
            className="w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] object-cover rounded-full border-2 border-solid border-textLight dark:border-textDark"
          />
        </div>
        {isCurrentUser ? (
          <div className="text-textLight dark:text-textDark py-2.5 px-4 border-2 rounded-full hover:bg-primaryBlue hover:text-white transition duration-200 ease-in-out cursor-pointer mt-5">
            Edit Profile
          </div>
        ) : (
          <div className="transition duration-200 ease-in-out">
            {isFollowed ? (
              <div
                className="text-textLight dark:text-textDark py-2.5 px-4 border-2 rounded-full hover:border-red-400 hover:text-red-400 dark:hover:text-red-400 transition duration-200 ease-in-out cursor-pointer mt-5 flex justify-center items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleUnfollow}
              >
                {isHovered ? "Unfollow" : "Followed"}
              </div>
            ) : (
              <div className="follow-btn" onClick={handleFollow}>
                Follow
              </div>
            )}
          </div>
        )}
      </div>
      {/* profile information */}
      <ProfileInfo
        user={user}
        followersCount={followersCount}
        followingCount={followingCount}
      />
    </div>
  );
};

export default ProfileSection;
