import React, { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import axios from "axios";
import { backend_url, token } from "../../config/config";
import NewsCard from "../NewsCard/NewsCard";

const NewsFeed = ({ userId, username, userData }) => {
  const [news, setNews] = useState([]);

  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserNews = async () => {
    try {
      const postsURL = `${backend_url}/v1/tweet/getUsersNews/${userId}`;
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
      setPost(postsWithUserInfo);
      console.log(postsWithUserInfo);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getUserNews();
  }, [userId]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : post.length === 0 ? (
        <p className="text-textLight dark:text-textDark text-[16px] px-5">
          No news found for {username}
        </p>
      ) : (
        post.reverse().map((post) => <NewsCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default NewsFeed;
