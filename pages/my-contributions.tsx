import {connectToDB} from "../database/db-related"
import Link from "next/link"
import { GetStaticProps } from "next"
import { useUser } from '@auth0/nextjs-auth0'

export interface Article {
    _id: string
    author: string
    email: string,
    title: string
    description: string
    markdown: string
    date: string
}


export const getStaticProps: GetStaticProps = async () => {
    const data = await connectToDB()
    const collection = data.map(article => {
        const id = JSON.parse(JSON.stringify(article._id))
        return {
            _id: id,
            author: article.author,
            email: article.email,
            title: article.title,
            description: article.description,
            markdown: article.markdown,
            date: article.date,
        }
    })
    
    return {
        props: {collection}
      }
  }

const MyContributions = (props: any) => {
    const {user} = useUser()
    let myArticles: Article[] = props.collection.filter((article: { email: string }) => article.email === user?.email)


    return (
        <div className = "h-screen">
        { !user &&
        <div className = "flex items-center justify-center text-3xl">
            YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START WRITING A NEW BLOG!            
        </div>
        }
        <div>
        { user &&
        <div className = "h-full">
            {myArticles.map(article => (
                <div key = {article._id}>
                <Link key = {article._id} href = {"/edit-article/" + article._id}>
                    <a>
                        <h2 className = "text-blue-500 font-bold text-2xl text-center>">{article.title}</h2>
                    </a>
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