import React, { useState, useEffect, useContext } from "react";

import PostCard from "../../components/Postcard/PostCard";

import { backend_url } from "../../config/config";
import { authContext } from "../../Context/AuthContext";
const Bookmarks = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const postsURL = `${backend_url}/v1/tweet/getBookmarkTweets`;
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
      console.log(postsWithUserInfo);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full overflow-y-scroll pb-[220px] sm:pb-[20px] feedScroll">
      {posts.length === 0 ? (
        <p className="text-textLight dark:text-textDark p-5">
          No bookmarks found
        </p>
      ) : (
        posts
          .reverse()
          .map((post, index) => (
            <PostCard
              key={index}
              postIndex={index + 1}
              postData={post}
              userData={post.user.data}
            />
          ))
      )}
    </div>
  );
};

export default Bookmarks;
