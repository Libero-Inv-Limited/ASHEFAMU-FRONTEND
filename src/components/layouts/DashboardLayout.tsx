/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Flex, Stack, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import React, { ReactNode, useEffect, useRef } from "react"
import DashboardHeader from "../layout-components/DashboardHeader";
import SideNavigation from "../layout-components/SideNavigation";
import { useTheme } from "@emotion/react";
import MobileSideBar from "../layout-components/MobileSideBar";
import { useAppContext } from "../../contexts/AppContext";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const data = useTheme()
  const [isMobile] = useMediaQuery(`(max-width: ${(data as any).sizes?.container?.lg})`)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const container = useRef(null)
  const { setContainerWidth } = useAppContext()
  useEffect(() => {
    if(!container.current) return
    console.dir(container.current)
    setContainerWidth((container.current as any).clientWidth)
  }, [container])
  return (
    <Flex h={"100vh"} w={"full"} overflowX={"hidden"}>
      {isMobile ? <MobileSideBar isOpen={isOpen} onClose={onClose} /> : <SideNavigation />}
      <Stack flex={1} bg={"#F4F7F4"} w={"full"} height={"full"} pos={"relative"}>
        <DashboardHeader onOpen={onOpen} />
        <Box flex={1} h={`calc(100vh-93px)`} w={"full"} overflowY={"auto"} >
          <Container ref={container} maxW={"container.xl"} pt={10} w={"full"}>{children}</Container>
        </Box>
      </Stack>
    </Flex>
  )
}

export default DashboardLayout