import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

import { ObjectId } from "mongodb";

import * as jose from "jose";

export default async (req, res) => {
  try {
    const secret = new TextEncoder().encode(process.env.ENCRYPTION);
    const testData = await jose.jwtVerify(req.body.token, secret);
    if (testData.payload.data) {
      const client = await clientPromise;
      const db = client.db("nsut");
      const data = await db
        .collection("recruitments")
        .remove({ _id: ObjectId(req.body.id) });
      res.json({ status: "success" });
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
