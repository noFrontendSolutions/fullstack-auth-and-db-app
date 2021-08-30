import { findDBArticle, connectToDB } from "../api/database/db-related";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useUser } from "@auth0/nextjs-auth0";
import InputForm from "../../components/InputForm";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "node:querystring";

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
  const data = await findDBArticle(id);
  const article = JSON.parse(JSON.stringify(data[0])); //found no way around sending the aricle from the db as an array with one element
  return {
    props: { article },
  };
};

const EditArticle: React.FC<{ article: Article }> = (props) => {
  const { user } = useUser();

  const id = props.article._id;
  const [title, setTitle] = useState<string>(props.article.title);
  const [description, setDescription] = useState<string>(
    props.article.description
  );
  const [markdown, setMarkdown] = useState<string>(props.article.markdown);
  const [imageUrl, setImageUrl] = useState<string>(props.article.imageUrl)

  const router = useRouter();
  const email = user?.email;
  const author = user?.name;

  const data = { id, author, email, title, description, markdown, imageUrl };

  console.log(data.imageUrl)
  const resubmitHandler = async () => {
    const response = await fetch("../api/request-handler", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/my-contributions");
  };

  const deleteHandler = async () => {
    const response = await fetch("../api/request-handler", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/my-contributions");
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
