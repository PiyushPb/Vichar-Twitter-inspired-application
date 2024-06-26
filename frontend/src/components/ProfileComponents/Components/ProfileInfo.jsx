import React, { useEffect, useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ProfileInfo = ({ user, followersCount, followingCount }) => {
  return (
    <div className="p-5 mt-3 flex flex-col gap-1">
      <p className="text-textLight dark:text-textDark text-[18px] font-bold">
        {user?.name}
      </p>
      <p className="text-textLight dark:text-textDark text-[14px] opacity-80 flex justify-start items-center gap-1 ">
        <p
          className={
            user?.isVerified && user?.plan === "premiumPlus"
              ? "text-[#ffbf36] font-bold dark:text-[#FFD700]"
              : null
          }
        >
          @{user?.username}
        </p>
        {user?.isVerified && user?.plan && (
          <RiVerifiedBadgeFill
            size={18}
            className={
              user?.plan === "basic"
                ? "text-primaryBlue"
                : "text-[#ffc936] dark:text-[#FFD700]"
            }
            title={user?.plan}
          />
        )}
      </p>
      <div className="mt-2 flex gap-2 justify-start items-center opacity-70">
        <IoCalendarNumberOutline
          className="text-textLight dark:text-textDark"
          size={20}
        />
        <p className="text-textLight dark:text-textDark text-[14px]">
          Joined March 2020
        </p>
      </div>
      <div className="flex gap-4 justify-start items-center">
        <p className="text-textLight dark:text-textDark text-[14px] opacity-80 mt-5">
          {followersCount} Followers
        </p>
        <p className="text-textLight dark:text-textDark text-[14px] opacity-80 mt-5">
          {followingCount} Following
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
