import { GetStaticProps } from "next";
import Link from "next/link";
import { connectToDB } from "../database/db-related";

interface ArticleCard {
  _id: string
  author: string
  title: string
  description: string
  date: string
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await connectToDB();
  const articles: ArticleCard[] = data.map((article): ArticleCard => {
    return {
      _id: article._id.toString(),
      author: article.author,
      title: article.title,
      description: article.description,
      date: article.date
    };
  });

  return {
    props: { articles },
  };
};

const Home: React.FC<{articles: ArticleCard[]}> = (props) => {
  return (
    <div className="min-h-full p-4 overflow-scroll">
      {props.articles.map((article) => (
        <Link key={article._id} href={"/articles/" + article._id}>
          <a>
            <h2 className="text-blue-500 font-bold text-2xl text-center>">
              {article.title}
            </h2>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
