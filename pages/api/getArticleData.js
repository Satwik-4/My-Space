import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "visitedLinks.json");

export default function handler(_, res) {
  let visitedLinks = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    if (fileContent) {
      visitedLinks = JSON.parse(fileContent);
    }
  }

  res.status(200).json({
    totalArticlesRead: visitedLinks.length,
    startingDate: "12th July, 2023", // Replace with your desired starting date logic
  });
}
