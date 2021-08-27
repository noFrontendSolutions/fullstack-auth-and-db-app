import { GetStaticProps } from "next";
import Link from "next/link";
import { connectToDB } from "../database/db-related";
import CardComponent from "../components/CardComponent"

interface ArticleCard {
  _id: string
  author: string
  title: string
  description: string
  date: string
  imageUrl: string
}

export const getStaticProps: GetStaticProps = async () => {
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

  return {
    props: { articles },
  };
};

const Home: React.FC<{articles: ArticleCard[]}> = (props) => {
  return (
   
    <div className="pt-16 min-h-full p-4 max-w-screen-2xl grid grid-cols-2 gap-8 self-center">
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
