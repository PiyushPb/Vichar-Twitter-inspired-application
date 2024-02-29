import React from "react";
import NavbarData from "./NavbarData";

import HomeIcon from "../../assets/HeaderIcons/Home.svg";
import SearchIcon from "../../assets/HeaderIcons/Search.svg";
import NotificationIcon from "../../assets/HeaderIcons/Notification.svg";
import BookmarkIcon from "../../assets/HeaderIcons/Bookmark.svg";
import PremiumIcon from "../../assets/HeaderIcons/Premium.svg";

const iconComponents = {
  HomeIcon,
  SearchIcon,
  PremiumIcon,
  NotificationIcon,
  BookmarkIcon,
};

const Navbar = () => {
  const NavbarItems = NavbarData;
  return (
    <div className="flex md:hidden items-center justify-center fixed bottom-0 z-10 w-full h-fit bg-bgLight dark:bg-bgDark">
      <div className="w-full p-5 mx-5 flex justify-between max-w-md">
        {NavbarItems.map((item, index) => {
          const IconComponent = iconComponents[item.icon];
          return (
            <div>
              <img
                src={IconComponent}
                className="w-[25px] h-[25px] stroke-cyan-500 "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
