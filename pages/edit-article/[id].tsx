//import connectToDB from "../../Database/db-related"
import { findDBArticle, connectToDB } from "../../database/db-related"
import { useContext, useState} from "react"
import { useRouter } from "next/dist/client/router"
import {Article} from "../../types"
import { useUser } from '@auth0/nextjs-auth0'
import DOMPurify from 'isomorphic-dompurify'
import marked from "marked"

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

        const {user} = useUser() 
        //console.log(props.oldArticle)
        const id = props.article._id!
        const [title, setTitle] = useState(props.article.title)
        const [description, setDescription] = useState(props.article.description)
        const [content, setContent] = useState(props.article.content) 
    
        const router = useRouter()
        const email = user?.email
        const data = {id, user: email, title, description, content}
        
        const resubmitHandler = async () => {
            const response = await fetch('../api/request-handler', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
            //console.log(response)
            router.push("/")
        }

        const deleteHandler = async () => {
            const response = await fetch('../api/request-handler', {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
            //console.log(response)
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
                { user?.email === props.article.user &&
                   <>
                   <div className = ""> 
                       <div className = "">
                           <form className = "flex flex-col border p-2">
                               <label htmlFor="input">Title</label>
                               <input className = "border p-2" placeholder="Start Here..." onChange = {e => setTitle(e.target.value)} defaultValue = {props.article.title}></input>
                               <label htmlFor="textarea" >Description</label>
                               <textarea placeholder="Start Here..." className = "border h-48 p-2" onChange = {e => setDescription(e.target.value)} defaultValue = {props.article.description}></textarea>
                               <label htmlFor="textarea" >Main Content (Markdown)</label>
                               <textarea placeholder="Start Here..." className = "border h-96 p-2" onChange = {e => setContent(e.target.value)} defaultValue = {props.article.content}></textarea>
                           </form>
                        <span>
                           <button className = "my-2 p-2 border-2 rounded full bg-green-400 text-gray-700 font-bold" onClick = {resubmitHandler}>RESUBMIT!</button>
                           <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold" onClick = {deleteHandler}>DELETE!</button>
                           </span>
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


export default EditArticle

