import { memo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { IoMoonOutline } from "react-icons/io5";
import { LuSunDim } from "react-icons/lu";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-switcher ms-sm-3 mb-3 mb-sm-0">
      <input
        className="d-none"
        type="checkbox"
        name="switcher"
        id="switcher"
        defaultChecked={theme === "light" ? true : false}
        onChange={() => toggleTheme()}
      />
      <label
        htmlFor="switcher"
        className="switcher-container rounded-5 d-flex gap-3 align-items-center justify-content-center mx-auto"
      >
        <LuSunDim className="sun" />
        <IoMoonOutline className="moon" />
      </label>
    </div>
  );
}
export default memo(ThemeSwitcher);
