import { MongoClient } from "mongodb"
import { ObjectID } from "bson"

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(process.env.DB_HOST!)
  const db = client.db()
  const articleCollection = db.collection("articles")
  const articles = await articleCollection.find().toArray()
  client.close()
    const paths = articles.map(article => {
        return {
            params: {id: article._id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const id = context.params.id
    const client = await MongoClient.connect(process.env.DB_HOST!)
    const db = client.db()
    const articleCollection = db.collection("articles")
    const objId = new ObjectID(id)
    const data = await articleCollection.find({"_id": objId}).toArray()
    client.close()
    console.log(data)
    return {
        props: 
          {articles: data.map(article => ({
            user: article.user,
            title: article.title,
            description: article.description,
            content: article.content,
            id: article._id.toString()
          }))}
      }
    }


const Article = (props: any) => {
    console.log(props)

    return(
        <div className = "p-4 text-xl font-bold">
            {props.articles[0].content}
        </div>
    )

}

export default Article