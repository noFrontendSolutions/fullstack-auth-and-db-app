import { AuthContext } from "../authentication/AuthContext"
import { useContext } from "react"

const NewBlog = () => {
    const context = useContext(AuthContext)
  

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
                    <input className = "border p-2" placeholder="Start Here..."></input>
                    <label htmlFor="textarea" >Content</label>
                    <textarea placeholder="Start Here..." className = "border h-96 p-2" ></textarea>
                </form>
                <button className = "my-2 p-2 border-2 rounded full bg-red-400 text-gray-700 font-bold">SUBMIT!</button>
                </div>
            }
        </div>
    )
}

export default NewBlog