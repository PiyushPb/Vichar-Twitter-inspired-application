import React from "react";

import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import ProfileSection from "../../components/ProfileComponents/ProfileSection";

const Profile = () => {
  return (
    <div className="w-full relative">
      <div className="w-full h-screen bg-bgLight dark:bg-bgDark relative">
        <ProfileHeader />
        <ProfileSection />
      </div>
    </div>
  );
};

export default Profile;
