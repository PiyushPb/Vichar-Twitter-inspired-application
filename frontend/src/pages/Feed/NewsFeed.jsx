import React, { useState, useEffect, useContext } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";

import { backend_url } from "../../config/config";
import { authContext } from "../../Context/AuthContext";

const NewsFeed = () => {
  const { state } = useContext(authContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const postsURL = `${backend_url}/v1/tweet/getNews`;
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
        data.news.map(async (post) => {
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
      {/* ====================== */}
      {posts.map((post) => (
        <NewsCard key={post._id} post={post} />
      ))}
      {/* ====================== */}
    </div>
  );
};

export default NewsFeed;
