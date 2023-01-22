import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("users")
      .aggregate([{ $sample: { size: 20 } }])
      .toArray();
    console.log(data);
    res.send(data);
  } catch (e) {
    res.json({ error: true });
  }
};
