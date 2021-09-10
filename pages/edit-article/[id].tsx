import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import InputForm from "../../components/InputForm";
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


const fetchArticle = async (id: string) => {
  const response = await fetch(`../api/handle-article/${id}`)
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


const EditArticle: React.FC = () => {
  let article = {} as Article
  const router = useRouter();
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    await fetch("../api/request-handler", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => router.push("/"))
      .catch(error => {
        console.log(error)
        router.push("/")});
  };

  const deleteHandler = async () => {
    setLoading(true)
    await fetch("../api/request-handler", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(() => router.push("/"))
      .catch(error => {
        console.log(error)
        router.push("/my-contributions")});
  };

  return (
    <InputForm
      loading = {loading}
      edit={true}
      title={title}
      description={description}
      markdown={markdown}
      imageUrl={imageUrl}
      setLoading = {setLoading}
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