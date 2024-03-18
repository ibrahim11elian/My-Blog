/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, useCallback, memo } from "react";
import { Form } from "react-bootstrap";
import { PiEyeClosed, PiEye } from "react-icons/pi";

const PasswordInput = memo(({ error, passwordRef, label }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  return (
    <Form.Group className="mb-3" controlId="password">
      <Form.Label>{label}</Form.Label>
      <div className=" position-relative">
        <Form.Control
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          className="background border-color text placeholder-color"
          placeholder="Password"
        />
        <span
          className="show-pass-icon position-absolute background"
          onClick={handleTogglePassword}
        >
          {showPassword ? <PiEyeClosed /> : <PiEye />}
        </span>
      </div>
      {error && error.isError && error.password && (
        <div className="invalid-feedback d-block">{error.password}</div>
      )}
    </Form.Group>
  );
});

export default PasswordInput;
