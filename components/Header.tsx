import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import DropDown from "./DropDown";

const Header: React.FC = () => {
  const [dropDown, setDropDown] = useState(false);

  const { user } = useUser();
  const { asPath } = useRouter();

  return (
    <>
    {dropDown &&
        <div className = "inset-0 fixed z-40 opacity-0" onClick = {() => setDropDown(false)}></div>
    }
    <nav className="mb-4 sm:mb-8 flex flex-row justify-between items-center px-2 py-2 sm:px-6 sm:py-2 text-gray-700 bg-gray-100 text-lg font-medium shadow-lg border-b border-gray-400">
      <div className="flex">
        <Link href="/">
          <a
            className={
              asPath === "/"
                ? "m-4 border-gray-700 border-b-2 hover:text-indigo-500 hover:border-indigo-500"
                : "m-4 hover:text-indigo-500"
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
      {!user && (
        <Link href="api/auth/login">
          <a className="">
              <button className="px-4 py-2 font-medium text-lg text-center border-2 border-gray-300 rounded-xl hover:border-indigo-500 hover:border-2">
                Log In / Sign Up
              </button>
          </a>
        </Link>
      )}
      {user && (
        <div className="flex items-cent">
          <button onClick={() => setDropDown(!dropDown)}>
            <img
              src={user.picture ? user.picture : "/placeholder.jpg"}
              className="rounded-full h-16 border-2 border-gray-300 hover:border-indigo-500"
            />
            {dropDown && (
              <DropDown
                name={user.name ? user.name : ""}
                email={user.email ? user.email : ""}
                picture={user.picture ? user.picture : ""}
              />
            )}
          </button>
        </div>
      )}
    </nav>
    </>
  );
};

export default Header;
