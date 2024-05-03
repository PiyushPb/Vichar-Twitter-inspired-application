import React, { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import axios from "axios";
import { backend_url, token } from "../../config/config";
import PostCard from "../Postcard/PostCard";

const ProfileFeed = ({ userId, username, userData }) => {
  console.log(userData);
  const [userTweets, setUserTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserTweets = async () => {
    try {
      axios
        .get(`${backend_url}/v1/tweet/getUserTweets/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setUserTweets(response.data.tweets);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);

      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUserTweets();
  }, [userId]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : userTweets.length === 0 ? (
        <p className="text-textLight dark:text-textDark text-[16px] px-5">
          No tweets found for {username}
        </p>
      ) : (
        userTweets
          .reverse()
          .map((tweet, index) => (
            <PostCard
              key={index}
              postIndex={index + 1}
              postData={tweet}
              userData={userData}
            />
          ))
      )}
    </div>
  );
};

export default ProfileFeed;
