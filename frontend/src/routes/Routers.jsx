import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import Profile from "../pages/profile/Profile";
import Feed from "../pages/Feed/Feed";
import Search from "../pages/Search/Search";
import Settings from "../pages/profile/Settings";
import Premium from "../pages/Premium/Premium";
import PremiumFeatures from "../pages/Premium/PremiumFeatures";

const Routers = () => {
  return (
    <Routes>
      <Route path="/premium_signup" element={<Premium />} />
      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/premium" element={<PremiumFeatures />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/:username" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
