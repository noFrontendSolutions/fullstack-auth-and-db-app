import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import { useUser } from '@auth0/nextjs-auth0'
import DOMPurify from 'isomorphic-dompurify'
import marked from "marked"
import { InputOutput } from "../components/InputOutput"


const NewArticle: React.FC = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("") 

    const {user} = useUser()
    
    const router = useRouter()
    const email = user?.email

    const date = new Date()
    const month = date.getUTCMonth() +1 
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    const newDate = year + "/" + month + "/" + day
    
    const data = {user: email, name: user?.name, title, description, content, date: newDate}

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
        <InputOutput setTitle = {setTitle}  setDescription = {setDescription} setContent = {setContent} submitHandler = {submitHandler} content = {content}/>
    )
}

export default NewArticle