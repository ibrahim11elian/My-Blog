/* eslint-disable react/display-name */
import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { memo } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/user-slice";

function NavLinks() {
  // this for Authentication burps instead of the isAuthenticated
  // as the isAuthenticated does not trigger rerender when user state change IDK why!!
  const accessToken = useSelector((state) => state.user.accessToken);

  return (
    <Nav className="ms-auto pb-1">
      <NavLink
        to={"/"}
        exact="true"
        activeclassname="active"
        className="nav-link header-link text text-center border-color"
      >
        Blog
      </NavLink>

      <NavLink
        to={"/about"}
        exact="true"
        activeclassname="active"
        className="nav-link header-link text text-center border-color"
      >
        About
      </NavLink>

      {!accessToken ? (
        <NavLink
          to="/login"
          exact="true"
          activeclassname="active"
          className="nav-link header-link text text-center border-color"
        >
          Login
        </NavLink>
      ) : null}

      <UserLinks />
    </Nav>
  );
}

export default memo(NavLinks);

const UserLinks = memo(() => {
  // this for Authentication burps instead of the isAuthenticated
  // as the isAuthenticated does not trigger rerender when user state change IDK why!!
  const accessToken = useSelector((state) => state.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout user function to remove the user data from slice and local storage
  const handleLogout = () => {
    if (accessToken) {
      dispatch(logoutUser());
      navigate("/login");
    }
  };
  return (
    <>
      {/* Only show the manage accounts link if user is authenticated (logged in) */}
      {accessToken ? (
        <>
          <NavLink
            to={"/admin"}
            exact="true"
            activeclassname="active"
            className="nav-link header-link text text-center border-color"
          >
            Dashboard
          </NavLink>

          <span
            className="nav-link header-link text text-center border-color"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </span>

          <NavLink
            to={"/account"}
            className="nav-link  text text-center p-0 ms-sm-2 "
            style={{ fontSize: "1.6rem" }}
          >
            <MdOutlineManageAccounts />
          </NavLink>
        </>
      ) : null}
    </>
  );
});
