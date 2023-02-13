import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

import { ObjectId } from "mongodb";

import * as jose from "jose";

export default async (req, res) => {
  try {
    const secret = new TextEncoder().encode(process.env.ENCRYPTION);
    const testData = await jose.jwtVerify(req.body.token, secret);
    if (testData.payload.data == req.body.email) {
      const client = await clientPromise;
      const db = client.db("nsut");
      const data = await db.collection("societies-new-post").insert(req.body);
      res.json({ done: true });
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
