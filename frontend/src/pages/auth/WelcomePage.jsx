import React from "react";
import logo from "../../assets/vicharlogo.png";
import hashtag from "../../assets/hashtagimg.png";
import welcomepageVdo from "../../assets/welcomepg.mp4";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const handleVDOPlay = () => {
    const video = document.getElementById("welcomeVideo");
    video.play();
  };
  return (
    <div className="relative flex items-center min-h-screen w-full bg-white dark:bg-matteblack">
      <div className="h-screen w-[50%] md:flex flex-col items-center justify-center hidden">
        <img src={hashtag} className="w-1/2" />
      </div>
      <div className=" h-screen md:w-[50%] w-full bg-matteblack dark:bg-bgDark relative   ">
        <div>
          <video
            id="welcomeVideo"
            src={welcomepageVdo}
            autoPlay
            loop
            controls={false}
            muted
            className="w-full h-screen object-cover"
          ></video>
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-85"></div>
        </div>
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <div className="max-w-[500px] p-10">
            <img src={logo} className="w-[50px] mb-5" />
            <h2 className="text-white text-[35px] font-bold mb-5">
              See what's happening in the world right now.
            </h2>
            <div className="flex flex-col gap-5 w-full">
              <button className="px-5 w-full py-4 bg-white text-black rounded-full hover:bg-primaryBlue hover:text-white transition-colors">
                Login with Google
              </button>
              <button className="px-5 w-full py-4 bg-white text-black rounded-full hover:bg-primaryBlue hover:text-white transition-colors">
                Login with Facebook
              </button>
            </div>
            <div className="flex justify-center items-center my-5 gap-3 px-5">
              <div className="w-full border border-solid border-sky-100"></div>
              <p className="text-white">or</p>
              <div className="w-full border border-solid border-sky-100"></div>
            </div>
            <Link to="/login">
              <button className="px-5 w-full py-4 bg-primaryBlue text-white rounded-full hover:bg-[#2184c5] hover:text-white transition-colors">
                Login Email or Username
              </button>
            </Link>
            <p className="text-white font-thin text-[12px] px-5 mt-2 mb-10">
              By signing up, you agree to our{" "}
              <a href="#" target="_blank" className="font-normal">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" target="_blank" className="font-normal">
                Privacy Policy
              </a>
              . Including our{" "}
              <a href="#" target="_blank" className="font-normal">
                Cookie Policy
              </a>
              .
            </p>
            <p className="text-white text-center mb-3 font-bold">
              Already have an account?
            </p>
            <Link to="/signup">
              <button className="px-5 w-full py-4 text-primaryBlue border-solid border-primaryBlue border-[3px] rounded-full hover:bg-primaryBlue hover:text-white transition-colors">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
