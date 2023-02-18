import clientPromise from "../../middleware/mongodb";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("otp-new")
      .find({ email: req.body.email })
      .toArray();
    if (data[0].otp == req.body.otp) {
      res.json({ error: false });
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
