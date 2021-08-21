//import connectToDB from "../../Database/db-related"
import { findDBArticle, connectToDB } from "../../database/db-related"
import { AuthContext } from "../../authentication/AuthContext"
import { useContext, useState} from "react"
import { useRouter } from "next/dist/client/router"
import {Article} from "../MyContributions"

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
    const data = await findDBArticle(id)
    const article = JSON.parse(JSON.stringify(data[0]))
    return {
        props: {article}
    }
}

    const EditArticle: React.FC<{article: Article}> = (props) => {
        //console.log(props.oldArticle)
        const context = useContext(AuthContext)
        const id = props.article._id
        const [title, setTitle] = useState(props.article.title)
        const [description, setDescription] = useState(props.article.description)
        const [content, setContent] = useState(props.article.content) 
    
        const router = useRouter()
        const user = context.user
        const data = {id, user, title, description, content}
        console.log(props)
        const resubmitHandler = async () => {
            const response = await fetch('../api/request-handler', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
    
            //const answer = await response.json()
            //console.log(answer)
            router.push("/")
        }
      
        return(
            <div className = "h-full p-4 flex justify-center">
                { !context.user &&
                <div className = "flex items-center justify-center text-2xl">
                    YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START WRITING A NEW BLOG!            
                </div>
                }
                { context.user === props.article.user &&
                    <div className = "flex flex-col w-1/2"> 
                    <form className = "flex flex-col border p-2">
                        <label htmlFor="input">Title</label>
                        <input className = "border p-2" placeholder="Start Here..." onChange = {e => setTitle(e.target.value)} defaultValue = {props.article.title}></input>
                        <label htmlFor="textarea" >Description</label>
                        <textarea placeholder="Start Here..." className = "border h-48 p-2" onChange = {e => setDescription(e.target.value)} defaultValue = {props.article.description}></textarea>
                        <label htmlFor="textarea" >Main Content</label>
                        <textarea placeholder="Start Here..." className = "border h-96 p-2" onChange = {e => setContent(e.target.value)} defaultValue = {props.article.content}></textarea>
                    </form>
                    <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {resubmitHandler}>Edit!</button>
                    </div>
                }
            </div>
        )
    }


export default EditArticle