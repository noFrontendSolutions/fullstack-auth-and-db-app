import { findDBArticle } from "../database/db-related";

const handleArticle = async (req: any, res: any) => {
      const articleId = req.query.id
      const article = await findDBArticle(articleId);
      res.send(article)
}

export default handleArticle