import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {
    
    return (
    <div className = "h-screen flex flex-col">
    <Header />
        {children}
    <Footer />
    </div>
)}

export default Layout