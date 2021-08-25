import { findDBArticle, connectToDB } from "../../database/db-related";

type Markdown = string;

export const getStaticPaths = async () => {
  const allArticles = await connectToDB();
  const paths = allArticles.map((article) => {
    return {
      params: { id: article._id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await findDBArticle(id);
  const article = JSON.parse(JSON.stringify(data[0])); //found no way around sending the aricle from the db as an array with one element
  let markdown = article.markdown;
  return {
    props: { markdown },
  };
};

const Article: React.FC<{ markdown: Markdown }> = (props) => {
  return <div className="p-4 text-xl font-bold">
      {props.markdown}
      </div>;
};

export default Article;
