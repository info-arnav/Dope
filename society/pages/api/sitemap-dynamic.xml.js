import clientPromise from "../../middleware/mongodb";
import nodemailer from "nodemailer";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db.collection("societies-new-post").find({}).toArray();
    let response = `<?xml version="1.0" encoding="UTF-8"?>
                    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
    data.map((e) => {
      response = `${response}<url><loc>https://nsut-societies.itsdope.in/post/${e._id}</loc><lastmod>2023-01-19</lastmod></url>`;
    });
    response = response + "</urlset>";
    res.setHeader("Content-Type", "text/xml");
    res.send(response);
    res.end();
  } catch (e) {
    res.send("error");
  }
};
