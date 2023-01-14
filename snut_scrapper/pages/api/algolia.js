const algoliasearch = require("algoliasearch");

const algolia = (req, res) => {
  const client = algoliasearch(
    "LO5V83KRK7",
    "1a7d1eb3159489327b6165775c54b1b0"
  );
  const index = client.initIndex("dev_NSUT");
  res.send("success");
};

export default algolia;
