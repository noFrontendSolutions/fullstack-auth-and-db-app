import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/dist/next-server/lib/router/router";


interface Article {
  _id: string
  author: string
  title: string
  description: string
  date: string
  markdown: string
  imageUrl: string
}


function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <UserProvider>
        <Layout>
         <Component {...pageProps} />
       </Layout>
    </UserProvider>
  );
}

export default MyApp;
