import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useTheme } from "./Provider/VicharThemeProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./routes/Routers";
import ImageDisplayContainer from "./components/ImageDisplayContainer";
import CreatePost from "./components/Post/CreatePost";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition:Bounce
      />
      {/* <ImageDisplayContainer /> */}
      <CreatePost />
      <Router>
        <Routers />
      </Router>
    </>
  );
}

export default App;
