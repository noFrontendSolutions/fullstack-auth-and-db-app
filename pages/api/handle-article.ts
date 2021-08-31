import { findDBArticle } from "./database/db-related";

const handleArticle = async (req: any, res: any) => {
    if (req.method === "POST") {
      console.log(req.body.id)
      const articleId = req.body.id
      const article = await findDBArticle(articleId);
      res.send(article)
      //res.status(201).json({ message: "Your article has been uploaded!" });
    }
}

export default handleArticle