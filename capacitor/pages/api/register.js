import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("users")
      .find({ email: req.body.username.split("@")[0] })
      .toArray();
    if (data) {
      bcrypt.hash(req.body.password, 10).then(async function (hash) {
        let ndata = await db
          .collection("users")
          .update(
            { email: req.body.username.split("@")[0] },
            { $set: { password: hash } }
          );
        res.send({ error: false, username: req.body.username.split("@")[0] });
      });
    } else {
      bcrypt.hash(req.body.password, 10).then(async function (hash) {
        const ndata = await db.collection("users").insert({
          email: req.body.username.split("@")[0],
          password: hash,
        });
        await fetch(
          Capacitor.isNativePlatform()
            ? "https://www.itsdope.in/api/algolia"
            : "/api/algolia",
          {
            method: "POST",

            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
              method: "create",
              email: req.body.username.split("@")[0],
            }),
          }
        );
        res.send({ error: false, username: req.body.username.split("@")[0] });
      });
    }
  } catch (e) {
    res.json({ error: true });
  }
};