import fs from "fs";
import path from "path";

const filePath = path.resolve(".", "public/profile.webp");
const imageBuffer = fs.readFileSync(filePath);

export default function (req, res) {
  res.setHeader("Content-Type", "image/webp");
  res.send(imageBuffer);
}
