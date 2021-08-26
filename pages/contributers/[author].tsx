import { connectToDB, getDBAuthors, getAuthorsDBArticles } from "../../database/db-related";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from "node:querystring";
import { useRouter } from 'next/router'

interface ArticleCard {
  _id: string;
  author: string;
  title: string;
  description: string;
  date: string;
}

interface AuthorSlug extends ParsedUrlQuery {
  slug: string
}

const urlIt = (string: string) => {
  string = string.trim().toLowerCase().split(" ").join("-");
  return string;
};

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async (context) => {
  const {authorSlug} = context.params as AuthorSlug  //is the same as "const authorSlug = context.params.author" if using JS (but doesn't work like that using TS)
  const data = await connectToDB();
  data.filter(article => authorSlug === urlIt(article.author))
  let articles = data.map( (article): ArticleCard => {
    return {
    _id: article._id.toString(),
    author: article.author,
    title: article.title,
    description: article.description,
    date: article.date
  }
})
  return {
    props: { articles },
  };
};

const Contributions: React.FC<{articles: ArticleCard[]}> = (props) => {
  const router = useRouter()
  //console.log(router.asPath)
  const contributions = props.articles.filter(article =>  "/contributers/" + urlIt(article.author) === router.asPath)
  return (
    <div className="min-h-full p-4 overflow-scroll">
      {contributions.map((article) => (
        <Link key={article._id} href={"../articles/" + article._id}>
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

export default Contributions;
