import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react"

interface ServiceCardProps {
  title: string;
  icon: string;
  color: string;
  text: string;
  isBigger?: boolean;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ color, title, isBigger, text, icon }) => {
  return (
    <Stack boxShadow={"0px 10px 70px 0px rgba(64, 78, 205, 0.20)"} transform={["none", "none", `${isBigger ? "scale3d(1.05, 1.05, 1.05)" : "none"}`]} rounded={"md"} p={6} bg={color} spacing={4}>
      <Image src={icon} maxW={"60px"} />
      <Heading size={"md"} color={"white"}>{title}</Heading>
      <Text lineHeight={"27px"} color={"white"}>{text}</Text>
    </Stack>
  )
}

export default ServiceCard