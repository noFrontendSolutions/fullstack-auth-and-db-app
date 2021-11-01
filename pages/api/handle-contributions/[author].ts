import { getAuthorsDBArticles } from "../../../database/db-related";

const handleContributions = async (req: any, res: any) => {
      const author = req.query.author
      const contributions = await getAuthorsDBArticles(author);
      res.send(contributions)
    
}

export default handleContributions