import { ChakraProvider } from "@chakra-ui/react"
import Footer from "./../components/Footer"
import "./../styles/globals.css"
import theme from "../libs/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
