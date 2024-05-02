import React from "react";
import { Link } from "react-router-dom";

const CommentCard = ({ commentData, user }) => {
  console.log(commentData);
  return (
    <div className="w-full max-w-[600px] mx-auto">
      <p className="text-textLight dark:text-textDark mb-3">
        {commentData.comment}
      </p>
      <p className="text-textLight dark:text-textDark text-[14px]">
        Commented by @
        <span>
          <Link to={`/${user.username}`}>{user.username}</Link>
        </span>
      </p>
    </div>
  );
};

export default CommentCard;
