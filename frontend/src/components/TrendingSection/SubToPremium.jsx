import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

const SubToPremium = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();

  console.log(user);
  return (
    <>
      {(user.isVerified && user.plan === "basic") ||
      user.plan === "premium" ||
      user.plan === "premiumPlus" ? (
        <div className="border-[1px] border-solid border-gray-300 dark:border-darkBorderColor p-3 rounded-[10px]">
          <p className="text-textLight dark:text-textDark text-[16px] font-bold">
            Premium subscribed
          </p>
          <p className="text-textLight dark:text-textDark text-[14px]">
            Access to various features click below!
          </p>
          <button
            className="bg-primaryBlue hover:bg-[#6dc7ff] text-white font-bold py-2 px-4 rounded-full w-fit mt-1"
            onClick={() => navigate("/premium")}
          >
            Explore
          </button>
        </div>
      ) : (
        <div className="border-[1px] border-solid border-gray-300 dark:border-darkBorderColor p-3 rounded-[10px]">
          <p className="text-textLight dark:text-textDark text-[16px] font-bold">
            Subscribe to Premium
          </p>
          <p className="text-textLight dark:text-textDark text-[14px]">
            Subscribe to unlock new features and get a verified batch for a
            month.
          </p>
          <button
            className="bg-primaryBlue hover:bg-[#6dc7ff] text-white font-bold py-2 px-4 rounded-full w-fit mt-1"
            onClick={() => navigate("/premium")}
          >
            Subscribe
          </button>
        </div>
      )}
    </>
  );
};

export default SubToPremium;
