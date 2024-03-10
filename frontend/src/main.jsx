import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, useTheme } from "./Provider/ThemeProvider.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
