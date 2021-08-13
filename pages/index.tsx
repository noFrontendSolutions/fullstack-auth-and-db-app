import { ARTICLES } from "../dummy-data/dummy-data"

export const getStaticProps = async () => {
  //fetch from Mongo Atlas const articles = await fetch(...)
  return {
    props: 
      {articles: ARTICLES}
  }
}

const Home = (props) => {
  return (
    <div className = "h-full">
      {props.articles.map(article => (
       <div key = {article.id}>
         <h2 className = "text-blue-500 font-bold text-2xl text-center>">{article.title}</h2>
         <p>{article.content}</p>
      </div>
    ))}
    </div>
  )
}


export default Home
