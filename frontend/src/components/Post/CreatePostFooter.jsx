import React from "react";
import { LuImage } from "react-icons/lu";

const CreatePostFooter = () => {
  const handleImageButtonClicked = () => {
    const fileInput = document.getElementById("vicharImagesInput");
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const allowedFiles = selectedFiles.slice(0, 4);

    const imageFiles = allowedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    console.log("Selected images:", imageFiles);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="">
        <input
          type="file"
          className="hidden"
          id="vicharImagesInput"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <LuImage
          onClick={handleImageButtonClicked}
          className="cursor-pointer hover:bg-rose-300 hover:text-rose-900 p-2 rounded-full transition duration-150 ease-in-out"
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
