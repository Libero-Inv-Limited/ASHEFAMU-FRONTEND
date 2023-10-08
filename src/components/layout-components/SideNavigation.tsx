import React from "react"
import Sidebar from "../layout-components/Sidebar"
import SecondarySidebar from "../layout-components/SecondarySidebar"
import { Flex } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import FacilityLists from "./FacilityLists"

interface SideNavigationProps {}
const SideNavigation: React.FC<SideNavigationProps> = () => {
  const param = useParams()
  const isFacility = !!param.name
  return (
    <Flex h={"full"}>
      <Sidebar />
      {isFacility ? <SecondarySidebar /> : <FacilityLists />}
    </Flex>
  )
}

export default SideNavigation