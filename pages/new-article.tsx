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
    await fetch("./api/request-handler", {
      method: "POST",
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
  }
  return (
    <>
      <InputOutput
        edit={false}
        setTitle={setTitle}
        setDescription={setDescription}
        setMarkdown={setMarkdown}
        submitHandler={submitHandler}
        markdown={markdown}
        setImageUrl={setImageUrl}
      />
    </>
  );
};

export default NewArticle;

export const getServerSideProps = withPageAuthRequired()