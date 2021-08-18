import {createContext, useState, useEffect} from "react"
import { useRouter } from "next/dist/client/router"

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authenticated: false
})

const AuthContextProvider = ({children}) => {
    const router = useRouter()
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        //if you use Netlify uncomment line below
        //netlifyIdentity.init()
    }, [])

    const login = () => {
        //only temporary, of course
        setUser("b.welzel81@gmail.com")
    }

    const logout = () => {
        setUser(null)
        router.push("./")
    }

    const authenticated = null

    const context = {user, login, logout, authenticated}

    return (
        <AuthContext.Provider value = {context}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}