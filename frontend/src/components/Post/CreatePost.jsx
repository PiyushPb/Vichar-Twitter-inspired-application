import React, { useState } from "react";
import "./post.css";
import CreatePostFooter from "./CreatePostFooter";
import CreatePostImageContainer from "./CreatePostImageContainer";
import { useCreatePostModel } from "../../Context/CreatePostModelContext";

const CreatePost = () => {
  const { showCreatePostModel, openCreatePostModel, closeCreatePostModel } =
    useCreatePostModel();
  const [vichar, setVichar] = useState("");
  const [images, setImages] = useState([]);

  const handleChange = (event) => {
    setVichar(event.target.value);
  };

  const handleInput = (event) => {
    const target = event.target;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;

    //image-container height
    const imgContainer = document.getElementById("image-container");
    let imgContainerHeight = imgContainer.offsetHeight;

    // Adjust parent div height
    const parentDiv = target.parentElement;
    parentDiv.style.height = `${imgContainerHeight}px` + imgContainerHeight;

    // Add or remove scrollbar class based on textarea height
    const textareaContainer = document.querySelector(".textarea-container");
    if (target.scrollHeight > 100) {
      textareaContainer.classList.add("overflow-y-auto");
    } else {
      textareaContainer.classList.remove("overflow-y-auto");
    }
  };

  return (
    <div
      className={`w-full h-screen fixed z-10 bg-black backdrop-filter backdrop-blur-lg bg-opacity-60 ${
        showCreatePostModel ? "block" : "hidden"
      }`}
      onClick={() => closeCreatePostModel()}
    >
      <div className="w-full md:w-fit h-fit overflow-y-auto md:transform md:-translate-x-1/2 md:-translate-y-1/2 absolute md:top-1/2 md:left-1/2 flex flex-col items-center gap-3">
        {/* TODO: Add close button */}
        <p className="text-white hidden md:block">Create Post</p>
        <div
          className="w-full md:min-w-[700px] h-screen md:h-fit md:max-h-[80vh] bg-white dark:bg-bgDark md:rounded-xl p-7 flex flex-col justify-between md:justify-start"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-3 min-h-[150px]">
            <div>
              <figure className="w-[50px] h-[50px]">
                <img
                  src="https://source.unsplash.com/random"
                  alt=""
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </figure>
            </div>
            <div className="w-full">
              <p className="text-textLight dark:text-textDark text-[16px]">
                @pixi
                {/* TODO: Add username dynamically */}
              </p>
              <div className="w-full max-h-[80vh] md:max-h-[60vh] overflow-hidden mb-5">
                <div className="textarea-container max-h-[80vh] md:max-h-[60vh] overflow-y-auto">
                  <textarea
                    value={vichar}
                    onChange={handleChange}
                    onInput={handleInput}
                    placeholder="What's on your mind"
                    className="w-full bg-transparent outline-none resize-none overflow-y-hidden min-h-[100px] dark:text-textDark"
                  />
                  <div id="image-container">
                    <CreatePostImageContainer images={images} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CreatePostFooter setImages={setImages} vichar={vichar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
