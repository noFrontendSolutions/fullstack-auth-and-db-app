import Link from "next/link";
import CardComponent from "../../components/CardComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ArticleCard {
  _id: string;
  author: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}


export const urlIt = (string: string) => {
  string = string.trim().toLowerCase().split(" ").join("-");
  return string;
};

export const urlToName = (url: any) => {
  url = url.split("-").map((part: string) => {
      part = part.toLowerCase();
      part = part.charAt(0).toUpperCase() + part.slice(1);
      return part;
    })
    .join(" ");
  return url;
};


/*
const fetchContributions = async (author: string) => {
  const response = await fetch("../api/handle-contributions", {
    method: "POST",
    body: JSON.stringify({ author: author }),
    headers: { "Content-Type": "application/json" },
  });
  let data = await response.json();
  let contributions: ArticleCard[] = [];
  contributions = data.map((article: ArticleCard) => {
    return {
      _id: article._id.toString(),
      author: article.author,
      title: article.title,
      description: article.description,
      date: article.date,
      imageUrl: article.imageUrl,
    };
  });
  return contributions;
};
*/

const fetchContributions = async (author: string) => {
  const response = await fetch(`../api/handle-contributions/${author}`)
  let data = await response.json();
  let contributions: ArticleCard[] = [];
  contributions = data.map((article: ArticleCard) => {
    return {
      _id: article._id.toString(),
      author: article.author,
      title: article.title,
      description: article.description,
      date: article.date,
      imageUrl: article.imageUrl,
    };
  });
  return contributions;
}


const Contributions: React.FC = () => {
  const [contributions, setContributions] = useState<ArticleCard[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    (async () => {
      let query: any = router.query.author;
      let author = urlToName(query);
      setContributions(await fetchContributions(author));
    })();
  }, []);

 
  return (
    <div className= "min-h-full p-4 w-full max-w-xl xl:max-w-screen-2xl sm:grid sm:grid-cols-1 gap-8 self-center xl:grid xl:grid-cols-2">
      {contributions.map((article) => (
        <Link key={article._id} href={"/articles/" + article._id}>
          <a>
            <CardComponent
              _id={article._id}
              title={article.title}
              author={article.author}
              description={article.description}
              imageUrl={article.imageUrl}
              date={article.date}
            ></CardComponent>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Contributions;
