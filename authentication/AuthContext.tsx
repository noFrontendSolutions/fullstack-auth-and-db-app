import {createContext, useState, useEffect} from "react"
import { USERS } from "../dummy-data/dummy-data";

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authenticated: false
})

const AuthContextProvider = ({children}) => {
    
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