import { updateDB } from "../../Database/db-related"

const resubmitArticle = async (req: any, res: any) => {
  if(req.method === "PUT") {
    const article = req.body
    const id = article.id
    updateDB(id, article)
    res.status(201).json({message: article})
  }
}

export default resubmitArticle