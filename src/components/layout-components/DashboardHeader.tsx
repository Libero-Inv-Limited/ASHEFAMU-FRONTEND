import { Avatar, Box, Container, HStack, Heading, Icon, IconButton, Spacer, Stack, Text } from "@chakra-ui/react"
import React from "react"
import BreadCrumbs from "./BreadCrumbs"
import { DARK, LIGHT_GRAY, TEXT_DARK_GRAY } from "../../utils/color"
import { useLocation, useParams } from "react-router-dom"
import { HiOutlineMenuAlt1 } from "react-icons/hi"

interface DashboardHeaderProps { 
  onOpen: () => void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpen }) => {
  const { pathname } = useLocation()
  const isFacility = useParams()?.['name']
  const name = pathname.split("/").reverse()[0] || "Dashboard"

  return (
    <Box py={3} bg={"white"} minH={"90px"} borderBottom={"1px solid " + LIGHT_GRAY}>
      <HStack as={Container} maxW={"container.xl"} spacing={3}>
      <IconButton display={['block', 'block', 'none']} variant={"ghost"} onClick={onOpen} aria-label='Menu' icon={<Icon fontSize={"24px"} as={HiOutlineMenuAlt1}  />} />
        <Stack spacing={2}>
          {
            isFacility ?
              <Box h={"4px"} bgColor={DARK} mt={3} w={"25px"} /> :
              <Heading noOfLines={1} fontSize={"2xl"} color={DARK} textTransform={"uppercase"}>{name}</Heading>
          }
          <BreadCrumbs />
        </Stack>

        <Spacer />

        <HStack alignItems={"center"}>
          <Stack spacing={0} textAlign={"right"} display={["none", "none", "flex"]}>
            <Heading size="sm" color={DARK} fontFamily={"heading"}>Chiaza Okoli</Heading>
            <Text color={TEXT_DARK_GRAY}>smart.okolichiaza@gmail.com</Text>
          </Stack>
          <Avatar size={"lg"} name="Chiaza Okoli" />
        </HStack>
      </HStack>
    </Box>
  )
}

export default DashboardHeader