import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const UserInformation = ({ username, handle, isVerified, plan }) => {
  console.log(isVerified, plan);
  return (
    <div>
      <p className="ml-3 text-textLight dark:text-textDark text-[14px] font-bold">
        {username}
      </p>
      <p className="text-textLight dark:text-textDark text-[14px] opacity-80 flex justify-start items-center gap-1 ">
        <p
          className={
            isVerified && plan === "premiumPlus"
              ? "text-[#ffbf36] font-bold dark:text-[#FFD700]"
              : null
          }
        >
          @{handle}
        </p>
        {isVerified && plan && (
          <RiVerifiedBadgeFill
            size={18}
            className={
              plan === "basic"
                ? "text-primaryBlue"
                : "text-[#ffc936] dark:text-[#FFD700]"
            }
            title={plan}
          />
        )}
      </p>
    </div>
  );
};

export default UserInformation;
