import clientPromise from "../../middleware/mongodb";

export default async (req, res) => {
  let method = req.body.method;
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    if (method == "insert") {
      const data = await db.collection("users").insert([]);
    } else if (method == "search") {
      const data = await db.collection("users").find([]);
    }
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};
