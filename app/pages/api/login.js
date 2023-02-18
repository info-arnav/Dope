import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

import * as jose from "jose";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    let data = await db
      .collection("users-new")
      .find({ email: req.body.username })
      .toArray();
    data = data[0];
    if (data) {
      if (data.password) {
        bcrypt.compare(
          req.body.password,
          data.password,
          async function (err, result) {
            if (result) {
              const secret = new TextEncoder().encode(process.env.ENCRYPTION);
              const alg = "HS256";
              const jwt = await new jose.SignJWT({
                data: req.body.username,
                type: data.type,
              })
                .setProtectedHeader({ alg })
                .sign(secret);
              res.json({
                error: false,
                loggedIn: true,
                jwt: jwt,
              });
            } else {
              res.json({ error: false, loggedIn: false });
            }
          }
        );
      } else {
        res.json({ error: false, loggedIn: false });
      }
    } else {
      res.json({ error: false, loggedIn: false });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
