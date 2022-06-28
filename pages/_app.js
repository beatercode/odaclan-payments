import { ChakraProvider } from "@chakra-ui/react"
import Footer from "./../components/Footer"
import "./../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider style={{ backgroundColor: "#1A202C !important" }}>
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
