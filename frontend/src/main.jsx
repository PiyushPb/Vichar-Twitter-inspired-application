import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, useTheme } from "./Provider/ThemeProvider.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { CreatePostModelProvider } from "./Context/CreatePostModelContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <ThemeProvider>
      <CreatePostModelProvider>
        <App />
      </CreatePostModelProvider>
    </ThemeProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
