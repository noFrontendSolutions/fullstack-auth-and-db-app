import { MongoClient } from "mongodb"
import { ObjectID } from "bson"

const connectToDB = async () => {
    const MONGO_URI: any = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db()
    const articleCollection = db.collection("articles")
    const allArticles = await articleCollection.find().toArray()
    client.close()
    return allArticles
}

export const findDBUser = async (id: any) => {
    const MONGO_URI: any = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db()
    const articleCollection = db.collection("articles")
    const objId = new ObjectID(id)
    const user = await articleCollection.find({"_id": objId}).toArray()
    client.close()
    return user
}

export const submitArticleToDB = async (article: any) => {
    const MONGO_URI: any = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI)
    const db = client.db()
    const articleCollection = db.collection("articles")
    await articleCollection.insertOne(article)
    client.close()
}

export default connectToDB