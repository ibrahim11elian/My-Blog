import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

function TruncatedText({ text, factor = 10 }) {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    const handleResize = () => {
      const maxLength = Math.floor(window.innerWidth / factor); // Adjust the factor as needed
      setTruncatedText(
        text.slice(0, maxLength) +
          `${
            text.length < maxLength
              ? text.charAt(text.length - 1) === "."
                ? ""
                : "."
              : "..."
          }`
      );
    };

    handleResize(); // Initial setup

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <p className="card-text">{truncatedText}</p>;
}

export default memo(TruncatedText);

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  factor: PropTypes.number,
};
