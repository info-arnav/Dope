import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    await db
      .collection("users")
      .update(
        { email: req.body.username.split("@")[0] },
        { $set: req.body.changes }
      );
    let updated = req.body.changes;
    updated.objectID = updated.email;
    axios.post("/api/algolia", {
      method: "update",
      email: updated,
    });
    res.send({ error: false });
  } catch (e) {
    res.json({ error: true });
  }
};
