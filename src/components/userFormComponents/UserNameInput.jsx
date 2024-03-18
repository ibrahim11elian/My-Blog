/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const UserNameInput = memo(({ error, userNameRef }) => {
  const userName = useSelector((state) => state.user.userName);

  return (
    <Form.Group className="mb-3 has-validation" controlId="userName">
      <Form.Label>User Name</Form.Label>
      <Form.Control
        ref={userNameRef}
        type="text"
        className="background border-color text placeholder-color"
        placeholder="User Name"
        defaultValue={userName}
        required
        autoComplete="off"
      />
      {error && error.isError && error.userName && (
        <div className="invalid-feedback d-block">{error.userName}</div>
      )}
    </Form.Group>
  );
});

export default UserNameInput;
