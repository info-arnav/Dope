import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import axios from "axios";
import * as jose from "jose";

export default async (req, res) => {
  if (req.method == "POST") {
    try {
      const secret = new TextEncoder().encode(process.env.ENCRYPTION);
      const testData = await jose.jwtVerify(req.body.token, secret);
      if (testData.payload.data) {
        const client = await clientPromise;
        const db = client.db("nsut");
        const data = await db
          .collection("users-new")
          .aggregate([
            {
              $match: {
                email: { $regex: req.body.batch },
              },
            },
            { $sample: { size: 28 } },
          ])
          .toArray();
        res.send(data);
      } else {
        res.json({ error: true });
      }
    } catch (e) {
      console.log(e);
    }
  }
};
