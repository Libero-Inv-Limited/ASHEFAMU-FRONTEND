/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import DashboardHeader from "../layout-components/DashboardHeader";
import SideNavigation from "../layout-components/SideNavigation";
import { useTheme } from "@emotion/react";
import MobileSideBar from "../layout-components/MobileSideBar";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const data = useTheme()
  const [isMobile] = useMediaQuery(`(max-width: ${(data as any).sizes?.container?.sm})`)
  const { isOpen, onClose, onOpen } = useDisclosure()
  return (
    <Flex h={"100vh"}>
      {isMobile ? <MobileSideBar isOpen={isOpen} onClose={onClose} /> : <SideNavigation />}
      <Box flex={1} bg={"#F4F7F4"} >
        <DashboardHeader onOpen={onOpen} />
        <Container pt={10} maxW={"container.xl"}>{children}</Container>
      </Box>
    </Flex>
  )
}

export default DashboardLayout