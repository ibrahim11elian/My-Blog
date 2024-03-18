import error from "../assets/error.svg";
import errorDark from "../assets/error-dark.svg";
import { useTheme } from "../context/ThemeContext";

function Error() {
  const { theme } = useTheme();

  return (
    <main className="vh-100">
      <img
        src={theme === "dark" ? errorDark : error}
        alt="404 Error"
        className="h-100 w-100 user-select-none "
      />
    </main>
  );
}

export default Error;
