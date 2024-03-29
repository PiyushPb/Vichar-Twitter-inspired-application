import React from "react";

const CreatePostImageContainer = ({ images }) => {
  // const images = [
  //   "https://picsum.photos/200/300",
  //   // "https://picsum.photos/200/300",
  //   // "https://picsum.photos/200/300",
  //   // "https://picsum.photos/200/300",
  // ];

  let gridClassName;

  switch (images.length) {
    case 1:
      gridClassName = "grid-cols-1";
      break;
    case 2:
      gridClassName = "grid-cols-2";
      break;
    case 3:
      gridClassName = "grid-cols-4";
      break;
    case 4:
      gridClassName = "grid-cols-2 md:grid-cols-2";
      break;
    default:
      gridClassName = "grid-cols-1";
  }

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
            src={images[index].url}
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

export default CreatePostImageContainer;
