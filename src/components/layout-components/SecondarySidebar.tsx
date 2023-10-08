/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collapse, Flex, Stack } from "@chakra-ui/react"
import React from "react"
import { DARK, LIGHT_GRAY } from "../../utils/color"
import { secondarySidebarContents } from "../../utils/data"
import SecondarySidebarItem from "./SecondarySidebarItem"
import useIsFacility from "../../hooks/useIsFacility"
import { useParams } from "react-router-dom"
import { decodeSlug } from "../../utils/helpers"

interface SecondarySidebarProps {}
const SecondarySidebar: React.FC<SecondarySidebarProps> = () => {
  const { isFacility } = useIsFacility()
  const param = useParams()
  return (
    <Collapse in={isFacility}>
      <Stack w={"250px"} px={3}  borderRight={"1px solid " + LIGHT_GRAY}>
        <Flex textTransform={"capitalize"} alignItems={"center"} fontSize={"md"} fontFamily={"rubik"} color={DARK} fontWeight={600} borderBottom={"1px solid " + LIGHT_GRAY} justifyContent={"center"} minH={"90px"}>
          { decodeSlug((param as any).name!) }
        </Flex>
        <Stack mt={2}>
          { secondarySidebarContents.map(sidebarContents => <SecondarySidebarItem {...sidebarContents} />) }
        </Stack>
      </Stack>
    </Collapse>
  )
}

export default SecondarySidebar