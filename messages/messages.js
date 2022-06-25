module.exports = {
  // HTTP Response Codes
  // 2xx Status Codes
  auth_success: `Authorization Successful`, // 200
  login_success: `Login Successful`, // 200
  signup_success: `Signup Successful`, // 201

  // 4xx Status Codes
  bad_request: `Unable To Find User`, // 400
  unauth: `Unauthorized`, // 401
  conflict: `User Already Exists`, // 409

  // 5xx Status Codes
  save_fail: `Unable To Save Profile`, // 500
  login_fail: `Unable To Log In`, // 500
};
