// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { submitArticleToDB } from "../../database/db-related"

const submitArticle = async (req: any, res: any) => {
  if(req.method === "POST") {
    const article = req.body
    submitArticleToDB(article)
    res.status(201).json({message: article})
  }
}

export default submitArticle
