//import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
//import { findDBArticle, connectToDB } from "../api/database/db-related";
import {renderCleanMarkdown} from "../../components/InputForm"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"

type Markdown = string;

interface IdSlug extends ParsedUrlQuery {
  slug: string
}

const fetchMarkdown = async (id: string)  => {
  let markdown: Markdown = ""
  const response = await fetch("../api/handle-article", {
    method: "POST",
    body: JSON.stringify({id: id}),
    headers: { "Content-Type": "application/json" },
  })
  let [data] = await response.json()
  markdown = data.markdown
return markdown
}

/*
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
*/

const Article: React.FC<{ markdown: Markdown }> = (props) => { //although props is not being used I'm leaving it as an argument, in case I'll find a use for getStaticPaths / getStaticProps
  const [markdown, setMarkdown] = useState<Markdown>("")
  const router = useRouter()
 
  useEffect( () => {
    (async () => {
      const articleId: any = router.query.id
      setMarkdown(await fetchMarkdown(articleId))
    })() 
  }, [])

  return (
    <div
    className="p-6 border self-center shadow-2xl prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
    dangerouslySetInnerHTML={renderCleanMarkdown(markdown)}
  ></div>
  )
};

export default Article;
