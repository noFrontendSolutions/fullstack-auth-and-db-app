import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import { useUser } from "@auth0/nextjs-auth0";

interface User {
  name: string;
  email: string;
  picture: string;
}

const DropDown = (props: User) => {
  const { asPath } = useRouter();
  const { user } = useUser();

  return (
    <>
    <div className="p-1 mt-1 mr-2 absolute flex flex-col items-start z-50 top-20 right-0 w-96 border rounded-xl bg-gray-100 opacity-90">
      <p className="px-2 text-center text-lg font-bold w-full">
        {user ? user.name : ""}
      </p>
      <p className="text-black mt-2 text-center bg-gray-200 rounded-xl w-full">
        {user ? user.email : ""}
      </p>
      <div className="w-full border-2 mt-8 mb-2"></div>
      <Link href="/new-article">
        <a className="hover:text-indigo-500 hover:bg-gray-200 rounded-xl py-1 px-6 w-full text-left">
          Create New Blog
        </a>
      </Link>
      <Link href="/my-contributions">
        <a className="hover:text-indigo-500 hover:bg-gray-200 rounded-xl py-1 px-6  w-full text-left">
          My Contributions
        </a>
      </Link>
      <div className="w-full border-2 mt-4 mb-8"></div>
      <Link href="api/auth/logout">
        <div className="flex justify-center w-full">
          <a className="h-16">
            <button className="px-4 py-2 font-medium text-lg border-2 border-gray-300 rounded-xl hover:border-indigo-500 hover:border-2 text-center">
              Logout
            </button>
          </a>
        </div>
      </Link>
    </div>
    </>
  );
};

export default DropDown;
