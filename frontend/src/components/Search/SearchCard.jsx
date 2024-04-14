import React from "react";

const SearchCard = ({ user }) => {
  return (
    <div className="w-full h-fit bg-gray-200/60 dark:bg-baseDark p-5 rounded-md mb-5">
      <div className="flex gap-5 items-center">
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
          <img
            src={user.profilePic}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h1 className="font-bold text-textLight dark:text-textDark ">
            {user.username}
          </h1>
          <h1 className="text-textLight dark:text-textDark text-[14px]">
            {user.name}
          </h1>
          <p className="text-textLight/70 dark:text-textDark/80 text-[14px]">
            {/* TODO : add the number of followers dynamically */}
            15 Followers
          </p>
        </div>
        <div className="px-3 py-2 border-2 rounded-md text-textLight dark:text-textDark text-[14px] cursor-pointer bg-white hover:bg-[#f2f2f2] transition duration-200 ease-in-out">
          Follow
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
