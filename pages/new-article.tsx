import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import { useUser } from '@auth0/nextjs-auth0'
import  InputOutput from "../components/InputForm"


const createDateString = () => {
    const date = new Date()
    const dateString = date.getUTCFullYear() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCDate()
    return dateString
}


const NewArticle = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [markdown, setMarkdown] = useState("") 

    const {user} = useUser()
    
    const router = useRouter()
    const email = user?.email
    const author = user?.name
    const newDate = createDateString()
    
    const data = {author, email, title, description, markdown, date: newDate}

    const submitHandler = async () => {
        await fetch('./api/request-handler', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        router.push("/")
    }

  
    return(
        <>
        <InputOutput edit = {false} setTitle = {setTitle}  setDescription = {setDescription} setMarkdown = {setMarkdown} submitHandler = {submitHandler} markdown = {markdown}/>
        </>
    )
}

export default NewArticle