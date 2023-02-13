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
        res.send({ key: process.env.ALGOLIA_READ });
      } else {
        res.json({ error: true });
      }
    } catch (e) {
      res.json({ error: true });
    }
  }
};
