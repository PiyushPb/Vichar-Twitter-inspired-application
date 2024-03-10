import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams

import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import ProfileSection from "../../components/ProfileComponents/ProfileSection";

import { backend_url } from "../../config/config";
import NoUserFound from "../../components/ProfileComponents/NoUserFound";

const Profile = () => {
  const [user, setUser] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      const username = params.username;
      const getUserURL = backend_url + "/v1/user/" + username;

      try {
        const response = await fetch(getUserURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Error fetching profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchProfile();
  }, [params.username]);

  return (
    <div className="w-full relative">
      <div className="w-full h-screen bg-bgLight dark:bg-bgDark relative">
        <ProfileHeader user={user.data} />
        {user.data ? <ProfileSection user={user.data} /> : <NoUserFound />}
      </div>
    </div>
  );
};

export default Profile;
