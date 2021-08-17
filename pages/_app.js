import 'tailwindcss/tailwind.css'
import Layout from "../components/Layout"
import {AuthContextProvider} from "../authentication/AuthContext"

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}

export default MyApp