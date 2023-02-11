import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("societies-new")
      .find({ email: req.body.email })
      .toArray();
    res.send(data[0] || { out: true });
  } catch (e) {
    res.json({ error: true });
  }
};
