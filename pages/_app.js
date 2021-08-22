import 'tailwindcss/tailwind.css'
import Layout from "../components/Layout"
import {AuthContextProvider} from "../authentication/AuthContext"
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
   
    <AuthContextProvider>
      <UserProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
      </UserProvider>
    </AuthContextProvider>
  )
}

export default MyApp