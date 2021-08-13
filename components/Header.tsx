import Link from "next/link"

const Header = () => {

    return(
        <nav className = "object-top">
            <Link href = "/">
                <a>Home</a>
            </Link>
            <Link href = "/Contributers">
                <a>Contributers</a>
            </Link>

        </nav>
    )

}

export default Header