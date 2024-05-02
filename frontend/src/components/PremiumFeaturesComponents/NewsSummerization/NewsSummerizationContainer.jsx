import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_url, models_url } from "../../../config/config";
import NewsPostForm from "./NewsPostForm";
import { HashLoader } from "react-spinners";

const NewsSummerizationContainer = () => {
  const [newsURL, setNewsURL] = useState("");
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setNewsURL(event.target.value);
  };
  const handleSubmitClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${models_url}/analyzeUrl`, {
        url: newsURL,
      });

      setIsLoading(false);
      toast.success("News article summarized Successfully");
      setNewsData(response.data);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to summarize news article, Please try again later");
    }
  };
  return (
    <div>
      {!newsData && (
        <div>
          <h1 className="text-2xl font-bold text-textLight dark:text-textDark">
            News Summerization
          </h1>
          <div className="flex flex-col  mt-5">
            <input
              type="text"
              placeholder="Enter news url"
              className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark"
              onChange={handleChange}
              value={newsURL}
            />
            <button
              className="bg-primaryBlue hover:bg-[#6dc7ff] transition-colors w-full text-white p-3 rounded-full cursor-pointer mt-5 max-w-[200px]"
              onClick={handleSubmitClick}
            >
              {isLoading ? (
                <HashLoader color="#ffffff" size={20} className="m-auto" />
              ) : (
                "Summarize"
              )}
            </button>
          </div>
        </div>
      )}
      {/* =========================== */}
      {newsData && (
        <NewsPostForm newsData={newsData} setNewsData={setNewsData} />
      )}
    </div>
  );
};

export default NewsSummerizationContainer;
