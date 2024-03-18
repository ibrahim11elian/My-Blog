import { memo } from "react";
import { Navbar } from "react-bootstrap";

import NavContainer from "./NavContainer";
function NavBar() {
  return (
    <Navbar
      className="header background position-sticky top-0 pb-0"
      expand="sm"
    >
      <NavContainer />
    </Navbar>
  );
}
export default memo(NavBar);
