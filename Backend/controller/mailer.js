import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let mailgenerator = new Mailgen({
  theme: "default",
  product: {
    name: "DietTracker Pro",
    link: "dietTrackerPro.in",
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // syntax of email :
  var email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to dietTracker app! We are happy to have you fit and healthy!!!",
      outro:
        "Need help , or have questions ? just mail us back on the same email we'd love to help you out ",
    },
  };

  var emailBody = mailgenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject || "Signup Successfull",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({ msg: "Mail sent successfully" });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
