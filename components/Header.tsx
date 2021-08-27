import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useUser } from "@auth0/nextjs-auth0";

const Header: React.FC = () => {

  const { user } = useUser();
  const { asPath } = useRouter();

  return (
    <nav className="flex flex-row justify-between px-6 py-2 text-gray-700 bg-gray-100 text-lg font-medium shadow-lg border-b border-gray-400">
      <div className="flex">
        <Link href="/" >
          <a
            className={
              asPath === "/" ? "m-4 border-gray-700 border-b-2 hover:text-indigo-500 hover:border-indigo-500" : "m-4 hover:text-indigo-500"
            }
          >
            Home
          </a>
        </Link>
        <Link href="/contributers">
          <a
            className={
              asPath === "/contributers"
                ? "m-4 border-gray-700 border-b-2 hover:text-indigo-500 hover:border-indigo-500"
                : "m-4 hover:text-indigo-500"
            }
          >
            Contributers
          </a>
        </Link>
      </div>
    
      {user && (
        <div className="flex items-cent">
          <Link href="/new-article">
            <a
              className={
                asPath === "/new-article"
                  ? "m-4 border-gray-700 border-b-2 hover:text-indigo-500 hover:border-indigo-500"
                  : "m-4 hover:text-indigo-500"
              }
            >
              Create New Blog
            </a>
          </Link>
          <Link href="/my-contributions">
            <a
              className={
                asPath === "/my-contributions"
                  ? "m-4 border-gray-700 border-b-2 hover:text-indigo-500 hover:border-indigo-500"
                  : "m-4 hover:text-indigo-500"
              }
            >
              My Contributions
            </a>
          </Link>
          <div className="mx-4 px-2 bg-gray-300 rounded-xl flex items-center">{user.email}</div>
          <Link href="api/auth/logout">
            <a className = "h-16">
            <img src={user.picture ? user.picture : "/placeholder.jpg"} className = "rounded-full h-16"/>
            <button className= "font-medium text-lg absolute top-4 right-8 text-sm text-center">{!user ? "Log In / Sign Up" : "Logout"}</button>
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
