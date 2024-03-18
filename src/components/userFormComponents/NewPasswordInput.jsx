/* eslint-disable react/display-name */
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { memo } from "react";

const NewPasswordInput = memo(
  ({ error, newPasswordRef, confirmPasswordRef }) => {
    return (
      <>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            ref={newPasswordRef}
            type="password"
            className="background border-color text placeholder-color "
            placeholder="Password"
          />
          {error && error.isError && error.newPassword && (
            <div className="invalid-feedback d-block">{error.newPassword}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            ref={confirmPasswordRef}
            type="password"
            className="background border-color text placeholder-color "
            placeholder="Password"
          />
          {error && error.isError && error.confirmPassword && (
            <div className="invalid-feedback d-block">
              {error.confirmPassword}
            </div>
          )}
        </Form.Group>
      </>
    );
  }
);

export default NewPasswordInput;

NewPasswordInput.propTypes = {
  /** An object containing validation errors */
  error: PropTypes.shape({
    isError: PropTypes.bool,
    confirmPassword: PropTypes.objectOf(PropTypes.string),
    newPassword: PropTypes.objectOf(PropTypes.any),
  }),
  newPasswordRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
  confirmPasswordRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};
