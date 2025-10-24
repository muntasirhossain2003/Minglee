import nodeMailer from "nodemailer";

const transporter = nodemailer.createTransport({
  hostservice: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});