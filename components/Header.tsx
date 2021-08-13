import Link from "next/link"
import {useState} from "react"

const Header = () => {
    const[user, setUser] = useState(null)
    return(
        <nav className = "flex flex-row justify-between p-6">
            <div>
            <Link href = "/">
                <a className = "m-4">Home</a>
            </Link>
            <Link href = "/Contributers">
                <a className = "m-4" >Contributers</a>
            </Link>
            </div>
            { !user &&
            <div>
                <button onClick = {() => {setUser(!user)}}>
                    Sign In / Login
                </button>
            </div>
            }
            { user &&
            <div>
                <button onClick = {() => {setUser(!user)}}>
                    Logout
                </button>
            </div>
            }
        </nav>
    )

}

export default Header