import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";

import { backend_url } from "../../config/config";
import axios from "axios";
import EditProfile from "../../components/Settings/EditProfile";
import ThemeChanger from "../../components/Settings/ThemeChanger";
import { toast } from "react-toastify";

const Settings = () => {
  const { user: currentUser } = useContext(authContext);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    window.location.reload();
  };

  return (
    <div className="w-full relative">
      <div className="w-full h-screen bg-bgLight dark:bg-bgDark relative">
        <ProfileHeader title={"Settings"} />
        <div className="flex flex-col w-full overflow-y-scroll pb-[220px] sm:pb-[45px] feedScroll p-5">
          {/* Edit profile */}
          <EditProfile />
          {/* Set theme */}
          <ThemeChanger />
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-fit mt-5"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
