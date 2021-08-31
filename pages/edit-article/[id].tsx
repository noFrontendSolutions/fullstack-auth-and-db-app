//import { findDBArticle, connectToDB } from "../api/database/db-related";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import InputForm from "../../components/InputForm";
//import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

interface Article {
  _id: string;
  author: string;
  email: string;
  title: string;
  description: string;
  markdown: string;
  date: string;
  imageUrl: string
}

interface IdSlug extends ParsedUrlQuery {
  slug: string
}

const fetchArticle = async (id: string) => {
  const response = await fetch("../api/handle-article", {
    method: "POST",
    body: JSON.stringify({id: id}),
    headers: { "Content-Type": "application/json" },
  })
  const [article] = await response.json()
  return {
    _id: article._id.toString(),
    author: article.author,
    email: article.email,
    title: article.title,
    description: article.description,
    markdown: article.markdown,
    date: article.date,
    imageUrl: article.imageUrl
  }
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


export const getStaticProps: GetStaticProps = async (context) => {
  const {id} = context.params as IdSlug;  //is the same as "const id = context.params.id" if using JS (but doesn't work like that using TS)
  const [data] = await findDBArticle(id);
  const article = JSON.parse(JSON.stringify(data)); //found no way around sending the aricle from the db as an array with one element
  return {
    props: { article },
  };
};
*/


const EditArticle: React.FC<{ article: Article }> = (props) => { //although props is not being used I'm leaving it as an argument, in case I'll find a use for getStaticPaths / getStaticProps
  let article = {} as Article
  const router = useRouter();
  
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [markdown, setMarkdown] = useState(article.markdown);
  const [imageUrl, setImageUrl] = useState(article.imageUrl)
  const [id, setId] = useState(article._id)

  useEffect(() => {
    (async ()=> {
      const articleId: any = router.query.id
      article = await fetchArticle(articleId)
      setTitle(article.title)
      setDescription(article.description)
      setImageUrl(article.imageUrl)
      setMarkdown(article.markdown)
      setId(article._id)
    })()
  }, [])
  
  const { user } = useUser()
  const email = user?.email;
  const author = user?.name;
  const data = { id, author, email, title, description, markdown, imageUrl };
  
  
  const resubmitHandler = async () => {
    await fetch("../api/request-handler", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
  })  .then(() => router.push("/"))
      .catch(error => {
        console.log(error)
        router.push("/")});
  };

  const deleteHandler = async () => {
    await fetch("../api/request-handler", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
  })  .then(() => router.push("/"))
      .catch(error => {
        console.log(error)
        router.push("/my-contributions")});
  };

  return (
    <InputForm
      edit={true}
      title={title}
      description={description}
      markdown={markdown}
      imageUrl={imageUrl}
      resubmitHandler={resubmitHandler}
      deleteHandler={deleteHandler}
      setTitle={setTitle}
      setDescription={setDescription}
      setMarkdown={setMarkdown}
      setImageUrl = {setImageUrl}
    ></InputForm>
  );
};

export default EditArticle;
export const getServerSideProps = withPageAuthRequired()