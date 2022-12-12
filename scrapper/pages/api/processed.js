import { processed_array } from "./all_proccessed.js";
export default function handler(req, res) {
  res.status(200).json(processed_array);
}
