import { ChakraProvider } from "@chakra-ui/react"
import Footer from "./../components/Footer"
import "./../styles/globals.css"
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
