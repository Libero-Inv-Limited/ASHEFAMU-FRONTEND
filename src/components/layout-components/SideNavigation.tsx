import React from "react"
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
  const isFacility = !!param.name
  return (
    <Flex h={"full"}>
      <Sidebar onClose={onClose} />
      {isFacility ? <SecondarySidebar /> : <FacilityLists />}
    </Flex>
  )
}

export default SideNavigation