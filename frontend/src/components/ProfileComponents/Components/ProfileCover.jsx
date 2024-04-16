import React from "react";

const ProfileCover = () => {
  return (
    <div className="w-full h-[140px] sm:h-[200px] overflow-hidden block">
      <img
        src="https://source.unsplash.com/random"
        alt="..."
        className="object-center w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfileCover;
