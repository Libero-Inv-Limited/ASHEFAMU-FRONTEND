/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collapse, Flex, IconButton, Stack, VStack } from "@chakra-ui/react"
import React from "react"
import { DARK, LIGHT_GRAY } from "../../utils/color"
import { secondarySidebarContents } from "../../utils/data"
import SecondarySidebarItem from "./SecondarySidebarItem"
import useIsFacility from "../../hooks/useIsFacility"
import { useParams } from "react-router-dom"
import { decodeSlug } from "../../utils/helpers"
import SidebarToggleIcon from "../common/SidebarToggleIcon"

interface SecondarySidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}
const SecondarySidebar: React.FC<SecondarySidebarProps> = ({ isOpen, onToggle }) => {
  const { isFacility } = useIsFacility()
  const param = useParams()

  return (
    <Collapse in={isFacility && isOpen}>
      <Stack h={"full"} w={"250px"} px={3} pos={"relative"} borderRight={"1px solid " + LIGHT_GRAY}>
        <Flex textTransform={"capitalize"} alignItems={"center"} fontSize={"md"} fontFamily={"rubik"} color={DARK} fontWeight={600} borderBottom={"1px solid " + LIGHT_GRAY} justifyContent={"center"} minH={"90px"}>
          {decodeSlug((param as any).name!)}
        </Flex>
        <Stack mt={2}>
          {secondarySidebarContents.map((sidebarContents, index) => (
            <SecondarySidebarItem key={`secondary-sidebar-${sidebarContents.name}-${index}`} {...sidebarContents} />
          ))}
        </Stack>

        {isOpen && (
          <VStack pos={"absolute"} zIndex={40} right={0} bottom={10}>
            <IconButton
              onClick={onToggle}
              aria-label="toggle"
              variant={"unstyled"}
              px={0} py={4}
              display={"flex"} alignItems={"center"}
              width={"fit-content"}
              shadow={"lg"}
              size={"xs"} rounded={"full"}
              icon={<SidebarToggleIcon vertical color={"primary.500"} />}
            />
          </VStack>
        )}
      </Stack>
    </Collapse>
  )
}

export default SecondarySidebar