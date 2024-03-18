import { memo } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { SiLeetcode } from "react-icons/si";

function Footer() {
  return (
    <footer className="footer text-center background pb-3 ">
      <div className="container d-flex flex-wrap gap-3 justify-content-sm-start ">
        <span className="text pt-1">
          Script Symphony &copy; {new Date().getFullYear()}
        </span>
        <a
          className="text transition"
          href="https://www.linkedin.com/in/ibrahim-ahmed-elian"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          className="text transition"
          href="https://ibrahim-ahmed.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLink />
        </a>
        <a
          className="text transition"
          href="https://www.facebook.com/ibrahim11ahmed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare />
        </a>
        <a
          className="text transition"
          href="https://twitter.com/ibrahim11elian"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter />
        </a>
        <a
          className="text transition"
          href="https://www.instagram.com/ibrahim11ahmed/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagramSquare />
        </a>
        <a
          className="text transition"
          href="mailto:ibrahim11elian@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoMdMail />
        </a>
        <a
          className="text transition"
          href="https://leetcode.com/ibrahim11elian/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiLeetcode />
        </a>
      </div>
    </footer>
  );
}

export default memo(Footer);
