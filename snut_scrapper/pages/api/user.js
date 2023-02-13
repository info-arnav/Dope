import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";
import * as jose from "jose";

export default async (req, res) => {
  try {
    const secret = new TextEncoder().encode(process.env.ENCRYPTION);
    const testData = await jose.jwtVerify(req.body.token, secret);
    if (testData.payload.data) {
      const client = await clientPromise;
      const db = client.db("nsut");
      const data = await db
        .collection("users-new")
        .find({ email: req.body.email })
        .toArray();
      res.send(data[0] || { out: true });
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
