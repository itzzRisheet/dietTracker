import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { request } from "express";
import dotenv from "dotenv";
dotenv.config();

// middleware for verifying user with JWT
export async function verifyUSER(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // if user exist
    let exist = await userModel.findOne({ username });

    if (!exist) {
      return res.status(404).send({
        error: error,
        msg: "Can't find user",
      });
    }
    next();
  } catch (error) {
    return res.status(404).send({
      error: "Authentication error",
    });
  }
}

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;
    console.log(username);

    const userPromise = new Promise(async (resolve, reject) => {
      try {
        const existUsername = await userModel.findOne({ username });

        if (existUsername) {
          reject("Username already exists");
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
    const emailPromise = new Promise(async (resolve, reject) => {
      try {
        const existEmail = await userModel.findOne({ email });

        if (existEmail) {
          reject("Email already registered");
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });

    Promise.all([userPromise, emailPromise])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10) // here bcrypt.hash return promise that password will be hash and in resolve it returns hashed password that's why
            // we can use (hashedPassword) as a default argument in line 42
            .then((hashedPassword) => {
              const User = new userModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              //return save result as a response
              User.save()
                .then((result) =>
                  res.status(201).send({
                    msg: "User Registered Successfully",
                  })
                )

                .catch((err) =>
                  res.status(500).json({ msg: "Can't save the user" })
                );
            })
            .catch((err) => {
              return res.status(500).json({
                msg: "Enable to hash password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: err });
      });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ msg: error });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    userModel
      .findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({
                msg: "Don't have Password bro",
              });

            // create JWT tokens
            // jwt.sign(payload, secretOrPrivateKey, [options, callback])
            const token = jwt.sign(
              {
                userID: user._id,
                username: user.username,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "login successfully",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({
              error: error,
              msg: "Wrong password!!!",
            });
          });
      })
      .catch((err) => {
        return res.status(404).send({ error: err + " User not found" });
      });
  } catch (error) {
    return res.status(404).send({
      error,
    });
  }
}

export async function getUser(req, res) {
  // router.route("/user/:username").get(controller.getUser); // Here :____ will be params for controller
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(501).send({
        msg: "Invalid username",
      });
    }
    userModel
      .findOne({ username })
      .then((user) => {
        if (!user)
          return res.status(501).send({ err: err, msg: "user not found" });

        // Here we have removed password from user object
        // also unneccessary data from use object by converting that into JSON
        const { password, ...rest } = Object.assign({}, user.toJSON());
        // object.assign takes first parameter as empty object and second parameter
        // as object that is going to be assigned to that empty object.

        return res.status(201).send(rest);
      })
      .catch((err) => {
        return res.status(500).send({ err: err });
      });
  } catch (error) {
    return res.status(404).send({
      msg: "Can not find the user",
      error: error,
    });
  }
}

// basic function only takes id as input and updates the information
// we need authentication so we have to create middleware for that
// look in Middleware folder
export async function updateUser(req, res) {
  try {
    // const id = req.query.id;
    const { userID } = req.user;

    if (userID) {
      const body = req.body;

      // update the data
      userModel
        .updateOne({ _id: userID }, body)
        .then(() => {
          return res.status(201).send({ msg: "User updated successfully" });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return res.status(401).send({
        error: "user not found......!!!",
      });
    }
  } catch (error) {
    return res.status(401).send({ error: error });
  }
}

export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  res.status(201).send({
    code: req.app.locals.OTP,
  });
}

export async function verifyOTP(req, res) {
  const { code } = req.query;

  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({
      msg: "verify successfully",
    });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; // allow access to this route only once
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired" });
}

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired" });

    const { username, password } = req.body;

    try {
      userModel
        .findOne({ username })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              userModel
                .updateOne({
                  username: user.username,
                  password: hashedPassword,
                })
                .then(() => {
                  req.app.locals.resetSession = false;
                  res.status(201).send({ msg: "Record updated...!!!" });
                })
                .catch((err) => {
                  throw err;
                });
            })
            .catch((e) => {
              return res.status(500).send({
                error: "Enable to hash password",
              });
            });
        })
        .catch((err) => {
          return res.status(404).send({ msg: "Username not found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
