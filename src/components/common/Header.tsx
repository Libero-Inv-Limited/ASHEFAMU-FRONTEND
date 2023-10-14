import { Box, Container, HStack, Image, Link } from "@chakra-ui/react"
import React from "react"
import { Link as ReactLink } from "react-router-dom"
import logo from "../../assets/logo.png"

interface HeaderProps { }
const Header: React.FC<HeaderProps> = () => {
  return (
    <Box as={"header"} py={6}>
      <Container maxW={"container.lg"}>
        <HStack justifyContent={"flex-end"}>
          <Link as={ReactLink} to={"/"} _hover={{ textDecor: "none" }}>
            <Image src={logo} maxW={180} objectFit={"contain"} />
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}

export default Header