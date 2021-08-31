// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { submitArticleToDB } from "./database/db-related";
import { updateDBArticle } from "./database/db-related";
import { deleteDBArticle } from "./database/db-related";

const requestHandler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const article = req.body;
    await submitArticleToDB(article);
    res.status(201).json({ message: "Your article has been uploaded!" });
  }
  if (req.method === "PUT") {
    const article = req.body;
    const id = article.id;
    await updateDBArticle(id, article);
    res.status(204).json({ message: "Your article has been updated!" });
  }

  if (req.method === "DELETE") {
    const article = req.body;
    const id = article.id;
    await deleteDBArticle(id, article);
    res.status(204).json({ message: "Your article has been deleted!" });
  }
};

export default requestHandler;
