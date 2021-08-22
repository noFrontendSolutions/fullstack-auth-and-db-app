import Link from "next/link"
import {useContext} from "react"
import { useRouter } from "next/dist/client/router"
import { useUser } from '@auth0/nextjs-auth0'
    

const Header = () => {
    const {user} = useUser()
   
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
            { !user &&
            <div className = "m-4">
                <Link href = "api/auth/login">
                <button>
                    Sign In / Login
                </button>
                </Link>
            </div>
            }
            { user &&
            <div className = "flex items-center">
                <Link href = "/NewArticle">
                <a className = {asPath === "/NewBlog" ? "m-4 border-gray-700 border-b-4" : "m-4"}>Create New Blog</a>
                </Link>
                <Link href = "/MyContributions">
                <a className = {asPath === "/MyContributions" ? "m-4 border-gray-700 border-b-4" : "m-4"}>My Contributions</a>
                </Link>
                <div className = "mx-4 px-2 bg-gray-300 rounded">{user.email}</div>
                <Link href = "api/auth/logout">
                    <button>
                    Logout
                    </button>
                </Link>
            </div>
            }
        </nav>
    )

}

export default Header