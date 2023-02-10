import clientPromise from "../../middleware/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    let data = await db.collection("notices-new").insert({
      societies: req.body.username,
      title: req.body.title,
      data: new Date(),
      description: req.body.description,
    });
    res.json({ error: false });
  } catch (e) {
    res.json({ error: true });
  }
};
