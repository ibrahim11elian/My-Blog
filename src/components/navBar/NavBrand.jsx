import { memo } from "react";
import { Navbar } from "react-bootstrap";

function NavBrand() {
  return (
    <Navbar.Brand>
      <h1 className="header-title text">IA Blog</h1>
    </Navbar.Brand>
  );
}
export default memo(NavBrand);
