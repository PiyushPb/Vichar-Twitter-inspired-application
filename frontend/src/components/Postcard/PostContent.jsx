import React from "react";

const PostContent = ({ content, markTag, isPremium }) => {
  return (
    <>
      {isPremium ? (
        <div className="mt-5 text-[10px] text-blue-500 bg-blue-100 px-2 py-1 rounded-full border-solid border-[1px] border-blue-300 w-fit">
          This image has been genrated using Premium feature
        </div>
      ) : null}
      <div className=" mt-3">
        <p className="text-textLight dark:text-textDark">{markTag(content)}</p>
      </div>
    </>
  );
};

export default PostContent;
