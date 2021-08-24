import { Article } from "../types";
import { useUser } from "@auth0/nextjs-auth0";
import DOMPurify from 'isomorphic-dompurify'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
//to get Markdown to work properly with tailwindcss I've created a unreset scss-class in the tailwind folder (unreset.scss) and imported into _app.js and then used in the ReactMarkdown element.
//watch "https://www.youtube.com/watch?v=iLEYtgBezhs" for details  



export const InputOutput = (props: any) => {
    const user = useUser()

   function cleanMarkdown(md: string) {
       let cleanMd = DOMPurify.sanitize(md)
        return cleanMd
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
                        <input className = "border p-2" placeholder="Start Here..." onChange = {e => props.setTitle(e.target.value)} defaultValue = {props.title ? props.title : ""}></input>
                        <label htmlFor="textarea" >Description</label>
                        <textarea placeholder="Start Here..." className = "border h-48 p-2" onChange = {e => props.setDescription(e.target.value)} defaultValue = {props.description ? props.description : ""}></textarea>
                        <label htmlFor="textarea" >Main Content (Markdown)</label>
                        <textarea placeholder="Start Here..." className = "border h-96 p-2" onChange = {e => props.setContent(e.target.value)} defaultValue = {props.content ? props.content : ""}></textarea>
                    </form>
                    { !props.resubmitHandler &&
                    <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {props.submitHandler}>SUBMIT!</button>
                    }
                    { props.resubmitHandler &&
                    <span>
                           <button className = "my-2 p-2 border-2 rounded full bg-green-400 text-gray-700 font-bold" onClick = {props.resubmitHandler}>RESUBMIT!</button>
                           <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {props.deleteHandler}>DELETE!</button>
                    </span>
                    }
                </div>
            </div>
            <div className = "ml-4 h-2/3 flex-none"> 
                <label htmlFor="input" className = "font-bold">Markdown Preview</label>
                <ReactMarkdown className = "h-full p-2 border overflow-scroll unreset" remarkPlugins={[remarkGfm]}>{cleanMarkdown(props.content)}</ReactMarkdown>
            </div> 
            </>
            }
        </div>
    )

    
}