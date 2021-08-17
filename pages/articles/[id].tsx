import { ARTICLES } from "../../dummy-data/dummy-data"

export const getStaticPaths = async () => {
    //await fetch...
    const paths = ARTICLES.map(article => {
        return {
            params: {id: article.id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const article = ARTICLES[id]
    return {
        props: {article} 
    }
}

const Article = (props) => {

    return(
        <div className = "p-4 text-xl font-bold">
            {props.article.content}
        </div>
    )

}

export default Article