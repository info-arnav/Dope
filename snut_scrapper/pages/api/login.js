import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    let data = await db
      .collection("users")
      .find({ email: req.body.username.split("@")[0] })
      .toArray();
    data = data[0];
    if (data) {
      if (data.password) {
        bcrypt.compare(
          req.body.password,
          data.password,
          function (err, result) {
            if (result) {
              res.json({
                error: false,
                loggedIn: true,
                data: req.body.username,
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