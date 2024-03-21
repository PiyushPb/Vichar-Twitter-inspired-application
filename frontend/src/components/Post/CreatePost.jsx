import React, { useState } from "react";
import CreatePostFooter from "./CreatePostFooter";
import "./post.css";
import CreatePostImageContainer from "./CreatePostImageContainer";

const CreatePost = () => {
  const [open, setOpen] = useState(true);
  const [vichar, setVichar] = useState("");

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
        open ? "block" : "hidden"
      }`}
    >
      <div className="w-full md:w-fit h-fit overflow-y-auto md:transform md:-translate-x-1/2 md:-translate-y-1/2 absolute md:top-1/2 md:left-1/2 flex flex-col items-center gap-3">
        {/* TODO: Add close button */}
        <p className="text-white hidden md:block">Create Post</p>
        <div className="w-full md:min-w-[700px] h-screen md:h-fit md:max-h-[80vh] bg-white dark:bg-black md:rounded-xl p-7 flex flex-col justify-between md:justify-start">
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
                    className="w-full bg-transparent outline-none resize-none overflow-y-hidden min-h-[100px]"
                  />
                  <div id="image-container">
                    <CreatePostImageContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CreatePostFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
