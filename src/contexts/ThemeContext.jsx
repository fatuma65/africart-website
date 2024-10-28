/* eslint-disable react/prop-types */
import {useContext, useState, useEffect } from "react";

import { ThemeContext } from "./context";
export const ThemeProvider = ({ children }) => {
  const currentTheme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "light");

  useEffect(() => {
    // apply the preffered theme to the whole body
    document.body.className = theme;
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
