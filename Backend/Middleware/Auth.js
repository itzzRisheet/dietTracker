import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default async function auth(req, res, next) {
  try {
    // access authorize header to validate request
    // so we have to first login and create user token and
    // that token will be passed while PUT request in "AUTH Bearer" at "Bearer Token"

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    next();

    // retrieve the user details of the logged in user
  } catch (error) {
    res.status(401).json({
      error: error,
      msg: "Authentication failed in auth.js",
    });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
