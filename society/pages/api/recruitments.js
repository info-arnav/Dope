import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db.collection("societies-new-post").find({}).toArray();
    res.json(data);
  } catch (e) {
    res.json({ error: true });
  }
};
