import { connectToDB, getDBAuthors, getAuthorsDBArticles } from "../api/database/db-related";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from "node:querystring";
import CardComponent from "../../components/CardComponent"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"

interface ArticleCard {
  _id: string;
  author: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

interface AuthorSlug extends ParsedUrlQuery {
  slug: string
}

const urlIt = (string: string) => {
  string = string.trim().toLowerCase().split(" ").join("-");
  return string;
};

const urlToName = (url: string) => {
  url = url.split("-").map((part: string) => {
    part = part.toLowerCase()
    part = part.charAt(0).toUpperCase() + part.slice(1)
    return part
  }).join(' ')
  return url
}

const fetchContributions = async (author: string)  => {
  const response = await fetch("../api/handle-contributions", {
    method: "POST",
    body: JSON.stringify({author: author}),
    headers: { "Content-Type": "application/json" },
  })
  let data = await response.json()
  let contributions: ArticleCard[] = []
  contributions  = data.map((article: ArticleCard) => {
    return {
    _id: article._id.toString(),
    author: article.author,
    title: article.title,
    description: article.description,
    date: article.date,
    imageUrl: article.imageUrl
  }
})
return contributions
}


/*
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
  const {author} = context.params as AuthorSlug  //is the same as "const authorSlug = context.params.author" if using JS (but doesn't work like that using TS)
 
  const data = await connectToDB();
  const contributions = data.filter(article => author === urlIt(article.author))
  let articles = contributions.map( (article): ArticleCard => {
    return {
    _id: article._id.toString(),
    author: article.author,
    title: article.title,
    description: article.description,
    date: article.date,
    imageUrl: article.imageUrl
  }
})
  return {
    props: { articles },
  };
};
*/

const Contributions: React.FC<{articles: ArticleCard[]}> = (props) => {
  const [contributions, setContributions] = useState<ArticleCard[]>([])
  const router = useRouter()
  const query: any = router.query.author
  let author = urlToName(query)

  useEffect(() => {
  (async () => {
    setContributions(await fetchContributions(author))
    //const data = await fetchContributions(author)
    
  })()
  },[])
  //console.log(contributions)
  //console.log(fetchedArticles)

  let cols = 1
  if(contributions.length > 1) cols = 2
  return (
    <div className= {cols > 1 ? "min-h-full p-4 max-w-screen-2xl grid grid-cols-2 gap-8 self-center" : "min-h-full p-4 w-max self-center"} >
      {contributions.map((article) => (
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

export default Contributions;
