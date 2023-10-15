import React, { ReactNode } from "react"
import { Heading, Stack, VStack, Image, Center, Container } from "@chakra-ui/react"
import checkIcon from "../../assets/icons/check.png"
import Header from "../common/Header"


interface SuccessLayoutProps {
  title: string;
  children?: ReactNode;
}
const SuccessLayout: React.FC<SuccessLayoutProps> = ({ title, children }) => {
  return (
    <Stack h={"100vh"}>
      <Header />
      <Center flex={1} >
        <Container maxW={"sm"}>
          <Stack spacing={4}>
            <VStack spacing={4}>
              <Image src={checkIcon} maxW={16} objectFit={"contain"} />
              <Heading mt={2} size={"md"}>{title}</Heading>
              {children}
            </VStack>
          </Stack>
        </Container>
      </Center>
    </Stack>
  )
}

export default SuccessLayout