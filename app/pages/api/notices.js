import clientPromise from "../../middleware/mongodb";
import * as jose from "jose";

export default async (req, res) => {
  if (req.method == "POST") {
    try {
      const secret = new TextEncoder().encode(process.env.ENCRYPTION);
      const testData = await jose.jwtVerify(req.body.token, secret);
      if (testData.payload.data) {
        const client = await clientPromise;
        const db = client.db("nsut");
        let data = await db
          .collection("societies-new-post")
          .find({})
          .sort({ date: -1 })
          .toArray();
        res.json(data);
      } else {
        res.json({ error: true });
      }
    } catch (e) {
      res.json({ error: true });
    }
  }
};
