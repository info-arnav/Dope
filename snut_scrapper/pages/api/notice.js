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
        .collection("societies-new-post")
        .find({ _id: ObjectId(req.body.id) })
        .toArray();
      if (data[0]) {
        res.send(data[0]);
      } else {
        res.json({ error: true });
      }
    } else {
      res.json({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
