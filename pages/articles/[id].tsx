import {renderCleanMarkdown} from "../../components/InputForm"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"

type Markdown = string;

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

const Article: React.FC<{ markdown: Markdown }> = () => {
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
