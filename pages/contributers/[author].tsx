import { connectToDB, getDBAuthors, getAuthorsDBArticles } from "../../database/db-related";
import Link from "next/link";

export interface Article {
  _id: string;
  author: string;
  email: string;
  title: string;
  description: string;
  markdown: string;
  date: string;
}

const urlIt = (string: string) => {
  string = string.trim().toLowerCase().split(" ").join("-");
  return string;
};

export const getStaticPaths = async () => {
  let authors: string[] = await getDBAuthors()
  const paths = authors!.map((author) => {
    return {
      params: { author: urlIt(author)}
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const authorUrl = context.params.author
  
  const data = await connectToDB();
  data.filter(article => authorUrl === urlIt(article.author))
  let articles = data.map( article => {
    return {
    id_: article._id.toString(),
    author: article.author,
    email: article.email,
    title: article.title,
    description: article.description,
    markdown: article.markdown,
  }
})
  return {
    props: { articles },
  };
};

const Contributions: React.FC<{articles: Article[]}> = (props) => {
  return (
    <div className="min-h-full p-4 overflow-scroll">
      {props.articles.map((article: Article) => (
        <Link key={article._id} href={"/articles/" + article._id}>
          <h2 className="text-blue-500 font-bold text-2xl text-center>">
            {article.title}
          </h2>
        </Link>
      ))}
    </div>
  );
};
export default Contributions;
