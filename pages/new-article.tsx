import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useUser } from "@auth0/nextjs-auth0";
import InputOutput from "../components/InputForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const createDateString = (): string => {
  const date = new Date();
  const dateString = date.getUTCFullYear() + "/" +(date.getUTCMonth() + 1) + "/" +date.getUTCDate();
  return dateString;
};

const NewArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false)

  const { user } = useUser();
  const router = useRouter();
  
  const email = user?.email;
  let author = user?.name;
  let profileImage = user?.picture

  if (author) author = author.trim()
  const newDate = createDateString();

  const data = {
    author,
    email,
    title,
    description,
    markdown,
    date: newDate,
    imageUrl,
    profileImage
  };

  const submitHandler = async () => {
    setLoading(true)
    await fetch("./api/request-handler", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    router.push("/")
  }
  
  return (
    <>
      <InputOutput
        edit={false}
        loading = {loading}
        setTitle={setTitle}
        setDescription={setDescription}
        setMarkdown={setMarkdown}
        submitHandler={submitHandler}
        markdown={markdown}
        setImageUrl={setImageUrl}
        setLoading={setLoading}
      />
    </>
  );
};

export default NewArticle;

export const getServerSideProps = withPageAuthRequired()