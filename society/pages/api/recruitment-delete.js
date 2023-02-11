import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("societies-new-post")
      .remove({ _id: ObjectId(req.body.id) });
    res.json({ status: "success" });
  } catch (e) {
    res.json({ error: true });
  }
};
