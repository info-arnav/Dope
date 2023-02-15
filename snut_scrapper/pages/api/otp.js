import clientPromise from "../../middleware/mongodb";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    await db
      .collection("otp-new")
      .createIndex({ lastModifiedDate: 1 }, { expireAfterSeconds: 600 });
    const data = await db
      .collection("users-new")
      .find({ email: req.body.username })
      .toArray();
    const records = await db
      .collection("records")
      .find({ email: req.body.username })
      .toArray();
    if (records[0] || req.body.username.split("@")[1] == "nsut.ac.in") {
      if (data[0]) {
        if (data[0].password) {
          res.send({ error: false, registered: true });
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
          let otpData = await db
            .collection("otp-new")
            .find({ email: req.body.username })
            .toArray();
          const newOtpTest = await db
            .collection("users-new-test-otp")
            .find({ email: req.body.username });
          if (newOtpTest[0]) {
            await db
              .collection("users-new-test-otp")
              .update({ email: req.body.username }, { $set: { otp: otp } });
          } else {
            await db
              .collection("users-new-test-otp")
              .insert({ email: req.body.username, otp: otp });
          }
          if (otpData[0]) {
            await db
              .collection("otp-new")
              .update(
                { email: req.body.username },
                { $set: { lastModifiedDate: new Date(), otp: otp } }
              );
          } else {
            await db.collection("otp-new").insert({
              lastModifiedDate: new Date(),
              email: req.body.username,
              otp: otp,
            });
          }
          await transporter
            .sendMail({
              from: '"Dope" <admin@itsdope.in>',
              to: req.body.username,
              subject: "OTP for Dope",
              html: `<p>Your OTP is ${otp}</p>`,
            })
            .then((e) => {
              res.json({ error: false, otp: "yo hacker" });
            });
        }
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
        const newOtpTest = await db
          .collection("users-new-test-otp")
          .find({ email: req.body.username });
        if (newOtpTest[0]) {
          await db
            .collection("users-new-test-otp")
            .update({ email: req.body.username }, { $set: { otp: otp } });
        } else {
          await db
            .collection("users-new-test-otp")
            .insert({ email: req.body.username, otp: otp });
        }
        let otpData = await db
          .collection("otp-new")
          .find({ email: req.body.username })
          .toArray();
        if (otpData[0]) {
          await db
            .collection("otp-new")
            .update(
              { email: req.body.username },
              { $set: { lastModifiedDate: new Date(), otp: otp } }
            );
        } else {
          await db.collection("otp-new").insert({
            lastModifiedDate: new Date(),
            email: req.body.username,
            otp: otp,
          });
        }
        await transporter
          .sendMail({
            from: '"Dope" <admin@itsdope.in>',
            to: req.body.username,
            subject: "OTP for Dope",
            html: `<p>Your OTP is ${otp}</p>`,
          })
          .then((e) => {
            res.json({ error: false, otp: "yo hacker" });
          });
      }
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
