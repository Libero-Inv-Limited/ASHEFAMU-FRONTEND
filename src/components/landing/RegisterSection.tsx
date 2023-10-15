import { Box, Container, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import React from "react"
import computer from "../../assets/landing-icon/computer.png"
import img from "../../assets/section1.png"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color"

interface RegisterSectionProps { }
const RegisterSection: React.FC<RegisterSectionProps> = () => {
  return (
    <Box as={"section"} py={[20, 28, 32, 40]}>
      <Flex as={Container} maxW={"container.lg"} gap={6} flexDir={['column', 'column', 'row']}>
        <Stack spacing={4} maxW={350}>
          <div data-aos="fade-in">
            <Image src={computer} maxW={"70px"} />
          </div>
          <div data-aos="fade-up">
            <Heading color={DARK} size={"md"}>Registration and Renewal</Heading>
          </div>
          <div data-aos="fade-up" data-aos-delay={50}>
            <Text color={TEXT_DARK_GRAY}>Operators of Healthcare facilites in Anambra state are by law required to register to operate their facilities every year.</Text>
          </div>
        </Stack>
        <Box flex={1} pos={"relative"} minH={400}>
          <Image pos={"absolute"} maxW={[700, 700, 800]} src={img} left={[-20, -16]} bottom={0} />
        </Box>
      </Flex>
    </Box>
  )
}

export default RegisterSection