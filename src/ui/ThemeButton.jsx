import { useEffect, useState } from "react";
import { LuSunMoon } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";

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
    <div onClick={handleThemeToggle} className="cursor-pointer">
      {isDarkMode ? <LuSunMoon size={20} /> : <LuMoon size={20}/>}
    </div>
  );
};

export default ThemeButton;
