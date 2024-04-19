import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const VicharThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = (newTheme) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a VicharThemeProvider");
  }
  return context;
};

const getInitialTheme = () => {
  let theme = localStorage.getItem("theme");

  if (
    !theme ||
    (theme !== "light" && theme !== "dark" && theme !== "systemDefault")
  ) {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    theme = prefersDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
  }

  return theme;
};
