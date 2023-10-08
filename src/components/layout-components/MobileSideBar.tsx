import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react"
import React from "react"
import SideNavigation from "./SideNavigation";

interface MobileSideBarProps { 
  isOpen: boolean;
  onClose: () => void;
}
const MobileSideBar: React.FC<MobileSideBarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent minW={"fit-content"} maxW={"fit-content"}>
       <SideNavigation />
      </DrawerContent>
    </Drawer>
  )
}

export default MobileSideBar