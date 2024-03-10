import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import Profile from "../pages/profile/Profile";
import Feed from "../pages/Feed/Feed";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="/:username" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
