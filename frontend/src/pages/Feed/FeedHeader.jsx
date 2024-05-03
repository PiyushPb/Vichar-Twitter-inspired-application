import React from "react";

const FeedHeader = ({ feedLoaded, setFeedLoaded }) => {
  return (
    <div className="sticky top-[79.5px] sm:top-0 bg-bgLight dark:bg-bgDark">
      <div className="flex w-full max-w-700 justify-between border-b-2 border-solid border-gray-300 dark:border-darkBorderColor">
        <div
          className="h-[60px] w-full flex justify-center items-center hover:bg-lightHover dark:hover:bg-darkHover transition ease-in-out duration-300 cursor-pointer"
          onClick={() => setFeedLoaded("following")}
        >
          <span
            className={`${
              feedLoaded === "following" ? "activeFeedBtn" : "inactiveFeedBtn"
            }`}
          >
            For you
          </span>
        </div>
        <div
          className="h-[60px] w-full flex justify-center items-center hover:bg-lightHover dark:hover:bg-darkHover transition ease-in-out duration-300 cursor-pointer text-textLight dark:text-textDark"
          onClick={() => setFeedLoaded("news")}
        >
          <span
            className={`${
              feedLoaded === "news" ? "activeFeedBtn" : "inactiveFeedBtn"
            }`}
          >
            News
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedHeader;
