import React, { useState } from "react"
import Sidebar from "../layout-components/Sidebar"
import SecondarySidebar from "../layout-components/SecondarySidebar"
import { Flex } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import FacilityLists from "./FacilityLists"

interface SideNavigationProps {
  onClose?: () => void;
}
const SideNavigation: React.FC<SideNavigationProps> = ({ onClose }) => {
  const param = useParams()
  const [isOpen, setIsOpen] = useState(true)
  
  const onToggle = () => setIsOpen(prev => !prev) 
  const isFacility = !!param.name

  return (
    <Flex h={"full"}>
      <Sidebar isSecondaryBarOpen={isOpen} toggleSecondaryBar={onToggle} onClose={onClose}  />
      {isFacility ? <SecondarySidebar onToggle={onToggle} isOpen={isOpen} /> : <FacilityLists onToggle={onToggle} isOpen={isOpen} />}
    </Flex>
  )
}

export default SideNavigation