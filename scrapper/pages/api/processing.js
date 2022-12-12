import { email_array } from "./email_data";
import { insta_array } from "./insta_data";
import { name_array } from "./name_array";
export default function handler(req, res) {
  let final_array = email_array;
  for (let x = 0; x < insta_array.length; x = x + 1) {
    let names = insta_array[x][1]
      .replace("_", " ")
      .replace("-", " ")
      .replace(".", " ")
      .split(" ");
    if (names.length >= 1) {
      for (let y = 0; y < name_array.length; y = y + 1) {
        names[0] = names[0].toLowerCase();
        name_array[y][0] = name_array[y][0].toLowerCase();
        if (names[0] == name_array[y][0]) {
          final_array[y][3].push(insta_array[x]);
        }
      }
    }
  }
  res.status(200).json(final_array);
}
