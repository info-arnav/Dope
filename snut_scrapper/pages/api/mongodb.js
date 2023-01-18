import clientPromise from "../../middleware/mongodb";

export default async (req, res) => {
  let method = req.body.method;
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db.collection("users").find({}).toArray();
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};
