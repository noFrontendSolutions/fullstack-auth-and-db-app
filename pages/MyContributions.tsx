import { AuthContext } from "../authentication/AuthContext"
import { useContext} from "react"
import {connectToDB} from "../database/db-related"
import Link from "next/link"
import { GetStaticProps } from "next"

export interface Article {
    user?: string
    title: string
    description: string
    content: string
    _id?: string
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await connectToDB()
    const allArticles = data.map(article => {
        const id = JSON.parse(JSON.stringify(article._id))
        return {
            user: article.user,
            title: article.title,
            description: article.description,
            content: article.content,
            _id: id
        }
    })
    
    return {
        props: {allArticles}
      }
  }

const MyContributions = (props: any) => {
    const context = useContext(AuthContext)
    let myArticles: Article[] = props.allArticles.filter((article: { user: string }) => article.user === context.user)

    //useEffect(() => {
    //  myArticles = props.allArticles.filter(article => article.email === context.user)
    //}, [context.authenticated])


    return (
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
                <Link key = {article._id} href = {"/edit-article/" + article._id}>
                    <h2 className = "text-blue-500 font-bold text-2xl text-center>">{article.title}</h2>
                </Link>
                <p>{article.description}</p>
                </div>
            ))}
         </div>
        }
        </div>
        </div>
    )
}

export default MyContributions