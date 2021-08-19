import { MongoClient } from "mongodb"
import connectToDB from "../database/db-related"

export const getStaticProps = async () => {
  
  const allArticles = await connectToDB()
  
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