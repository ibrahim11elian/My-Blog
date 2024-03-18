/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useEffect, useState, useCallback, useRef, memo } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUser } from "../features/user/user-slice";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loginValidate from "../validation/login";
import PasswordInput from "../components/userFormComponents/PasswordInput";
import UserNameInput from "../components/userFormComponents/UserNameInput";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Login = memo(() => {
  useDocumentTitle("Script Symphony - Login");

  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const { loading } = useSelector((state) => state.user);
  const [error, setError] = useState(null);

  const passwordRef = useRef(null);
  const userNameRef = useRef(null);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      const password = passwordRef.current.value;
      const userName = userNameRef.current.value;

      const [isError, error] = loginValidate({ userName, password });
      if (isError) setError({ isError, ...error });

      if (!isError) {
        dispatch(login({ userName, password })).then((response) => {
          if (response.payload && response.payload.status === 200) {
            dispatch(updateUser({ userName: userName }));
            navigate("/admin");
          } else {
            let error = JSON.parse(response.error.message);
            passwordRef.current.value = ""; // reset the password value
            setError(error.data);
          }
        });
      }
    },
    [dispatch, navigate]
  );

  return (
    <main className="background">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 card p-4 background text border-color">
            <div className="card-body">
              <h1 className="text-center mb-4 fw-bolder text-capitalize">
                script symphony
              </h1>
              <p className="text-center article-text">
                Sign in to your account
              </p>
              {typeof error === "string" && (
                <div className="invalid-feedback text-center text-capitalize  d-block">
                  {error}
                </div>
              )}
              <Form
                className="needs-validation mt-4"
                noValidate
                onSubmit={handleLogin}
              >
                <UserNameInput error={error} userNameRef={userNameRef} />

                <PasswordInput
                  error={error}
                  passwordRef={passwordRef}
                  label={"Password"}
                />

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Sign in"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

export default Login;

function LoadingSpinner() {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
      ></span>
      <span className="ms-1" role="status">
        Loading...
      </span>
    </>
  );
}
