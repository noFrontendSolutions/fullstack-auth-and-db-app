import { MongoClient } from "mongodb";
import { ObjectID } from "bson";
//let cachedData = {}

const makeConnection = async () => {
  const MONGO_URI = process.env.DB_HOST;
  const con = await MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return con;
};

export const connectToDB = async () => {
  const db = (await makeConnection()).db();
  const articleCollection = db.collection("articles");
  const allArticles = await articleCollection.find().toArray();
  return allArticles;
};

export const findDBArticle = async (id) => {
  const db = (await makeConnection()).db();
  const articleCollection = db.collection("articles");
  const objId = new ObjectID(id);
  const article = await articleCollection.find({ _id: objId }).toArray();
  return article;
};

export const getAuthorsDBArticles = async (author) => {
  const db = (await makeConnection()).db();
  const articleCollection = db.collection("articles");
  const theirArticles = await articleCollection.find({ author: author }).toArray();
  return theirArticles;
};

export const submitArticleToDB = async (article) => {
  const db = (await makeConnection()).db();
  const articleCollection = db.collection("articles");
  await articleCollection.insertOne(article);
};

export const updateDBArticle = async (id, article) => {
  const db = (await makeConnection()).db();
  const articleCollection = db.collection("articles");
  const objId = new ObjectID(id);
  await articleCollection.updateOne(
    { _id: objId },
    {
      $set: {
        id_: objId,
        title: article.title,
        description: article.description,
        markdown: article.markdown,
      },
    },
    { upsert: false }
  );
};

export const deleteDBArticle = async (id, article) => {
  const db = (await makeConnection()).db();
  const articleCollection = db.collection("articles");
  await articleCollection.deleteOne({
    title: article.title,
    author: article.author,
  });
};

export const getDBAuthors = async () => {
    let authors = []
    const db = (await makeConnection()).db()
    const articleCollection = await db.collection("articles").find().toArray(); //this is not effective...be more specific and use find method
    articleCollection.forEach(article => {
        if(!authors.includes(article.author)) {
            authors.push(article.author)
        }
    })
    return authors
}


