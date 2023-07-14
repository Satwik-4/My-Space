import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "visitedLinks.json");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { link } = req.body;

    let visitedLinks = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      if (fileContent) {
        visitedLinks = JSON.parse(fileContent);
      }
    }

    if (visitedLinks.includes(link)) {
      res
        .status(200)
        .json({ message: "You have already visited and read this article" });
    } else {
      visitedLinks.push(link);
      fs.writeFileSync(filePath, JSON.stringify(visitedLinks));

      const totalArticlesRead = visitedLinks.length;
      const startingDate = new Date().toLocaleDateString();

      res.status(200).json({
        message: "Done",
        totalArticlesRead,
        startingDate,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
