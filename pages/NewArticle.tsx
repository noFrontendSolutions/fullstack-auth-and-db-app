import { useContext, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { useUser } from '@auth0/nextjs-auth0'

const NewArticle = (props: any) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("") 

    const {user} = useUser()

    const router = useRouter()
    const email = user?.email
    
    const data = {user: email, title, description, content}
    const submitHandler = async () => {
        
        const response = await fetch('./api/request-handler', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        router.push("/")
    }
  
    return(
        <div className = "h-full p-4 flex justify-center">
            { !user &&
            <div className = "flex items-center justify-center text-2xl">
                YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START WRITING A NEW BLOG!            
            </div>
            }
            { user &&
                <div className = "flex flex-col w-1/2"> 
                <form className = "flex flex-col border p-2">
                    <label htmlFor="input">Title</label>
                    <input className = "border p-2" placeholder="Start Here..." onChange = {e => setTitle(e.target.value)} ></input>
                    <label htmlFor="textarea" >Description</label>
                    <textarea placeholder="Start Here..." className = "border h-48 p-2" onChange = {e => setDescription(e.target.value)} ></textarea>
                    <label htmlFor="textarea" >Main Content</label>
                    <textarea placeholder="Start Here..." className = "border h-96 p-2" onChange = {e => setContent(e.target.value)}></textarea>
                </form>
                <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {submitHandler}>SUBMIT!</button>
                </div>
            }
        </div>
    )
}

export default NewArticle