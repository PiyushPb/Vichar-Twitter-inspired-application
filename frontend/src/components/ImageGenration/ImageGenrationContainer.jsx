import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { backend_url } from "../../config/config";
import axios from "axios";
import uploadImageToCloudinary from "../../Utils/uploadCloudinary";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ImageGenrationContainer = () => {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [tweet, setTweet] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleTweetChange = (event) => {
    setTweet(event.target.value);
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${backend_url}/v1/premium/genrateImage`,
        { prompt }
      );
      setImageData(response.data.photoUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setIsLoading(false);
    }
  };

  const uploadToCloudinary = async () => {
    try {
      const uploadedImageUrl = await uploadImageToCloudinary(imageData);
      console.log("Uploaded Image URL:", uploadedImageUrl.url);
      return uploadedImageUrl.url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handlePostClick = async () => {
    try {
      setIsLoading(true);
      const imageUrl = await uploadToCloudinary();
      const response = await axios.post(
        `${backend_url}/v1/premium/addImage`,
        {
          images: [imageUrl],
          tweet: tweet,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsLoading(false);
      toast.success("Image uploaded successfully");
      navigate("/");
    } catch (error) {
      console.error("Error posting image:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">
      {!imageData && (
        <div>
          <h1 className="text-2xl font-bold text-textLight dark:text-textDark">
            Image Generation
          </h1>
          <div className="flex flex-col mt-5">
            <input
              type="text"
              placeholder="Enter prompt"
              className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark"
              onChange={handleChange}
              value={prompt}
            />
            <button
              className="bg-primaryBlue hover:bg-[#6dc7ff] transition-colors w-full text-white p-3 rounded-full cursor-pointer mt-5 max-w-[200px]"
              onClick={handleSubmitClick}
            >
              {isLoading ? (
                <HashLoader color="#ffffff" size={20} className="m-auto" />
              ) : (
                "Generate Image"
              )}
            </button>
          </div>
        </div>
      )}
      {imageData && (
        <div className="mt-5">
          <h1 className="my-5 text-2xl font-bold text-textLight dark:text-textDark">
            Image Generation
          </h1>
          <input
            type="text"
            value={tweet}
            onChange={handleTweetChange}
            placeholder="Write vichar..."
            className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark mb-5"
          />
          <img src={`${imageData}`} alt="Generated" className="max-w-[500px]" />
          <div className="flex flex-wrap gap-2">
            <button
              className={`bg-primaryBlue hover:bg-[#6dc7ff] transition-colors w-full text-white p-3 rounded-full cursor-pointer mt-5 max-w-[200px] ${
                isLoading && "opacity-50 cursor-not-allowed"
              } `}
              onClick={handlePostClick}
            >
              {isLoading ? (
                <HashLoader color="#ffffff" size={20} className="m-auto" />
              ) : (
                "Post Image"
              )}
            </button>
            <button
              className="bg-red-400 hover:bg-red-300 transition-colors w-full text-white p-3 rounded-full cursor-pointer mt-5 max-w-[200px]"
              onClick={() => setImageData(null)}
            >
              Regenerate image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenrationContainer;
