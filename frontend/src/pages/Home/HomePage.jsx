import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Header/Navbar";
import TrendingSection from "../../components/TrendingSection";
import Feed from "../Feed/Feed";
import Profile from "../profile/Profile";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState("Feed");
  return (
    <div className="bg-bgLight dark:bg-bgDark">
      <section className="bg-bgLight dark:bg-bgDark flex flex-col sm:flex-row h-screen max-w-[1600px] mx-auto overflow-hidden">
        <Header />
        <div className="container p-0 max-w-full h-fit relative top-[80px] sm:top-0">
          {/* {currentPage === "Feed" && <Feed />} */}
          {/* <Feed /> */}
          {/* <Profile /> */}
          <Outlet />
        </div>
        <div className="relative">
          <TrendingSection />
        </div>
      </section>
      <Navbar />
    </div>
  );
};

export default HomePage;
