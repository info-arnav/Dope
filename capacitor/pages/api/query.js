import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("queries")
      .insert({ query: req.body.query })
      .toArray();
    res.send({ error: false });
  } catch (e) {
    res.json({ error: true });
  }
};
