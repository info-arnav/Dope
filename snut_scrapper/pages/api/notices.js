import clientPromise from "../../middleware/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    let data = await db
      .collection("societies-new")
      .find({})
      .sort({ date: -1 })
      .toArray();
    res.json(data);
  } catch (e) {
    res.json({ error: true });
  }
};
