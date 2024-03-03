import React, { useContext, useState } from "react";
import WelcomePage from "./auth/WelcomePage";
import { authContext } from "../Context/AuthContext";
import HomePage from "./Home/HomePage";

const Home = () => {
  const { isLoggedIn, dispatch } = useContext(authContext);

  return !isLoggedIn ? <WelcomePage /> : <HomePage />;
};

export default Home;
