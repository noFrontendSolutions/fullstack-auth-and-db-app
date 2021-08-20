//import connectToDB from "../../Database/db-related"
import { findDBArticle, connectToDB } from "../../Database/db-related"

export const getStaticPaths = async () => {
    const allArticles = await connectToDB()
    const paths = allArticles.map(article => {
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
    const user = await findDBArticle(id)
    return {
        props: 
          {articles: user.map(article => ({
            user: article.user,
            title: article.title,
            description: article.description,
            content: article.content,
            id: article._id.toString()
          }))}
      }
    }


const Article = (props: any) => {
    return(
        <div className = "p-4 text-xl font-bold">
            <h1>{props.articles[0].title}</h1>
            <p>{props.articles[0].description}</p>
            <p>{props.articles[0].content}</p>
        </div>
    )

}

export default Article