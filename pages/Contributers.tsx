import { ARTICLES } from "../dummy-data/dummy-data"

export const getStaticProps = async () => {
    //fetch from Mongo Atlas const articles = await fetch(...)
    let authors: string[] = []
    ARTICLES.forEach((article) => {
        if(!authors.includes(article.author)) authors.push(article.author) 
    })
    return {
      props: 
        {authors}
    }
  }

const Contributers = (props) => {
    return(
        <div className = "h-full">
            {props.authors.map(author => (
                <h2 key = {author} className = "text-blue-500 font-bold text-2xl text-center>">{author}</h2>
            ))}
         </div>
  )
}

export default Contributers