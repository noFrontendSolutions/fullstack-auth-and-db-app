// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb"

const submitArticle = async (req: any, res: any) => {
  if(req.method === "POST") {
    const data = req.body
    const MONGO_URI: any = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db()
    const articleCollection = db.collection("articles")
    await articleCollection.insertOne(data)
    client.close()
    res.status(201).json({message: data})
  }
}

export default submitArticle
