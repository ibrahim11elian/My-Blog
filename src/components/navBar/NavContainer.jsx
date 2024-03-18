import { memo, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import NavLinks from "./NavLinks";
import NavBrand from "./NavBrand";
import ThemeSwitcher from "./ThemeSwitcher";

function NavContainer() {
  const [show, setShow] = useState(false);
  return (
    <Container className="justify-content-between border-color">
      <NavBrand />
      <span
        aria-controls="navbar-nav"
        type="button"
        aria-label="Toggle navigation"
        className="text menu-button d-sm-none"
        onClick={() => setShow(!show)}
      >
        {show ? <FaTimes /> : <FaBars />}
      </span>
      <Navbar.Collapse className={`${show ? "show" : ""}`} id="navbar-nav">
        <NavLinks />
        <ThemeSwitcher />
      </Navbar.Collapse>
    </Container>
  );
}
export default memo(NavContainer);
