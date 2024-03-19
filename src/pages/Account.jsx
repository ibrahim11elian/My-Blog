import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import PasswordInput from "../components/userFormComponents/PasswordInput";
import { useCallback, useEffect, useRef, useState } from "react";
import NewPasswordInput from "../components/userFormComponents/NewPasswordInput";
import accountValidate from "../validation/account";
import { updateUser, updateUserDate } from "../features/user/user-slice";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Account() {
  useDocumentTitle("Admin Account");

  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const userNameRef = useRef(null);
  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);

  const [error, setError] = useState(null);

  // Get user info from the store
  const { userName, accessToken } = useSelector((state) => state.user);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const userName = userNameRef.current.value;
      const oldPassword = oldPassRef.current.value;
      const newPassword = newPassRef.current.value;
      const confirmPassword = confirmPassRef.current.value;
      const [isError, error] = accountValidate({
        userName,
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (isError) setError({ isError, ...error });

      if (!isError) {
        dispatch(
          updateUserDate({
            userData: {
              userName,
              oldPassword,
              newPassword,
            },
            accessToken,
          })
        ).then((response) => {
          if (response.payload && response.payload.status === 200) {
            dispatch(updateUser({ userName: response.payload.data.userName }));
            navigate("/admin");
          } else {
            let error = JSON.parse(response.error.message);
            newPassRef.current.value = ""; // reset the password value
            confirmPassRef.current.value = ""; // reset the password value
            setError(error.data);
          }
        });
      }
    },
    [accessToken, dispatch, navigate]
  );
  return (
    <main className="background">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 ">
          <div className="col-md-6 ">
            <div className="card p-4 background text border-color">
              <div className="card-body ">
                <div className=" text-center">
                  <MdOutlineAdminPanelSettings size={90} />
                </div>
                <h2 className="text-center mt-2 ">Admin User Management</h2>
                {error && error.isError && error.formError && (
                  <div className="invalid-feedback text-center text-capitalize  d-block">
                    {error.formError}
                  </div>
                )}
                {typeof error === "string" && (
                  <div className="invalid-feedback text-center text-capitalize d-block">
                    {error}
                  </div>
                )}
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Username*</Form.Label>
                    <Form.Control
                      ref={userNameRef}
                      type="text"
                      placeholder="Enter username"
                      className="background border-color text placeholder-color "
                      autoComplete="off"
                      defaultValue={userName}
                    />
                    {error && error.isError && error.userName && (
                      <div className="invalid-feedback text-capitalize  d-block">
                        {error.userName}
                      </div>
                    )}
                  </Form.Group>

                  <PasswordInput
                    passwordRef={oldPassRef}
                    error={error}
                    label={"Old Password*"}
                  />

                  <NewPasswordInput
                    error={error}
                    newPasswordRef={newPassRef}
                    confirmPasswordRef={confirmPassRef}
                  />

                  <Button variant="primary" type="submit" className="w-100">
                    Update User
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
