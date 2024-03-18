import React from "react";

const PostImage = ({ images, gridClassName }) => {
  return (
    <div className={`grid mt-4 gap-1 items-stretch ${gridClassName}`}>
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className={`
          ${index === 0 && images.length === 3 ? "col-span-2" : ""}
          ${index === 1 && images.length === 3 ? "col-span-2" : ""}
          ${index === 2 && images.length === 3 ? "col-span-4" : ""}`}
          // className={`${
          //   index === 2 && images.length === 3 ? "col-span-4" : "col-span-1"
          // } ${index === 3 ? "col-span-1" : ""} ${
          //   index === 2 && images.length === 3 ? "" : ""
          // }`}
        >
          <img
            onClick={(e) => {
              e.stopPropagation();
              console.log("Image clicked - ", index);
            }}
            src={imageUrl}
            alt={`pr-${index}`}
            className={`max-h-[400px] w-fit rounded-md object-cover ${
              images.length === 2 ? "h-[350px] sm:h-[400px] w-full" : ""
            } ${images.length === 3 ? "h-[200px] sm:h-[250px] w-full" : ""} ${
              images.length === 4 ? "h-[200px] sm:h-[250px] w-full" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default PostImage;
