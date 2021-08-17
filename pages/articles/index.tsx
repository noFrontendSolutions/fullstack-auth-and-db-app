import Link from "next/link"

const ArticleLinkList = (props) => {
  return (
    <div className = "h-full p-4 overflow-scroll">
      {props.articles.map(article => (
       <Link key = {article.id} href = {"/articles/" + article.id}>
         <h2 className = "text-blue-500 font-bold text-2xl text-center>">{article.title}</h2>
      </Link>
    ))}
    </div>
  )
}


export default ArticleLinkList