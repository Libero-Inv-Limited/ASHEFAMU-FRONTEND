import {  Center, Circle, Icon, Stack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { sidebarContents } from "../../utils/data"
import SidebarItem from "./SidebarItem"
import {PiBookOpenTextLight} from "react-icons/pi"
import { LIGHT_GRAY, TEXT_DARK_GRAY, TEXT_GRAY } from "../../utils/color"
import { Link } from "react-router-dom"

interface SidebarProps { }
const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <Stack h={"full"}  px={2} bg={"white"} borderRight={"1px solid " + LIGHT_GRAY}>
      <Stack mt={"93px"} flex={1} spacing={2} mx={1}>
        {sidebarContents.map(item => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </Stack>
      <VStack as={Link} to={""} mb={10} spacing={"1"}>
        <Center as={Circle} w={"44px"} borderWidth={1} borderColor={LIGHT_GRAY} h={"44px"}>
          <Icon as={PiBookOpenTextLight} fontSize={"24px"} color={TEXT_GRAY} />
        </Center>
        <Text fontSize={"xs"} fontWeight={"medium"} color={TEXT_DARK_GRAY}>Resources</Text>
      </VStack>
    </Stack>
  )
}

export default Sidebar