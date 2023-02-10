import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    await db
      .collection("users-new")
      .update({ email: req.body.email }, { $set: req.body.changes });
    res.send({ error: false });
  } catch (e) {
    res.json({ error: true });
  }
};
