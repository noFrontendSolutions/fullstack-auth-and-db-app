import { MongoClient } from "mongodb"
import { ObjectID } from "bson"
let cachedData = {}


export const connectToDB = async () => {
    const MONGO_URI = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    const db = client.db()
    const articleCollection = db.collection("articles")
    const allArticles = await articleCollection.find().toArray()
    client.close()
    return allArticles
}

export const findDBArticle = async (id) => {
    const MONGO_URI = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    const db = client.db()
    const articleCollection = db.collection("articles")
    const objId = new ObjectID(id)
    const article = await articleCollection.find({"_id": objId}).toArray()
    client.close()
    return article
}

export const submitArticleToDB = async (article) => {
    const MONGO_URI = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    const db = client.db()
    const articleCollection = db.collection("articles")
    await articleCollection.insertOne(article)
    client.close()
}

export const updateDB = async (id, article) => {
    const MONGO_URI = process.env.DB_HOST
    const client = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    const db = client.db()
    const articleCollection = db.collection("articles")
    const objId = new ObjectID(id)
    await articleCollection.updateOne({"_id": objId}, {$set: {title: article.title, description: article.description, content: article.content}}, { upsert: false })
}


//db.COLLECTION_NAME.update(SELECTION_CRITERIA, UPDATED_DATA)