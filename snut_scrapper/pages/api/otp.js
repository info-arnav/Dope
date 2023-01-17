import clientPromise from "../../middleware/mongodb";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.rediffmailpro.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@arnavgupta.net",
        pass: "Arnav300804",
      },
    });
    let otp = Math.floor(1000 + Math.random() * 9000);
    await transporter
      .sendMail({
        from: '"Dope" <info@arnavgupta.net>',
        to: req.body.username,
        subject: "OTP for Dope",
        html: `<p>Your OTP is ${otp}</p>`,
      })
      .then((e) => res.json({ error: false, otp: otp }));
  } catch (e) {
    console.error(e);
  }
};
