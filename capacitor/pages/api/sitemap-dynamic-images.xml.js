import clientPromise from "../../middleware/mongodb";
import nodemailer from "nodemailer";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db.collection("users").find({}).toArray();
    let response = `<?xml version="1.0" encoding="UTF-8"?>
                    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    data.map((e) => {
      if (e.image) {
        response =
          response +
          `<url><loc>/profile/${e.email}</loc><image:image> <image:loc>/api/image/${e.email}</image:loc></image:image></url>`;
      }
    });
    response = response + "</urlset>";
    res.setHeader("Content-Type", "text/xml");
    res.send(response);
    res.end();
  } catch (e) {
    res.send("error");
  }
};
