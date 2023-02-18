import clientPromise from "../../middleware/mongodb";
import bcrypt from "bcrypt";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    let data = await db
      .collection("societies-new")
      .find({ email: req.body.username })
      .toArray();
    data = data[0];
    if (data) {
      if (data.password) {
        if (data.password == req.body.password) {
          res.json({
            error: false,
            loggedIn: true,
            data: req.body.username,
            type: data.type,
          });
        } else {
          res.json({ error: false, loggedIn: false });
        }
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
