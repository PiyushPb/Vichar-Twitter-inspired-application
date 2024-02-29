import React from "react";
import HeaderData from "./HeaderData";
import vicharLogo from "../../assets/vicharlogo.png";

import HomeIcon from "../../assets/HeaderIcons/Home.svg";
import SearchIcon from "../../assets/HeaderIcons/Search.svg";
import NotificationIcon from "../../assets/HeaderIcons/Notification.svg";
import BookmarkIcon from "../../assets/HeaderIcons/Bookmark.svg";
import PremiumIcon from "../../assets/HeaderIcons/Premium.svg";
import { BsThreeDots } from "react-icons/bs";

const iconComponents = {
  HomeIcon,
  SearchIcon,
  NotificationIcon,
  BookmarkIcon,
  PremiumIcon,
};

const Header = () => {
  const headerData = HeaderData;

  return (
    <header className="p-6 max-w-[350px] h-screen border-r-2 border-solid border-gray-300 flex flex-col justify-between">
      <div>
        <div>
          <img src={vicharLogo} className="w-[40px] mb-[50px]" />
        </div>
        {headerData.map((item) => {
          const IconComponent = iconComponents[item.icon];
          return (
            <div key={item.id} className="flex items-center gap-5 mb-5">
              <img
                src={IconComponent}
                className="w-[25px] h-[25px] stroke-cyan-500 fill-red-500"
              />
              <h2 className="text-[18px] text-textLight dark:text-textDark">
                {item.title}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-5">
        <button className="bg-primaryBlue hover:bg-[#307baa] transition-colors w-full text-white p-3 rounded-full">
          Post
        </button>
        <div className="flex justify-between items-center gap-2 cursor-pointer rounded-full hover:bg-gray-300 dark:hover:bg-[#2b2b2b] transition-colors px-4 py-3">
          <div className="flex justify-center items-center gap-3">
            <figure>
              <img
                src="https://img.freepik.com/free-photo/pleasant-looking-caucasian-female-with-long-hair-wearing-yellow-casual-shirt-having-good-mood-looking-happily-camera_176532-11558.jpg"
                className="w-[50px] h-[50px] rounded-full bg-cover bg-center object-cover"
                alt=""
              />
            </figure>
            <div>
              <p className="font-bold text-[16px] text-textLight dark:text-textDark">
                Piyush Pardeshi
              </p>
              <p className="text-[14px] text-textLight dark:text-textDark">
                @pixi
              </p>
            </div>
          </div>
          <BsThreeDots
            size={20}
            className="text-textLight dark:text-textDark"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
