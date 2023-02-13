import clientPromise from "../../middleware/mongodb";
import nodemailer from "nodemailer";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("users-new")
      .find({ email: req.body.username })
      .toArray();
    const records = await db
      .collection("records")
      .find({ email: req.body.username })
      .toArray();
    if (records[0] | (req.body.username.split("@")[1] == "nsut.ac.in")) {
      if (data[0]) {
        if (!data[0].password) {
          res.send({ error: false, registered: false });
        } else {
          let transporter = nodemailer.createTransport({
            host: "smtp.rediffmailpro.com",
            port: 465,
            secure: true,
            auth: {
              user: "admin@itsdope.in",
              pass: process.env.PASSWORD,
            },
          });
          let otp = Math.floor(1000 + Math.random() * 9000);
          await transporter
            .sendMail({
              from: '"Dope" <admin@itsdope.in>',
              to: req.body.username,
              subject: "OTP for Dope",
              html: `<p>Your OTP is ${otp}</p>`,
            })
            .then((e) => {
              otp = otp.toString(16);
              res.json({ error: false, otp: otp, registered: true });
            });
        }
      } else {
        res.send({ error: false, registered: false });
      }
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
