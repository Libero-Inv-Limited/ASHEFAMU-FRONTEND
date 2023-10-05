import { Box, Container, SimpleGrid } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import authBg from "../../assets/auth-bg.png"
import Header from "../common/Header";

interface AuthLayoutProps { 
  children?: ReactNode;
  smaller?: boolean;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children, smaller }) => {  
  return (
    <SimpleGrid columns={[3, 3, 5]} h={"100vh"} w={"full"} overflow={"hidden"}>
      <Box display={["none", "none", "block"]} gridColumn={[0, 0, "span 2"]} bg={"brand.800"} bgImage={`url(${authBg})`} bgSize={"cover"}></Box>
      <Box gridColumn={"span 3"} overflowY={"auto"}>
        <Header />
        <Container pt={16} ml={["auto", "auto", 16]} maxW={smaller ? "sm": "lg"}>{ children }</Container>
      </Box>
    </SimpleGrid>
  )
}

export default AuthLayout