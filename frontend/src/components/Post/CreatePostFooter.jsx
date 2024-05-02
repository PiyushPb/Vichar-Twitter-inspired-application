import React, { useEffect, useRef, useState } from "react";
import { LuImage } from "react-icons/lu";
import { toast } from "react-toastify";
import { backend_url } from "../../config/config";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePostFooter = ({ setImages, vichar, maxAllowedText }) => {
  const fileInputRef = useRef(null);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);
  const [loaderColor, setLoaderColor] = useState("#3dadf2");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (vichar === "") {
      setPercentage(0);
    }

    if (vichar.length >= maxAllowedText) {
      setLoaderColor("#f54242");
    } else {
      setLoaderColor("#3dadf2");
    }

    if (vichar) {
      const maxLength = maxAllowedText;
      const currentLength = vichar.length;
      const calculatedPercentage = (currentLength / maxLength) * 100;
      setPercentage(calculatedPercentage > 100 ? 100 : calculatedPercentage);
    }
  }, [vichar]);

  const handlePostSubmit = async () => {
    try {
      const URL = backend_url + "/v1/tweet/createTweet";
      const vicharData = {
        tweet: vichar,
      };
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(vicharData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const handleImageButtonClicked = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const allowedFiles = selectedFiles.slice(0, 4 - selectedImagesCount);

    if (selectedImagesCount + allowedFiles.length > 4) {
      alert("You can only upload a maximum of 4 images");
      return;
    }

    const newImages = allowedFiles
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        file: file,
        url: URL.createObjectURL(file),
      }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setSelectedImagesCount((prevCount) => prevCount + newImages.length);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          id="vicharImagesInput"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          max={4}
        />
        <LuImage
          onClick={handleImageButtonClicked}
          className="cursor-pointer hover:bg-rose-300 hover:text-rose-900 p-2 rounded-full transition duration-150 ease-in-out dark:text-white dark:hover:text-rose-900"
          size={35}
        />
      </div>
      <div className="flex gap-3">
        <div className="w-[40px] h-[40px]">
          <CircularProgressbar
            value={percentage}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: `${loaderColor}`,
            })}
          />
        </div>
        <button
          className="bg-primaryBlue text-white px-4 py-2 rounded-full font-bold hover:bg-[#1d9bf0] transition duration-150 ease-in-out"
          onClick={handlePostSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostFooter;
