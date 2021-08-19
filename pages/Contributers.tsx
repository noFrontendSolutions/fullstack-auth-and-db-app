import { MongoClient } from "mongodb"

export const getStaticProps = async () => {
  const client = await MongoClient.connect(process.env.DB_HOST!)
  const db = client.db()
  const articleCollection = db.collection("articles")
  const allArticles = await articleCollection.find().toArray()
  client.close()
    let authors: string[] = []
    allArticles.forEach((article) => {
        if(!authors.includes(article.user)) authors.push(article.user) 
    })
    return {
      props: 
        {authors}
    }
  }

const Contributers = (props: any) => {
    return(
        <div className = "h-full">
            {props.authors.map((author: any) => (
                <h2 key = {author} className = "text-blue-500 font-bold text-2xl text-center>">{author}</h2>
            ))}
         </div>
  )
}

export default Contributers