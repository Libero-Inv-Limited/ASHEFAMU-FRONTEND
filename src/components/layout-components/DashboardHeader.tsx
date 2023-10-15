import { Avatar, Box, Container, HStack, Heading, Icon, IconButton, Spacer, Stack, Text } from "@chakra-ui/react"
import React from "react"
import BreadCrumbs from "./BreadCrumbs"
import { DARK, LIGHT_GRAY, TEXT_DARK_GRAY } from "../../utils/color"
import { useLocation, useParams } from "react-router-dom"
import { HiOutlineMenuAlt1 } from "react-icons/hi"
import { decodeSlug } from "../../utils/helpers"
import { useAppSelector } from "../../store/hook"

interface DashboardHeaderProps { 
  onOpen: () => void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpen }) => {
  const { pathname } = useLocation()
  const isFacility = useParams()?.['name']
  const name = pathname.split("/").reverse()[0] || "Dashboard"
  const user = useAppSelector(state => state.accountStore.user)

  const fullname = user!.user.firstname + " " + user!.user.lastname

  return (
    <Box py={3} bg={"white"} minH={"90px"} borderBottom={"1px solid " + LIGHT_GRAY}>
      <HStack as={Container} alignItems={"center"} maxW={"container.xl"} spacing={3}>
      <IconButton display={['block', 'block', 'block', 'none']} variant={"ghost"} onClick={onOpen} aria-label='Menu' icon={<Icon fontSize={"24px"} as={HiOutlineMenuAlt1}  />} />
        <Stack spacing={[1, 1, 2]}>
          {
            isFacility ?
              <Box h={"4px"} bgColor={DARK} mt={3} w={"25px"} /> :
              <Heading noOfLines={1} fontSize={["xl", "xl", "2xl"]} color={DARK} textTransform={"uppercase"}>{decodeSlug(name)}</Heading>
          }
          <BreadCrumbs />
        </Stack>

        <Spacer />

        <HStack alignItems={"center"}>
          <Stack spacing={0} textAlign={"right"} display={["none", "none", "flex", 'flex']}>
            <Heading size="sm" color={DARK} fontFamily={"heading"}>{fullname}</Heading>
            <Text color={TEXT_DARK_GRAY}>{user?.user.email}</Text>
          </Stack>
          <Avatar size={["md", "md", "lg"]} name={fullname} />
        </HStack>
      </HStack>
    </Box>
  )
}

export default DashboardHeader