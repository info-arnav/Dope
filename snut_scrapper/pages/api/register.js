import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
const algoliasearch = require("algoliasearch");
import axios from "axios";

export default async (req, res) => {
  const client = algoliasearch(
    "8PCXEU15SU",
    "fc652d91b2d6db2718b47254be4c5d6e"
  );
  const index = client.initIndex("dev_NSUT");
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("users")
      .find({ email: req.body.username.split("@")[0] })
      .toArray();
    if (data[0]) {
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
        await index
          .saveObjects([{ objectID: req.body.username.split("@")[0] }])
          .then(({ objectIDs }) => {
            res.send({
              error: false,
              username: req.body.username.split("@")[0],
            });
          });
      });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
