import { MongoClient } from "mongodb";
import { ObjectID } from "bson";
//let cachedData = {}

const connection = async () => {
  const MONGO_URI = process.env.DB_HOST;
  const con = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return con;
};

export const connectToDB = async () => {
  const db = (await connection()).db();
  const articleCollection = db.collection("articles");
  const allArticles = await articleCollection.find().toArray();
  return allArticles;
};

export const findDBArticle = async (id) => {
  const db = (await connection()).db();
  const articleCollection = db.collection("articles");
  const objId = new ObjectID(id);
  const article = await articleCollection.find({ _id: objId }).toArray();
  return article;
};

export const submitArticleToDB = async (article) => {
  const db = (await connection()).db();
  const articleCollection = db.collection("articles");
  await articleCollection.insertOne(article);
};

export const updateDBArticle = async (id, article) => {
  const db = (await connection()).db();
  console.log(article);
  const articleCollection = db.collection("articles");
  const objId = new ObjectID(id);
  await articleCollection.updateOne(
    { _id: objId },
    {
      $set: {
        id_: objId,
        title: article.title,
        description: article.description,
        content: article.content,
      },
    },
    { upsert: false }
  );
};

export const deleteDBArticle = async (id, article) => {
  const db = (await connection()).db();
  const articleCollection = db.collection("articles");
  await articleCollection.deleteOne({
    title: article.title,
    user: article.user,
  });
};

//db.COLLECTION_NAME.update(SELECTION_CRITERIA, UPDATED_DATA)
