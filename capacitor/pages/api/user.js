import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("users-new")
      .find({ email: req.body.email })
      .toArray();
    res.send(data[0]);
  } catch (e) {
    res.json({ error: true });
  }
};
