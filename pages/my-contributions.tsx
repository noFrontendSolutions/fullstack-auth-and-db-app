import {connectToDB} from "../database/db-related"
import Link from "next/link"
import { GetStaticProps } from "next"
import { useUser } from '@auth0/nextjs-auth0'


interface ArticleCard {
    _id: string
    author: string
    email: string   
    title: string
    description: string
    date: string
    imageUrl: string
}


export const getStaticProps: GetStaticProps = async () => {
    const data = await connectToDB()
    const collection: ArticleCard[] = data.map(article => {
        const id = JSON.parse(JSON.stringify(article._id))
        return {
            _id: id,
            author: article.author,
            email: article.email,
            title: article.title,
            description: article.description,
            date: article.date,
            imageUrl: article.imageUrl
        }
    })
    
    return {
        props: {collection}
      }
  }

const MyContributions: React.FC<{collection: ArticleCard[]}> = (props) => {
   

    const {user} = useUser()
    let myArticles: ArticleCard[] = props.collection.filter(article => article.email === user?.email) //I'm identifying author's contributions via email because "user.name" (from auth0 user profile) could be saved differently (trimmed) in Mongo Atlas, hence "user.name === article.author" wouldn't hold anymore...hence you get zero matches  

    return (
        <div className = "h-screen">
        { !user &&
        <div className = "h-full flex items-center justify-center text-3xl">
            YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT!            
        </div>
        }
        { user &&
        <div className = "h-full relative flex flex-col items-center">
            {myArticles.map(article => (
                <Link key = {article._id} href = {"/edit-article/" + article._id}>
                    <a>
                    <div key = {article._id} className = "m-4 p-4 border rounded-xl shadow-lg hover:border-blue-500 relative max-w-4xl">
                    <img src = "/edit.png" className = "h-8 w-8 absolute right-2 top-2 object-cover"></img>
                        <h2 className = "mb-2 font-bold text-xl text-center>">{article.title}</h2>
                         <p className = "m-2">{article.description}</p>
                    </div>
                </a>
                </Link>
            ))}
         </div>
        }
        </div>
    )
}

export default MyContributions