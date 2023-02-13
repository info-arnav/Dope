import * as jose from "jose";

export default async (req, res) => {
  try {
    const secret = new TextEncoder().encode(process.env.ENCRYPTION);
    const data = await jose.jwtVerify(req.body.string, secret);
    if (data.payload.data) {
      res.send({
        loggedIn: true,
        username: data.payload.data,
        type: data.payload.type || "student",
      });
    } else {
      res.send({ loggedIn: false });
    }
  } catch (e) {
    res.json({ error: true });
  }
};
