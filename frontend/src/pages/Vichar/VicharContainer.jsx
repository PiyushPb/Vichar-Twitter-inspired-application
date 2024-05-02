import React, { useEffect, useState } from "react";
import PostCard from "../../components/Postcard/PostCard";
import { backend_url } from "../../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import CommentCard from "../../components/Postcard/CommentCard";

const VicharContainer = () => {
  const [tweet, setTweet] = useState({});
  const [userData, setUserData] = useState({});
  const params = useParams();
  const tweetId = params.tweetId;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isCommentHidden, setIsCommentHidden] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const fetchTweet = async () => {
    const response = await axios.get(
      `${backend_url}/v1/tweet/getTweet/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data.tweet);
    setTweet(response.data.tweet);
    setComments(response.data.tweet.comments);
    setUserData(response.data.user);
  };

  useEffect(() => {
    fetchTweet();
  }, [tweetId]);

  const addTweet = async () => {
    const response = await axios.post(
      `${backend_url}/v1/tweet/addComment`,
      {
        tweetId: tweetId,
        comment: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);

    setComment("");
    if (response.data.message === "Comment added successfully") {
      toast.success("Comment added successfully");
    } else if (
      response.data.message ===
      "Your comment goes against our community guidelines, we have hidden it by default, if you think theres some mistake please reach out to us."
    ) {
      toast.error(
        "Your comment goes against our community guidelines, we have hidden it by default, if you think theres some mistake please reach out to us."
      );
    } else {
      toast.error("Failed to add comment, Please try again later");
    }
    fetchTweet();
  };

  useEffect(() => {
    // Set the indexes of comments with sentimentScore less than -0.2
    const hiddenComments = comments.reduce((acc, comment, index) => {
      if (comment.sentimentScore < -0.2) {
        acc.push(index);
      }
      return acc;
    }, []);
    setIsCommentHidden(hiddenComments);
  }, [comments]);

  const handleOverlayClick = (index) => {
    // Remove the clicked comment index from isCommentHidden state
    setIsCommentHidden(isCommentHidden.filter((i) => i !== index));
  };

  return (
    <div className="w-full relative">
      <div className="w-full overflow-y-scroll pb-[220px] sm:pb-[20px] feedScroll">
        {/* ====================== */}
        {tweet && tweet._id && userData && (
          <PostCard
            key={tweet._id}
            postIndex={tweet._id}
            postData={tweet}
            userData={userData}
          />
        )}
        {/* ====================== */}
        <div className="text-textLight dark:text-textDark p-5 border-b-[2px] border-solid border-gray-300 ">
          <div className="flex gap-3 max-w-[600px] mx-auto">
            <figure>
              <img
                src={userData.profilePic}
                alt=""
                className="!w-[50px] !h-[50px] rounded-full object-cover"
              />
            </figure>
            <div className="w-full flex">
              <input
                type="text"
                name="comment"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
                className="w-full h-[50px] bg-bgLight dark:bg-bgDark outline-none text-textLight dark:text-textDark rounded-full px-3 placeholder:text-textLight dark:placeholder:text-textDark border-none"
              />
              <button
                className="bg-blue-300 hover:bg-blue-400 py-2 px-8 rounded-full text-white"
                onClick={addTweet}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
        {/* ====================== */}
        {/* ====================== */}
        {comments.map((comment, index) => (
          <div
            className="w-full border-b-2 border-solid border-gray-300 p-5 relative"
            key={index}
          >
            {isCommentHidden.includes(index) && (
              <div
                className="absolute top-0 left-0 h-full w-full bg-black/40 backdrop-blur-[3px] flex justify-center items-center cursor-pointer"
                onClick={() => handleOverlayClick(index)}
              >
                <p className="text-white text-center p-4 text-[12px] cursor-pointer">
                  This comment has been flagged as inappropriate, if you wish to
                  see it please click here
                </p>
              </div>
            )}
            <CommentCard commentData={comment} user={userData} />
          </div>
        ))}
        {/* ====================== */}
      </div>
    </div>
  );
};

export default VicharContainer;
