import { Box, Container, HStack, Icon, IconButton, Text } from "@chakra-ui/react"
import React from "react"
import { socialLinks } from "../../utils/data"

interface FooterProps { }
const Footer: React.FC<FooterProps> = () => {
  return (
    <Box as={"footer"} py={4} bg={"#001209"}>
      <HStack as={Container} maxW={"container.lg"} flexWrap={"wrap"} spacing={4}>
        <Text minW={400} flex={"1"} fontSize={"sm"} color={"rgba(255, 255, 255, 0.70)"}>{(new Date()).getFullYear()} ASHEFAMU - Health Facilities Monitoring and Accreditaion Agency. All Rights Reserved</Text>
        <HStack>
          {socialLinks.map((link, index) => (
            <IconButton
              key={`social-icon-${index}`}
              aria-label="social-icon"
              colorScheme="brand"
              rounded={"full"}
              bg={"rgba(255, 255, 255, 0.20)"}
              icon={<Icon fontSize={"xl"} color={"white"} as={link.icon} />}
            />
          ))}
        </HStack>
      </HStack>
    </Box>
  )
}

export default Footer