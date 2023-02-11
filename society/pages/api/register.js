import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";
const algoliasearch = require("algoliasearch");
import axios from "axios";

export default async (req, res) => {
  const client = algoliasearch(
    "8PCXEU15SU",
    "fc652d91b2d6db2718b47254be4c5d6e"
  );
  const index = client.initIndex("dev_NSUT-NEW");
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("users-new")
      .find({ email: req.body.username })
      .toArray();
    const records = await db
      .collection("records")
      .find({ email: req.body.username })
      .toArray();
    if (records[0] | (req.body.username.split("@")[1] == "nsut.ac.in")) {
      let type;
      if (records[0]) {
        if (records[0].type) {
          type = records[0].type;
        } else {
          type = "student";
        }
      } else {
        type = "student";
      }
      if (data[0]) {
        bcrypt.hash(req.body.password, 10).then(async function (hash) {
          let ndata = await db
            .collection("users-new")
            .update(
              { email: req.body.username },
              { $set: { password: hash, date: req.body.date, type: type } }
            );
          res.send({
            error: false,
            username: req.body.username,
            type: type,
          });
        });
      } else {
        bcrypt.hash(req.body.password, 10).then(async function (hash) {
          const ndata = await db.collection("users-new").insert({
            email: req.body.username,
            password: hash,
            date: req.body.date,
            type: type,
          });
          const data = await db
            .collection("users-new")
            .find({
              email: req.body.username,
            })
            .toArray();
          await index
            .saveObjects([{ objectID: data[0]._id }])
            .then(({ objectIDs }) => {
              res.send({
                error: false,
                username: req.body.username,
                type: type,
              });
            });
        });
      }
    } else {
      res.send({ error: true });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
