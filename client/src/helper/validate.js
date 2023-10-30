import { toast } from "react-hot-toast";
import { authenticate } from "./helper.js";

// validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    // check for user existence
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error(" User does not exist!!!");
    }
  }

  return errors;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }
  return error;
}

// Validate password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}
function passwordVerify(errors = {}, values) {
  const specialChar = /[`!@#$%^&*()_+-=\[\]{}';:"\\|,.<>\/?~]/;
  const numbers = /\d/;
  if (!values.password) {
    errors.password = toast.error("Password Required!!!");
  } else if (values.password[0] === "" || values.password[0] === " ") {
    errors.password = toast.error("Please Enter password!!!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Please cannot include spaces!!!");
  } else if (values.password.length < 6) {
    errors.password = toast.error("Password must be at least 6 characters");
  } else if (!specialChar.test(values.password)) {
    errors.password = toast.error(
      "Password must have at least one Special characters... "
    );
  } else if (!numbers.test(values.password)) {
    errors.password = toast.error(
      "Password must have at least one numbers... "
    );
  }
  return errors;
}

// Validate reset password :
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);
  if (!values.repeatPassword) {
  } else if (values.password !== values.repeatPassword) {
    errors.exists = toast.error("password doesn't match...!!");
  }
  return errors;
}

// Validate Register Form
export async function RegisterValidate(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

function emailVerify(error = {}, values) {
  const mail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!values.email) {
    error.email = toast.error("Email Required...!!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Enter valid Email...!!");
  } else if (!mail.test(values.email)) {
    error.email = toast.error("Invalid Email...!!");
  }
  return error;
}

// Validate profile page:
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  mobileVerify(errors, values);

  return errors;
}

function mobileVerify(errors = {}, values) {
  if (!values.mobile) {
    errors.mobile = toast.error("mobile is required!!!");
  } else if (values.mobile.length !== 10) {
    console.log(values.mobile.length);
    errors.mobile = toast.error("Invalid mobile Number!!!");
  }
  return errors;
}
