const loginValidate = (values) => {
  let isError = false;
  let errors = {};

  if (!values.userName) {
    errors.userName = "Username is required";
    isError = true;
  }

  if (!values.password) {
    errors.password = "Password is required";
    isError = true;
  }

  return [isError, errors];
};

export default loginValidate;
