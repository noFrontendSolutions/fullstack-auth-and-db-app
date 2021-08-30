import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/dist/next-server/lib/router/router";
import {createContext} from "react"

interface Article {
  _id: string
  author: string
  title: string
  description: string
  date: string
  markdown: string
  imageUrl: string
}

let articles: Article[] = []
const DataContext = createContext(articles)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <DataContext.Provider value = {articles}>
        <Layout>
         <Component {...pageProps} />
       </Layout>
      </DataContext.Provider>
    </UserProvider>
  );
}

export default MyApp;
