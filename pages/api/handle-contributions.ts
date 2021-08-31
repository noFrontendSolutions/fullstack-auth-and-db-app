import { getAuthorsDBArticles } from "./database/db-related";


const handleContributions = async (req: any, res: any) => {
    if (req.method === "POST") {
      console.log(req.body.author)
      const author = req.body.author
      const contributions = await getAuthorsDBArticles(author);
      res.send(contributions)
    }
}

export default handleContributions