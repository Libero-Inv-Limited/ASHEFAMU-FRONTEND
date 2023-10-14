import { Box, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color"
import bg from "../../assets/footer.png"

interface ContactSectionProps { }
const ContactSection: React.FC<ContactSectionProps> = () => {
  return (
    <Box py={20} as={"section"} id="contact" bgImage={`url(${bg})`} bgSize={"cover"} bgPos={"center"}>
      <VStack as={Container} maxW={"container.sm"}>
        <div data-aos="fade-in">
          <Heading color={DARK} fontWeight={"900"} size={"md"}>CONTACT ASHEFAMU</Heading>
        </div>
        <div data-aos="fade-up" data-aos-delay="50">
          <Text color={TEXT_DARK_GRAY} textAlign={"center"} fontSize={"sm"}>Do you have any questions regarding the ASHEFAMU platform? <br /> Feel free to reach us out here</Text>
        </div>


        <Stack p={6} bg={"white"} mt={8} spacing={6} w={"full"} shadow={"xl"} maxW={500} rounded={"md"}>
          <Stack spacing={4}>
            <Heading color={"brand.500"} fontSize={"sm"}>Address</Heading>
            <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>123 Health Street, Onitsha, Anambra State, Nigeria. </Text>
          </Stack>

          <Stack spacing={4}>
            <Heading color={"brand.500"} fontSize={"sm"}>Phone</Heading>
            <Stack spacing={2}>
              <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>+234 812 555 6788</Text>
              <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>+234 812 555 6788</Text>
              <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>+234 812 555 6788</Text>
              <Text color={TEXT_DARK_GRAY} fontSize={"sm"}>+234 812 555 6788</Text>
            </Stack>
          </Stack>
        </Stack>
      </VStack>
    </Box>
  )
}

export default ContactSection