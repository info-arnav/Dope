import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db.collection("queries").find({}).toArray();
    res.send(data);
  } catch (e) {
    res.json({ error: true });
  }
};
