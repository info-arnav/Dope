import clientPromise from "../../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    let data = await db
      .collection("societies-post-images-new")
      .insert(req.body);
    res.send({ id: data.insertedIds[0] });
  } catch (e) {
    res.json({ error: true });
  }
};
