import { AuthContext } from "../authentication/AuthContext"
import { useContext} from "react"

import { MongoClient } from "mongodb"

export const getStaticProps = async () => {
    const client = await MongoClient.connect(process.env.DB_HOST)
    const db = client.db()
    const articleCollection = db.collection("articles")
    const allArticles = await articleCollection.find().toArray()
    client.close()
    
    return {
        props: 
          {allArticles: allArticles.map(article => ({
            user: article.user,
            title: article.title,
            description: article.description,
            content: article.content,
            id: article._id.toString()
          }))}
      }
  }

const MyContributions = (props) => {
    const context = useContext(AuthContext)
    let myArticles = props.allArticles.filter(article => article.user === context.user)

    //useEffect(() => {
    //  myArticles = props.allArticles.filter(article => article.email === context.user)
    //}, [context.authenticated])


    return(
        <div className = "h-screen">
        { !context.user &&
        <div className = "flex items-center justify-center text-3xl">
            YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START WRITING A NEW BLOG!            
        </div>
        }
        <div>
        { context.user &&
        <div className = "h-full">
            {myArticles.map(article => (
                <div>
                <h2 key = {article.id} className = "text-blue-500 font-bold text-2xl text-center>">{article.title}</h2>
                <p>{article.content}</p>
                </div>
            ))}
         </div>
        }
        </div>
        </div>
    )
}

export default MyContributions