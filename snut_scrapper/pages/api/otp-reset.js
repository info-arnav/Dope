import clientPromise from "../../middleware/mongodb";
import nodemailer from "nodemailer";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("users")
      .find({ email: req.body.username.split("@")[0] })
      .toArray();
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
            pass: "Arnav@300804",
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
            res.json({ error: false, otp: otp });
          });
      }
    } else {
      res.send({ error: false, registered: false });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
