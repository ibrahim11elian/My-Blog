const accountValidate = (values) => {
  let isError = false;
  let errors = {};

  if (!values.userName) {
    errors.userName = "Username required";
    isError = true;
  }

  if (!values.oldPassword) {
    errors.password = "Old Password is required";
    isError = true;
  }

  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (values.newPassword) {
    // Check the length of new password
    if (values.newPassword.length < 8) {
      errors.newPassword = "New Password must be at least 8 characters long";
      isError = true;
    } else if (!regex.test(values.newPassword)) {
      errors.newPassword =
        "Must contain at least one uppercase letter, one lowercase letter, one number.";
      isError = true;
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
      isError = true;
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword =
        "New password and confirm password do not match.";
      isError = true;
    }
  }

  // if (!values.userName && !values.newPassword) {
  //   errors.formError =
  //     "You have to fill out either new username or new password.";
  //   isError = true;
  // }
  return [isError, errors];
};

export default accountValidate;
