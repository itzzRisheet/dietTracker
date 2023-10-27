import { Router } from "express";
// import all controllers
import * as controller from "../controller/appController.js";
import auth, { localVariables } from "../Middleware/Auth.js";
import { registerMail } from "../controller/mailer.js";
const router = Router();

// POST requests
router.route("/register").post(controller.register);
router.route("/registerMail").post(registerMail);

router.route("/authenticate").post(controller.verifyUSER, (req, res) => {
  res.end();
});

// it first verify the user with verifyUSER controller and then it goes to the next function
router.route("/login").post(controller.verifyUSER, controller.login);

// GET requests
router.route("/user/:username").get(controller.getUser); // Here :____ will be params for controller
router
  .route("/generateOTP")
  .get(controller.verifyUSER, localVariables, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyUSER, controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

// PUT requests
router.route("/updateUser").put(auth, controller.updateUser);
router
  .route("/resetPassword")
  .put(controller.verifyUSER, controller.resetPassword);

export default router;
