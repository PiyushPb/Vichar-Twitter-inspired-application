import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../../../config/config";
import { toast } from "react-toastify";

const NewsPostForm = ({ newsData, setNewsData, artileURL }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(newsData.title);
  const [summary, setSummary] = useState(newsData.summary);

  const addNewsToDB = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/v1/premium/newsSummerization`,
        {
          title: title,
          summary: summary,
          polarity: newsData.polarity,
          articlePublishDate: newsData.publish_date,
          sentiment: newsData.sentiment,
          artileURL: artileURL,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success === true) {
        toast.success("News article posted Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to summarize news article, Please try again later");
      navigate("/");
    }
  };

  const handleOnChange = (e) => {
    // Define handleOnChange properly
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "summary") {
      setSummary(value);
    }
  };

  return (
    <div>
      <h1 className="my-5 text-2xl font-bold text-textLight dark:text-textDark">
        Summarized News
      </h1>
      <div className="">
        <input
          type="text"
          className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark"
          placeholder="Title"
          value={title}
          name="title"
          onChange={handleOnChange}
        />
        <textarea
          name="summary"
          id="summary"
          placeholder="Summary"
          rows="10"
          value={summary}
          onChange={handleOnChange}
          className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark my-5 resize-none"
        ></textarea>
        <p className="text-textLight/60 dark:text-textDark/60">
          {newsData.publish_date}
        </p>
        <div className="flex flex-wrap gap-0 sm:gap-2 mt-5">
          <button
            className="bg-primaryBlue hover:bg-[#6dc7ff] transition-colors w-full text-white p-3 rounded-full cursor-pointer max-w-[200px]"
            onClick={addNewsToDB}
          >
            Post
          </button>
          <button
            className="bg-red-400 hover:bg-red-300 transition-colors w-full text-white p-3 rounded-full cursor-pointer max-w-[200px]"
            onClick={() => {
              setNewsData(null);
            }}
          >
            Re summerize
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPostForm;
