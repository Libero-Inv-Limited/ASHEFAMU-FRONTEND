import { HStack, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom"
import { LIGHT_BLUE, TEXT_DARK_GRAY } from "../../utils/color";

interface SecondarySidebarItemProps {
  name: string;
  link: string;
  icon: IconType;
}
const SecondarySidebarItem: React.FC<SecondarySidebarItemProps> = (prop) => {
  const { pathname } = useLocation()
  const isActive = pathname.toLowerCase().includes(prop.link.toLowerCase())
  return (
    <HStack bg={isActive ? LIGHT_BLUE : ""} rounded={"sm"} to={prop.link} _hover={{ bg: !isActive && "gray.100" }} color={isActive ? "primary.500" : TEXT_DARK_GRAY }  spacing={2} as={Link} alignItems={"center"} p={3} h={"40px"}>
      <Icon as={prop.icon} color={"inherit"} fontSize={"24px"} />
      <Text textTransform={"capitalize"} color={"inherit"} fontWeight={isActive ? "700" : "500"} fontSize={"sm"}>{prop.name}</Text>
    </HStack>
  )
}

export default SecondarySidebarItem