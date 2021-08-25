import Link from "next/link";
import { connectToDB } from "../database/db-related";

export const getStaticProps = async () => {
  const allArticles = await connectToDB();
  let authors: string[] = [];

  allArticles.forEach((article) => {
    if (!authors.includes(article.author)) authors.push(article.author);
  });
  return {
    props: { authors },
  };
};

const Contributers = (props: any) => {
  let authors: string[ ] = props.authors

  const urlIt = (string: string) => {
    string = string.trim().toLowerCase().split(" ").join("-");
    return string;
  };

  const urlChunks = authors?.map(author => urlIt(author))
  

  return (
    <div className="h-full">
      {urlChunks.map((chunk:string, index: number) => (
        <Link key={chunk} href={"/contributers/" + chunk}>
          <a>
            <h2
              key={authors[index]}
              className="text-blue-500 font-bold text-2xl text-center>"
            >
              {authors[index]}
            </h2>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Contributers;
