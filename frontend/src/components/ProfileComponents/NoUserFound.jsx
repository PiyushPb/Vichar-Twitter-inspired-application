import React from "react";
import { useParams } from "react-router-dom";

const NoUserFound = () => {
  const params = useParams();
  return (
    <div className="w-full h-[340px] flex justify-center items-center">
      <div>
        <p className="font-bold text-textLight dark:text-textDark text-[30px]">
          This account (@{params.username}) doesn't exist
        </p>
        <p>Try searching for someone else...</p>
      </div>
    </div>
  );
};

export default NoUserFound;
