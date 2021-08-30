import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { findDBArticle, connectToDB } from "../api/database/db-related";
import {renderCleanMarkdown} from "../../components/InputForm"

type Markdown = string;

interface IdSlug extends ParsedUrlQuery {
  slug: string
}


export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps:GetStaticProps = async (context) => {
  const {id} = context.params as IdSlug;
  const [data] = await findDBArticle(id);
  const article = JSON.parse(JSON.stringify(data)); 
  let markdown = article.markdown;
  return {
    props: { markdown },
  };
};

const Article: React.FC<{ markdown: Markdown }> = (props) => {
  return (
    <div
    className="p-6 border self-center shadow-2xl prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
    dangerouslySetInnerHTML={renderCleanMarkdown(props.markdown)}
  ></div>
  )
};

export default Article;
