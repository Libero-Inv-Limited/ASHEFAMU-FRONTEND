import fonts from "./fonts";
import colors from "./colors";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({ ...fonts, ...colors })

export default customTheme