import { parseBody } from "next/dist/next-server/server/api-utils";
import { getAuthorsDBArticles } from "./database/db-related";
import { updateDBArticle } from "./database/db-related";
import { deleteDBArticle } from "./database/db-related";

const handleContributions = async (req: any, res: any) => {
    if (req.method === "POST") {
      console.log(req.body.author)
      const author = req.body.author
      const contributions = await getAuthorsDBArticles(author);
      res.send(contributions)
      //res.status(201).json({ message: "Your article has been uploaded!" });
    }
}

export default handleContributions