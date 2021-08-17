import Link from "next/link"
import {useState, useContext} from "react"
import { useRouter } from "next/dist/client/router"
import { AuthContext } from "../authentication/AuthContext"
    

const Header = () => {
    const context = useContext(AuthContext)
   
    const {asPath} = useRouter()
    

    return(
        <nav className = "flex flex-row justify-between p-6">
            <div className = "flex items-center">
            <Link href = "/">
                <a className = {asPath === "/" ? "m-4 border-gray-700 border-b-4" : "m-4"}>Home</a>
            </Link>
            <Link href = "/Contributers">
                <a className = {asPath === "/Contributers" ? "m-4 border-gray-700 border-b-4" : "m-4"}>Contributers</a>
            </Link>
            </div>
            { !context.user &&
            <div className = "m-4">
                <button onClick = {context.login}>
                    Sign In / Login
                </button>
            </div>
            }
            { context.user &&
            <div className = "flex items-center">
                <Link href = "/NewBlog">
                <a className = {asPath === "/NewBlog" ? "m-4 border-gray-700 border-b-4" : "m-4"}>Create New Blog</a>
                </Link>
                <Link href = "/MyContributions">
                <a className = {asPath === "/MyContributions" ? "m-4 border-gray-700 border-b-4" : "m-4"}>My Contributions</a>
                </Link>
                <div className = "mx-4 px-2 bg-gray-300 rounded">{context.user}</div>
                <button onClick = {context.logout}>
                    Logout
                </button>
            </div>
            }
        </nav>
    )

}

export default Header