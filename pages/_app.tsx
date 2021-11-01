import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useState} from "react"
import { QueryClient, QueryClientProvider } from 'react-query'

interface Article {
  _id: string
  author: string
  title: string
  description: string
  date: string
  markdown: string
  imageUrl: string
}

//let articles: Article[] = []
const queryClient = new QueryClient()
//context provider obviously does nothing at the moment...Might come back to it later!


function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      
        <Layout>
         <Component {...pageProps} />
       </Layout>
      
    </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
