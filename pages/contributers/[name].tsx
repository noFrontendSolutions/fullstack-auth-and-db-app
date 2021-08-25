import { connectToDB } from "../../database/db-related";

const urlIt = (string: string) => {
  string = string.trim().toLowerCase().split(" ").join("-");
  return string;
};

export const getStaticPaths = async () => {
  let authors: string[];
  const allArticles = await connectToDB();
  allArticles.forEach((article) => {
    if (authors.includes(article.author)) {
      authors.push(article.author);
    }
  });

  const paths = authors!.map((author) => {
    return {
      params: { name: urlIt(author) },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

const Contributer = () => {
  return <div></div>;
};
export default Contributer;
