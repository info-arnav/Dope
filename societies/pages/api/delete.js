import clientPromise from "../../middleware/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("notices")
      .remove({ _id: ObjectId(req.body.id) });
    res.json({ error: false });
  } catch (e) {
    console.log(e);
  }
};
