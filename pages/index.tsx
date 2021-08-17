import ArticleLinkList from "./articles/index"
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
    <ArticleLinkList articles= {props.articles}/>
  )
}


export default Home
