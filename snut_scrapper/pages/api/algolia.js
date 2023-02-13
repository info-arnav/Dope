const algoliasearch = require("algoliasearch");
import * as jose from "jose";
import clientPromise from "../../middleware/mongodb";

export default async (req, res) => {
  try {
    const secret = new TextEncoder().encode(process.env.ENCRYPTION);
    const testData = await jose.jwtVerify(req.body.token, secret);
    let data = await db
      .collection("users-new")
      .find({ _id: req.body._id })
      .toArray();
    if (testData.payload.data == data[0].email) {
      const client = algoliasearch(
        "8PCXEU15SU",
        "fc652d91b2d6db2718b47254be4c5d6e"
      );
      const index = client.initIndex("dev_NSUT-NEW");
      if (req.body.method == "create") {
        index
          .saveObjects([{ objectID: req.body._id }])
          .then(({ objectIDs }) => {
            res.send("success");
          });
      } else if (req.body.method == "update") {
        index.partialUpdateObjects([req.body.object]).then(({ objectIDs }) => {
          res.send("success");
        });
      }
    } else {
      res.json({ error: true });
    }
  } catch {
    res.json({ error: true });
  }
};
