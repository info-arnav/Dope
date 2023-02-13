import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";
import * as jose from "jose";

export default async (req, res) => {
  try {
    const secret = new TextEncoder().encode(process.env.ENCRYPTION);
    const testData = await jose.jwtVerify(req.body.token, secret);
    if (testData.payload.data == req.body.email) {
      const client = await clientPromise;
      const db = client.db("nsut");
      const data = await db
        .collection("user-images-new")
        .find({ email: req.body.email })
        .toArray();
      if (data[0]) {
        await db
          .collection("user-images-new")
          .update({ email: req.body.email }, { $set: req.body });
      } else {
        await db.collection("user-images-new").insert(req.body);
      }
      res.send({ error: false });
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
