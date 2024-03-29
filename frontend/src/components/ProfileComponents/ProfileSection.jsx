// TODO: Add a alt image in the cover photo
import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";

import { IoCalendarNumberOutline } from "react-icons/io5";

const ProfileSection = ({ user }) => {
  const { user: currentUser } = useContext(authContext);

  const isCurrentUser = currentUser._id === user._id;

  return (
    <div className="flex flex-col">
      {/* profile cover photo */}
      <div>
        <div className="w-full h-[140px] sm:h-[200px] overflow-hidden">
          <img
            src="https://source.unsplash.com/random"
            alt="..."
            className="object-center w-full h-full object-cover"
          />
        </div>
      </div>
      {/* profile photo */}
      <div className="flex items-center justify-between w-full h-fit px-5">
        <div className="mt-[-60px] sm:mt-[-70px]">
          <img
            src={user?.profilePic}
            alt="Profile"
            className="w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] object-cover rounded-full border-2 border-solid border-textLight dark:border-textDark"
          />
        </div>
        {isCurrentUser && (
          <div className="text-textLight dark:text-textDark py-2.5 px-4 border-2 rounded-full hover:bg-primaryBlue hover:text-white transition duration-200 ease-in-out cursor-pointer mt-5">
            Edit Profile
          </div>
        )}
      </div>
      {/* profile information */}
      <div className="p-5 mt-3 flex flex-col gap-1">
        <p className="text-textLight dark:text-textDark text-[18px] font-bold">
          {user?.name}
        </p>
        <p className="text-textLight dark:text-textDark text-[14px] opacity-80">
          {user?.username}
        </p>
        <div className="mt-2 flex gap-2 justify-start items-center opacity-70">
          <IoCalendarNumberOutline
            className="text-textLight dark:text-textDark"
            size={20}
          />

          {/* TODO: Add joined date */}
          <p className="text-textLight dark:text-textDark text-[14px]">
            Joined March 2020
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
