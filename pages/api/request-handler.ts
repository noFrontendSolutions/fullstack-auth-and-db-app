// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { submitArticleToDB } from "../../Database/db-related"
import { updateDB } from "../../Database/db-related"

const requestHandler = async (req: any, res: any) => {
  if(req.method === "POST") {
    const article = req.body
    submitArticleToDB(article)
    res.status(201).json({message: article})
  }
  if(req.method === "PUT") {
    const article = req.body
    const id = article.id
    updateDB(id, article)
    res.status(201).json({message: article})
  }
}

export default requestHandler
