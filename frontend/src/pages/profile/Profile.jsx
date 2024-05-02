import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams

import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import ProfileSection from "../../components/ProfileComponents/ProfileSection";

import { backend_url } from "../../config/config";
import NoUserFound from "../../components/ProfileComponents/NoUserFound";
import Loading from "../../Loading/Loading";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const params = useParams();

  useEffect(() => {
    document.title = `@${params.username} | Vichar`;
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
          setIsLoading(false);
        } else {
          console.error("Error fetching profile:", response.statusText);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error.message);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [params.username]);

  return (
    <div className="w-full relative">
      <div className="w-full h-screen bg-bgLight dark:bg-bgDark relative">
        {isLoading ? (
          <Loading />
        ) : user.data ? (
          <ProfileHeader user={user.data} title={"Profile"} />
        ) : (
          <NoUserFound />
        )}
        {user.data && !isLoading && <ProfileSection user={user.data} />}
      </div>
    </div>
  );
};

export default Profile;
