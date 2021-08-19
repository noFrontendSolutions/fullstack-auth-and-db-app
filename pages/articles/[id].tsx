import connectToDB from "../../database/db-related"
import { findDBUser } from "../../database/db-related"

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
    const user = await findDBUser(id)
    //console.log(data)
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
    console.log(props)

    return(
        <div className = "p-4 text-xl font-bold">
            {props.articles[0].content}
        </div>
    )

}

export default Article