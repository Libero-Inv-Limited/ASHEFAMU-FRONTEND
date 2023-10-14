
import { Box, Container, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import React from "react"
import speed from "../../assets/landing-icon/speed.png"
import img from "../../assets/section2.png"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color"


interface SpeedSectionProps { }
const SpeedSection: React.FC<SpeedSectionProps> = () => {
  return (
    <Box as={"section"} pb={[20, 28, 32, 40]} pt={0}>
      <Flex as={Container} maxW={"container.lg"} gap={6} flexDir={['column-reverse', 'column-reverse', 'row']}>
        <Box flex={1} pos={"relative"} minH={400}>
          <Image pos={"absolute"} maxW={[500, 600, 600, 700]} src={img} left={[-6, -6, -12]} bottom={["unset", "unset", -40]} top={[0, 0, "unset"]} />
        </Box>
        <Stack spacing={4} maxW={350}>
          <div data-aos="fade-in">
            <Image src={speed} maxW={"70px"} />
          </div>
          <div data-aos="fade-up">
            <Heading color={DARK} size={"md"}>Convenience and Speed</Heading>
          </div>
          <div data-aos="fade-up" data-aos-delay={50}>
            <Text color={TEXT_DARK_GRAY}>From the convenience of your office and a computer, a complete registration can be done in a few minutes!</Text>
          </div>
        </Stack>
      </Flex>
    </Box>
  )
}

export default SpeedSection