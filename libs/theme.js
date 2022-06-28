import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props) => ({
        body: {
            bg: mode("#1A202C", "#1A202C")(props),
            color: mode("#ffffff", "#ffffff")(props),
        },
    }),
};

const colors = {
    primary: "#1A202C",
};

const theme = extendTheme({ styles, colors });
export default theme;