import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProfileHeader = ({ user }) => {
  return (
    <div className="w-full h-fit p-5 gap-5 justify-start items-center hidden sm:flex border-b-2 border-solid border-gray-300 dark:border-darkBorderColor">
      <Link to={"/"}>
        <IoArrowBackOutline
          className="text-textLight dark:text-textDark
          cursor-pointer p-2 hover:bg-lightHover dark:hover:bg-darkHover rounded-full transition duration-200 ease-in-out"
          size={35}
        />
      </Link>
      {user ? (
        <div>
          <p className="text-textLight dark:text-textDark text-[18px] font-bold">
            {user?.name}
          </p>
          <p className="text-textLight dark:text-textDark text-[14px]">
            {/* TODO : add the number of followers dynamically */}
            1.5k Followers
          </p>
        </div>
      ) : (
        <p className="text-textLight dark:text-textDark text-[18px] font-bold">
          Profile
        </p>
      )}
    </div>
  );
};

export default ProfileHeader;
