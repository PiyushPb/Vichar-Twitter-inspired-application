import React from "react";
import NavbarData from "./NavbarData";

import HomeIcon from "../../assets/HeaderIcons/Home.svg";
import SearchIcon from "../../assets/HeaderIcons/Search.svg";
import NotificationIcon from "../../assets/HeaderIcons/Notification.svg";
import BookmarkIcon from "../../assets/HeaderIcons/Bookmark.svg";
import PremiumIcon from "../../assets/HeaderIcons/Premium.svg";
import { Link } from "react-router-dom";
import AddVichar from "../../assets/HeaderIcons/AddVichar.svg";

import { useCreatePostModel } from "../../Context/CreatePostModelContext";

const iconComponents = {
  HomeIcon,
  SearchIcon,
  PremiumIcon,
  NotificationIcon,
  BookmarkIcon,
};

const Navbar = () => {
  const { openCreatePostModel } = useCreatePostModel();

  const NavbarItems = NavbarData;
  return (
    <>
      <div className="flex sm:hidden items-center justify-center fixed bottom-0 z-10 w-full h-fit bg-bgLight dark:bg-bgDark">
        <div className="w-full p-5 mx-5 flex justify-between max-w-md">
          {NavbarItems.map((item, index) => {
            const IconComponent = iconComponents[item.icon];
            return (
              <Link to={item.path} key={index}>
                <img
                  src={IconComponent}
                  className="w-[25px] h-[25px] stroke-cyan-500 "
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-[80px] right-[40px] block sm:hidden">
        <button
          className="bg-primaryBlue hover:bg-[#307baa] transition-colors w-fit sm:w-full text-white p-3 rounded-full cursor-pointer "
          onClick={() => {
            openCreatePostModel();
          }}
        >
          <img src={AddVichar} alt="" className=" w-[25px]" />
        </button>
      </div>
    </>
  );
};

export default Navbar;
