import { findDBArticle, connectToDB } from "../../database/db-related";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Article } from "../../types";
import { useUser } from "@auth0/nextjs-auth0";
import InputForm from "../../components/InputForm";

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
  const article = JSON.parse(JSON.stringify(data[0]));
  return {
    props: { article },
  };
};

const EditArticle: React.FC<{ article: Article }> = (props) => {
  const { user } = useUser();
  const id = props.article._id!;
  const [title, setTitle] = useState(props.article.title);
  const [description, setDescription] = useState(props.article.description);
  const [content, setContent] = useState(props.article.content);

  const router = useRouter();
  const email = user?.email;
  const data = { id, user: email, title, description, content };

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
      title={title}
      description={description}
      content={content}
      resubmitHandler={resubmitHandler}
      deleteHandler={deleteHandler}
      setTitle={setTitle}
      setDescription={setDescription}
      setContent={setContent}
    ></InputForm>
  );
};

export default EditArticle;
