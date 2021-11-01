import { GetServerSideProps } from "next";
import Link from "next/link";
import { connectToDB } from "../database/db-related";
import CardComponent from "../components/CardComponent"
import {useQuery, useQueryClient} from "react-query"

interface ArticleCard {
  _id: string
  author: string
  title: string
  description: string
  date: string
  imageUrl: string
}

const getAllArticles = async() => {
  const data = await connectToDB();
  const articles: ArticleCard[] = data.map((article): ArticleCard => {
    return {
      _id: article._id.toString(),
      author: article.author,
      title: article.title,
      description: article.description,
      date: article.date,
      imageUrl: article.imageUrl
    };
  });
 // console.log(articles)
  return articles
}

export const getServerSideProps: GetServerSideProps = async () => {
  let articles = await getAllArticles()
  //console.log(articles)

  return {
    props: { articles },
  };
};

const Home: React.FC<{articles: ArticleCard[]}> = (props) => {
  //const queryClient = useQueryClient()
  //const { data } = useQuery('articles', getAllArticles, { initialData: props.articles })
  //console.log(data)
  return (
    <div className="min-h-full p-4 w-full max-w-xl xl:max-w-screen-2xl sm:grid sm:grid-cols-1 gap-8 self-center xl:grid xl:grid-cols-2">
      {props.articles.map((article) => (
        <Link key={article._id} href={"/articles/" + article._id}>
          <a>
          <CardComponent
            _id = {article._id}
            title = {article.title}
            author = {article.author}
            description = {article.description}
            imageUrl = {article.imageUrl}
            date = {article.date}
          ></CardComponent>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
