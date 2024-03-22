import React, { useEffect, useState, useContext } from "react";
import FeedHeader from "./FeedHeader";
import "../../App.css";
import PostCard from "../../components/Postcard/PostCard";

import { backend_url } from "../../config/config";
import { authContext } from "../../Context/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useContext(authContext);

  const fetchPosts = async () => {
    try {
      const postsURL = "http://localhost:8000/v1/tweet/getTweets";
      const response = await fetch(postsURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      // Fetch user information for each post
      const postsWithUserInfo = await Promise.all(
        data.tweets.map(async (post) => {
          const userResponse = await fetch(
            `${backend_url}/v1/user/userUID/${post.userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user information");
          }
          const userData = await userResponse.json();
          return { ...post, user: userData };
        })
      );
      setPosts(postsWithUserInfo);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full relative">
      <FeedHeader />
      <div className="w-full overflow-y-scroll pb-[220px] sm:pb-[20px] feedScroll">
        {posts.map((post, index) => {
          return (
            <PostCard
              key={index}
              postIndex={index + 1}
              postData={post}
              userData={post.user.data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
