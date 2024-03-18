import React from "react";
import HeaderData from "./HeaderData";
import vicharLogo from "../../assets/vicharlogo.png";

import HomeIcon from "../../assets/HeaderIcons/Home.svg";
import SearchIcon from "../../assets/HeaderIcons/Search.svg";
import NotificationIcon from "../../assets/HeaderIcons/Notification.svg";
import BookmarkIcon from "../../assets/HeaderIcons/Bookmark.svg";
import PremiumIcon from "../../assets/HeaderIcons/Premium.svg";
import AddVichar from "../../assets/HeaderIcons/AddVichar.svg";
import SettingIcon from "../../assets/HeaderIcons/Settings.svg";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

import { authContext } from "../../Context/AuthContext";

const iconComponents = {
  HomeIcon,
  SearchIcon,
  NotificationIcon,
  BookmarkIcon,
  PremiumIcon,
};

const Header = () => {
  const headerData = HeaderData;

  const { user } = React.useContext(authContext);

  return (
    <header className="z-9 w-fit bg-bgLight h-screen dark:bg-bgDark">
      {/* // Computer header */}
      <div className="h-full p-6 md:max-w-[270px] md:min-w-[270px] lg:max-w-[350px] lg:min-w-[350px] w-fit hidden sm:flex border-r-2 border-solid border-gray-300 dark:border-darkBorderColor flex-col justify-between">
        <div>
          <div className="flex items-center justify-center sm:justify-center md:justify-start">
            <img src={vicharLogo} className="w-[40px] mb-[50px]" />
          </div>
          {headerData.map((item) => {
            const IconComponent = iconComponents[item.icon];
            return (
              <Link to={item.path} key={item.id} className="cursor-pointer">
                <div className="flex items-center justify-center sm:justify-center md:justify-start gap-5 mb-5 py-2">
                  <img src={IconComponent} className="w-[25px] h-[25px] " />
                  <h2 className="text-[18px] text-textLight dark:text-textDark hidden md:block">
                    {item.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col gap-5">
          {/* TODO: Add Post button handler here */}
          <Link to={"/"}>
            <button className="bg-primaryBlue hover:bg-[#307baa] transition-colors w-fit sm:w-full text-white p-3 rounded-full ">
              <span className="hidden md:block">Post</span>
              <img src={AddVichar} className="md:hidden block w-[25px]" />
            </button>
          </Link>
          <Link
            to={`${user?.username}`}
            className="flex justify-between items-center gap-2 cursor-pointer rounded-full hover:bg-gray-300 dark:hover:bg-[#2b2b2b] transition-colors p-0 xl:px-4 xl:py-3 md:px-3 md:py-2"
          >
            <div className="flex justify-center items-center gap-3">
              <figure>
                <img
                  src={user?.profilePic}
                  className="w-[50px] h-[50px] rounded-full bg-cover bg-center object-cover"
                  alt=""
                />
              </figure>
              <div className="hidden md:block">
                <p className="font-bold text-[1em] md:text-[14px] text-textLight dark:text-textDark">
                  {user?.name}
                </p>
                <p className="text-[14px] md:text-[12px] text-textLight dark:text-textDark">
                  @{user?.username}
                </p>
              </div>
            </div>
            <BsThreeDots
              size={20}
              className="text-textLight dark:text-textDark hidden md:block  "
            />
          </Link>
        </div>
      </div>
      {/* // Mobile header */}
      <div className="sm:hidden w-full h-fit p-5 fixed top-0 bg-bgLight dark:bg-bgDark flex justify-center items-center">
        <div className="w-full max-w-md flex flex-row justify-between ">
          <figure>
            <img
              src={user?.profilePic}
              className="w-[40px] h-[40px] rounded-full bg-cover bg-center object-cover"
              alt=""
            />
          </figure>
          <div className="flex items-center justify-center xl:justify-start">
            <img src={vicharLogo} className="w-[30px] h-[30px]" />
          </div>
          <div className="flex items-center justify-center">
            <img src={SettingIcon} alt="" className="w-[25px]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
