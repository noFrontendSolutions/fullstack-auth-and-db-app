import { useContext, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { useUser } from '@auth0/nextjs-auth0'
import DOMPurify from 'isomorphic-dompurify'
import marked from "marked"

const NewArticle = (props: any) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("") 

    const {user} = useUser()

    const router = useRouter()
    const email = user?.email
    
    const data = {user: email, name: user?.name, title, description, content}
    const submitHandler = async () => {
        
        const response = await fetch('./api/request-handler', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        router.push("/")
    }

    function createMarkup(md: string) {
        let cleanMd = DOMPurify.sanitize(md)
        return {__html: marked(cleanMd)};
      }
  
    return(
        <div className = "h-full p-4 grid grid-cols-2">
            { !user &&
            <div className = "flex items-center justify-center text-2xl">
                YOU'RE NOT AUTHORIZED TO VIEW THIS CONTENT. LOGIN BEFORE YOU START WRITING A NEW BLOG!            
            </div>
            }
            { user &&
            <>
            <div className = ""> 
                <div className = "">
                    <form className = "flex flex-col border p-2">
                        <label htmlFor="input">Title</label>
                        <input className = "border p-2" placeholder="Start Here..." onChange = {e => setTitle(e.target.value)} ></input>
                        <label htmlFor="textarea" >Description</label>
                        <textarea placeholder="Start Here..." className = "border h-48 p-2" onChange = {e => setDescription(e.target.value)} ></textarea>
                        <label htmlFor="textarea" >Main Content (Markdown)</label>
                        <textarea placeholder="Start Here..." className = "border h-96 p-2" onChange = {e => setContent(e.target.value)}></textarea>
                    </form>
                    <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {submitHandler}>SUBMIT!</button>
                </div>
            </div>
            <div className = "ml-4 text-center h-2/3"> 
                < label htmlFor="input" className = "font-bold">Markdown Preview</label>
                <div dangerouslySetInnerHTML = {createMarkup(content)} className = "h-full p-2 flex border"></div>
            </div> 
            </>
            }
        </div>
    )
}

export default NewArticle