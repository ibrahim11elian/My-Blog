import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const themes = ["light", "dark"];

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  // get theme from local storage
  let savedTheme = localStorage.getItem("theme");

  // State for the current theme (light or dark)
  const [theme, setTheme] = useState(
    themes.includes(savedTheme) ? savedTheme : "light"
  );
  localStorage.setItem("theme", theme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  return useContext(ThemeContext);
};
