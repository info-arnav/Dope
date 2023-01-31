import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("user-images")
      .find({ email: req.body.email })
      .toArray();
    if (data[0]) {
      await db
        .collection("user-images")
        .update({ email: req.body.email }, { $set: req.body });
    } else {
      await db.collection("user-images").insert(req.body);
    }
    res.send({ error: false });
  } catch (e) {
    res.json({ error: true });
  }
};
