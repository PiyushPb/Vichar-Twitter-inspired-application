import React from "react";

const UserInformation = ({ username, handle }) => {
  return (
    <div>
      <p className="ml-3 text-textLight dark:text-textDark text-[14px] font-bold">
        {username}
      </p>
      <p className="ml-3 text-textLight dark:text-textDark opacity-90 text-[14px]">
        @{handle}
      </p>
    </div>
  );
};

export default UserInformation;
