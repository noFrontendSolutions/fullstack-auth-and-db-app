import { AuthContext } from "../authentication/AuthContext"
import { useContext, useState } from "react"
import { useRouter } from "next/dist/client/router"

const NewArticle = () => {
    const context = useContext(AuthContext)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [content, setContent] = useState (null) 

    const router = useRouter()
    const user = context.user
    const data = {user, title, description, content}
    const submitHandler = async () => {
        
        //console.log(data)
        const response = await fetch('./api/new-article', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })

        const answer = await response.json()
        //console.log(answer)
        router.push("./")
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
                    <input className = "border p-2" placeholder="Start Here..." onChange = {e => setTitle(e.target.value)}></input>
                    <label htmlFor="textarea" >Description</label>
                    <textarea placeholder="Start Here..." className = "border h-48 p-2" onChange = {e => setDescription(e.target.value)} ></textarea>
                    <label htmlFor="textarea" >Main Content</label>
                    <textarea placeholder="Start Here..." className = "border h-96 p-2" onChange = {e => setContent(e.target.value)} ></textarea>
                </form>
                <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {submitHandler}>SUBMIT!</button>
                </div>
            }
        </div>
    )
}

export default NewArticle