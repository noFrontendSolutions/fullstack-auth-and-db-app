import { findDBArticle, connectToDB } from "../../database/db-related";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useUser } from "@auth0/nextjs-auth0";
import InputForm from "../../components/InputForm";

export interface Article {
  _id: string;
  author: string;
  email: string;
  title: string;
  description: string;
  markdown: string;
  date: string;
}

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
  return {
    props: { article },
  };
};

const EditArticle: React.FC<{ article: Article }> = (props) => {
  
  const { user } = useUser();

  const id = props.article._id;
  const [title, setTitle] = useState<string>(props.article.title);
  const [description, setDescription] = useState<string>(props.article.description);
  const [markdown, setMarkdown] = useState<string>(props.article.markdown);

  const router = useRouter();
  const email = user?.email;
  const author = user?.name;

  const data = { id, author, email, title, description, markdown };

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
      edit = {true}
      title={title}
      description={description}
      markdown={markdown}
      resubmitHandler={resubmitHandler}
      deleteHandler={deleteHandler}
      setTitle={setTitle} 
      setDescription={setDescription}
      setMarkdown={setMarkdown}
    ></InputForm>
  );
};

export default EditArticle;
