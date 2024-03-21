import React, { useRef, useState } from "react";
import { LuImage } from "react-icons/lu";

const CreatePostFooter = ({ setImages }) => {
  const fileInputRef = useRef(null);
  const [selectedImagesCount, setSelectedImagesCount] = useState(0);

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
      <div>
        <button className="bg-primaryBlue text-white px-4 py-2 rounded-full font-bold hover:bg-[#1d9bf0] transition duration-150 ease-in-out">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostFooter;
