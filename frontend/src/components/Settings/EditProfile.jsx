import React, { useContext, useEffect, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { Button } from "@material-tailwind/react";
import { backend_url } from "../../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { authContext } from "../../Context/AuthContext";
import uploadImageToCloudinary from "../../Utils/uploadCloudinary";

const EditProfile = () => {
  const { user: currentUser } = useContext(authContext);
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(currentUser?.profilePic);
  const [coverImage, setCoverImage] = useState(currentUser?.coverPhoto);

  const [user, setUser] = useState({
    name: currentUser?.name,
    email: currentUser?.email,
    bio: currentUser?.bio,
    username: currentUser?.username,
    website: currentUser?.website,
    location: currentUser?.location,
    profilePic: currentUser?.profilePic,
    coverPhoto: currentUser?.coverPhoto,
  });

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend_url}/v1/user/currentUser`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    console.log(user);

    fetchData();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const updateProfile = async () => {
    // Upload profile picture to Cloudinary if it's updated
    if (profileImage !== currentUser.profilePic) {
      try {
        const imageData = await uploadImageToCloudinary(profileImage);

        const profileURL = await imageData.url;
        console.log(profileURL);
        setUser({ ...user, profilePic: profileURL });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    if (coverImage !== currentUser.coverPhoto || coverImage === undefined) {
      const coverImageData = await uploadImageToCloudinary(coverImage);
      const coverPhotoURL = await coverImageData.url;
      console.log(coverPhotoURL);
      setUser((prevUser) => ({
        ...prevUser,
        coverPhoto: coverPhotoURL,
      }));
    }

    // console.log(user);

    try {
      const response = await axios.patch(
        `${backend_url}/v1/user/updateUserProfile/${currentUser._id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success === true) {
        toast.success("Profile updated successfully");
        navigate(`/${user.username}`);
      } else {
        toast.error(response.message);
        console.error("Error updating profile:", response.message);
        navigate(`/${user.username}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-textLight dark:text-textDark mb-5">
        Edit Profile
      </h2>
      {/* editProfileContainer */}
      <div className="border border-solid border-gray-300 dark:border-darkBorderColor rounded-md overflow-hidden relative">
        {/* coverPhoto */}
        <div className="w-full h-[140px] sm:h-[200px] overflow-hidden block relative">
          <img
            src={coverImage}
            alt="..."
            className="object-center w-full h-full object-cover"
          />
          <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
            <div
              className="w-[50px] h-[50px] bg-black/60 flex justify-center items-center rounded-full cursor-pointer"
              title="Add cover photo"
            >
              <TbCameraPlus size={70} className="m-3 text-white" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        {/* profile pic */}
        <div className="flex items-center justify-between w-full h-fit px-5 relative">
          <div className="mt-[-60px] sm:mt-[-70px] relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] object-cover rounded-full border-2 border-solid border-textLight dark:border-textDark"
            />
            <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
              <div
                className="w-[50px] h-[50px] bg-black/60 flex justify-center items-center rounded-full cursor-pointer"
                title="Add avatar photo"
              >
                <TbCameraPlus size={70} className="m-3 text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* profile components */}
        <div className="p-5">
          {/* username */}
          <div className="mt-5">
            <label
              htmlFor="username"
              className="text-[14px] text-textLight dark:text-textDark mb-1 block"
            >
              Username
            </label>
            <input
              label="Username"
              id="username"
              name="username"
              type="text"
              value={user?.username}
              className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark"
              placeholder="Username"
              onChange={handleOnChange}
            />
          </div>
          {/* bio */}
          <div className="mt-5">
            <label
              htmlFor="bio"
              className="text-[14px] text-textLight dark:text-textDark mb-1 block"
            >
              Bio
            </label>
            <div className="relative">
              <textarea
                name="bio"
                id="bio"
                type="text"
                value={user?.bio}
                className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none min-h-[100px] resize-none bg-bgLight dark:bg-darkInputBg dark:text-textDark"
                placeholder="Bio"
                rows="5"
                onChange={handleOnChange}
              ></textarea>
              <p className="absolute bottom-[15px] right-[10px] text-[12px] text-textLight dark:text-textDark bg-bgLightrounded-full px-2 dark:bg-darkInputBg">
                0/500
              </p>
            </div>
            {/* location */}
            <div className="mt-5">
              <label
                htmlFor="Location"
                className="text-[14px] text-textLight dark:text-textDark mb-1 block"
              >
                Location
              </label>
              <input
                id="Location"
                name="location"
                type="text"
                className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark"
                placeholder="Location"
                value={user?.location}
                onChange={handleOnChange}
              />
            </div>
            {/* Website */}
            <div className="mt-5">
              <label
                htmlFor="Website"
                className="text-[14px] text-textLight dark:text-textDark mb-1 block"
              >
                Website
              </label>
              <input
                id="Website"
                name="website"
                type="text"
                className="w-full px-5 py-3 border border-solid border-gray-300 dark:border-darkBorderColor rounded-md outline-none bg-bgLight dark:bg-darkInputBg dark:text-textDark"
                placeholder="Website"
                value={user?.website}
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-5">
              <Button
                className="w-fit px-5 py-3 bg-darkBorderColor hover:bg-[#252424] transition-colors text-white rounded-md duration-300 ease-in-out"
                onClick={updateProfile}
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
