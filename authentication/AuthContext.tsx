import {createContext, useState, useEffect} from "react"
import { useRouter } from "next/dist/client/router"

const AuthContext = createContext({
    user: "",
    login: ():void => {},
    logout: ():void  => {},
    authenticated: false
})

const AuthContextProvider = ({children}: any) => {
    const router = useRouter()
    
    const [user, setUser] = useState("")

    useEffect(() => {
        //if you use Netlify uncomment line below
        //netlifyIdentity.init()
    }, [])

    const login = () => {
        //only temporary, of course
        setUser("b.welzel81@gmail.com")
    }

    const logout = () => {
        setUser("")
        router.push("./")
    }

    const authenticated = false

    const context = {user, login, logout, authenticated}

    return (
        <AuthContext.Provider value = {context}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}