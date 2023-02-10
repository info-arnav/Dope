const algoliasearch = require("algoliasearch");

const algolia = (req, res) => {
  const client = algoliasearch(
    "8PCXEU15SU",
    "fc652d91b2d6db2718b47254be4c5d6e"
  );
  const index = client.initIndex("dev_NSUT-NEW");
  if (req.body.method == "create") {
    index.saveObjects([{ objectID: req.body.email }]).then(({ objectIDs }) => {
      res.send("success");
    });
  } else if (req.body.method == "update") {
    index.partialUpdateObjects([req.body.object]).then(({ objectIDs }) => {
      res.send("success");
    });
  }
};

export default algolia;
