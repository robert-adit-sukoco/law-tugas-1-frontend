import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    white: '#FFFFFF'
  },
  styles: {
    global: {
      body: {
        color: "black",
      },
    },
  },
})

export default theme