
import Link from "next/link"
import {connectToDB} from "../Database/db-related"

export const getStaticProps = async () => {
  const allArticles = await connectToDB()

  return {
    props: 
      {articles: allArticles.map(article => ({
        user: article.user,
        title: article.title,
        description: article.description,
        content: article.content,
        id: article._id.toString()
      }))}
  }
}

const Home = (props: any) => {
  return (
    <div className = "h-full p-4 overflow-scroll">
      {props.articles.map((article: any) => (
       <Link key = {article.id} href = {"/articles/" + article.id}>
         <h2 className = "text-blue-500 font-bold text-2xl text-center>">{article.title}</h2>
      </Link>
    ))}
    </div>
  )
}


export default Home
