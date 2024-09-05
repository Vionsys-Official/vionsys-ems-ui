import { useEffect, useState } from "react";
import { LuSunMoon, LuMoon } from "react-icons/lu";

const ThemeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Toggle dark mode class on the root element when isDarkMode changes
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      onClick={handleThemeToggle}
      className="cursor-pointer p-2 dark:bg-gray-800"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <LuSunMoon size={20} className="text-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110" /> : <LuMoon size={20} className="text-white transition-all duration-300 ease-in-out transform hover:scale-110" />}
    </div>
  );
};

export default ThemeButton;
