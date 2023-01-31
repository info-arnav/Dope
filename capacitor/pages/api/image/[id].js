import clientPromise from "../../../middleware/mongodb";

export default async (req, res) => {
  const { id } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("nsut");
    const data = await db
      .collection("user-images")
      .find({ email: id })
      .toArray();
    var base64Data = data[0].image.replace(
      /^data:image\/(jpg|jpeg|png|gif|webp|svg);base64,/,
      ""
    );
    var img = Buffer.from(base64Data, "base64");
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    });
    res.end(img);
  } catch (e) {
    res.json({ error: true });
  }
};
