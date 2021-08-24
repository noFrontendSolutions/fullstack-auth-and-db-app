import { Article } from "../types";
import { useUser } from "@auth0/nextjs-auth0";
import DOMPurify from 'isomorphic-dompurify'
import marked from "marked"

export const InputOutput = (props: any) => {
    const user = useUser()

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
            <div className = "ml-4 text-center h-2/3"> 
                < label htmlFor="input" className = "font-bold">Markdown Preview</label>
                <div dangerouslySetInnerHTML = {createMarkup(props.content)} className = "h-full p-2 flex border"></div>
            </div> 
            </>
            }
        </div>
    )

    
}