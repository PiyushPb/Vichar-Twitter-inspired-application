import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { backend_url, token } from "../../config/config";

import ProfileCover from "./Components/ProfileCover";
import ProfileInfo from "./Components/ProfileInfo";

import ProfileFeed from "../ProfileFeed/ProfileFeed";
import NewsFeed from "../ProfileFeed/NewsFeed";

const ProfileSection = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useContext(authContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [followersCount, setFollowersCount] = useState(user?.followers.length);
  const [followingCount, setFollowingCount] = useState(user?.following.length);

  const [feedLoaded, setFeedLoaded] = useState("following");

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
      setFollowersCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-y-scroll pb-[220px] sm:pb-[45px] feedScroll">
      {/* profile cover photo */}
      <div>
        <ProfileCover />
      </div>
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
          <Link
            to={"/settings"}
            className="text-textLight dark:text-textDark py-2.5 px-4 border-2 rounded-full hover:bg-primaryBlue hover:text-white transition duration-200 ease-in-out cursor-pointer mt-5"
          >
            Edit Profile
          </Link>
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

      <div className="flex w-full bg-bgLight dark:bg-bgDark max-w-700 justify-between border-b-2 border-solid border-gray-300 dark:border-darkBorderColor sticky top-[0px] z-[50]">
        <div
          className="h-[60px] w-full flex justify-center items-center hover:bg-lightHover dark:hover:bg-darkHover transition ease-in-out duration-300 cursor-pointer"
          onClick={() => setFeedLoaded("following")}
        >
          <span
            className={`${
              feedLoaded === "following" ? "activeFeedBtn" : "inactiveFeedBtn"
            }`}
          >
            For you
          </span>
        </div>
        <div
          className="h-[60px] w-full flex justify-center items-center hover:bg-lightHover dark:hover:bg-darkHover transition ease-in-out duration-300 cursor-pointer text-textLight dark:text-textDark "
          onClick={() => setFeedLoaded("news")}
        >
          <span
            className={`${
              feedLoaded === "news" ? "activeFeedBtn" : "inactiveFeedBtn"
            }`}
          >
            News
          </span>
        </div>
      </div>

      {feedLoaded === "following" ? (
        <ProfileFeed userId={user._id} username={user.name} userData={user} />
      ) : (
        <NewsFeed userId={user._id} username={user.name} userData={user} />
      )}
    </div>
  );
};

export default ProfileSection;
