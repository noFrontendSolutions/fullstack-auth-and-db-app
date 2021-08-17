import { AuthContext } from "../authentication/AuthContext"
import { useContext, useEffect } from "react"
import { ARTICLES } from "../dummy-data/dummy-data"

export const getStaticProps = async () => {
    //fetch from Mongo Atlas const articles = await fetch(...)
    let allArticles = ARTICLES
    return {
      props: 
        {allArticles}
    }
  }

const MyContributions = (props) => {
    const context = useContext(AuthContext)
    let myArticles = props.allArticles.filter(article => article.email === context.user)

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