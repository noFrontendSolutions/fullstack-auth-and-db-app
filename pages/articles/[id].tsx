import { findDBArticle, connectToDB } from "../../database/db-related"

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
    const data = await findDBArticle(id)
    const article = JSON.parse(JSON.stringify(data[0])) //found no way around sending the aricle from the db as an array with one element
    return {
        props: {article}
      }
    }


const Article = (props: any) => {
    return(
        <div className = "p-4 text-xl font-bold">
            <h1>{props.article.title}</h1>
            <p>{props.article.description}</p>
            <p>{props.article.markdown}</p>
            <p>{props.article.date}</p>
        </div>
    )
}

export default Article