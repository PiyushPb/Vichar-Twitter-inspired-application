import React from "react";

const PostContent = ({ content, markTag }) => {
  return (
    <div className=" mt-3">
      <p className="text-textLight dark:text-textDark">{markTag(content)}</p>
    </div>
  );
};

export default PostContent;
