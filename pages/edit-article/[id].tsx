//import connectToDB from "../../Database/db-related"
import { findDBArticle, connectToDB } from "../../Database/db-related"
import { AuthContext } from "../../authentication/AuthContext"
import { useContext, useState} from "react"
import { useRouter } from "next/dist/client/router"

export const getStaticPaths = async () => {
    
    const allArticles = await connectToDB()
    const paths = allArticles.map(article => {
        return {
            params: {id: article._id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const id = context.params.id
    const user = await findDBArticle(id)
    //console.log(data)
    return {
        props: 
          {articles: user.map(article => ({
            user: article.user,
            title: article.title,
            description: article.description,
            content: article.content,
            id: article._id.toString()
          }))}
      }
    }

    const EditArticle = (props: any) => {
        //console.log(props.oldArticle)
        const context = useContext(AuthContext)
        const id = props.articles[0].id
        const [title, setTitle] = useState(props.articles[0].title)
        const [description, setDescription] = useState(props.articles[0].description)
        const [content, setContent] = useState(props.articles[0].description) 
    
        const router = useRouter()
        const user = context.user
        const data = {user, title, description, content, id}

        const resubmitHandler = async () => {
            const response = await fetch('../api/resubmit-article', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
    
            const answer = await response.json()
            //console.log(answer)
            router.push("../")
        }
      
        return(
            <div className = "h-full p-4 flex justify-center">
                { !context.user &&
                <div className = "flex items-center justify-center text-2xl">
                    YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START WRITING A NEW BLOG!            
                </div>
                }
                { context.user &&
                    <div className = "flex flex-col w-1/2"> 
                    <form className = "flex flex-col border p-2">
                        <label htmlFor="input">Title</label>
                        <input className = "border p-2" placeholder="Start Here..." onChange = {e => setTitle(e.target.value)} defaultValue = {props.articles[0].title}></input>
                        <label htmlFor="textarea" >Description</label>
                        <textarea placeholder="Start Here..." className = "border h-48 p-2" onChange = {e => setDescription(e.target.value)} defaultValue = {props.articles[0].description}></textarea>
                        <label htmlFor="textarea" >Main Content</label>
                        <textarea placeholder="Start Here..." className = "border h-96 p-2" onChange = {e => setContent(e.target.value)} defaultValue = {props.articles[0].content}></textarea>
                    </form>
                    <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {resubmitHandler}>Edit!</button>
                    </div>
                }
            </div>
        )
    }


export default EditArticle