// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb"

const newArticleHandler = async (req, res) => {
  if(req.method === "POST") {
    const data = req.body
    const client = await MongoClient.connect(process.env.DB_HOST)
    const db = client.db()
    const articleCollection = db.collection("articles")
    await articleCollection.insertOne(data)
    client.close()
    res.status(201).json({message: data})
  }
}

export default newArticleHandler