import { Box, Container, HStack, Heading, Link } from "@chakra-ui/react"
import React from "react"
import { Link as ReactLink } from "react-router-dom"

interface HeaderProps { }
const Header: React.FC<HeaderProps> = () => {
  return (
    <Box as={"header"} py={6}>
      <Container maxW={"container.lg"}>
        <HStack justifyContent={"flex-end"}>
          <Link as={ReactLink} to={"/"} _hover={{ textDecor: "none" }}>
            <Heading size={"md"}>ASHEFAMU</Heading>
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}

export default Header