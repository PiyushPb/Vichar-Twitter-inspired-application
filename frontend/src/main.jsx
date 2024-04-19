import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  VicharThemeProvider,
  useTheme,
} from "./Provider/VicharThemeProvider.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { CreatePostModelProvider } from "./Context/CreatePostModelContext.jsx";
import { ThemeProvider } from "@material-tailwind/react";

// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeProvider>
      <VicharThemeProvider>
        <CreatePostModelProvider>
          <App />
        </CreatePostModelProvider>
      </VicharThemeProvider>
    </ThemeProvider>
  </AuthContextProvider>
);
