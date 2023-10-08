import { Link, Center, Icon, Popover, PopoverTrigger, Portal, PopoverContent, PopoverBody } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons";
import { Link as ReactLink, useLocation } from "react-router-dom"
import { LIGHT_GREEN, TEXT_GRAY } from "../../utils/color";

interface SidebarItemProps {
  name: string;
  link: string;
  icon: IconType;
  activeIcon: IconType;
}
const SidebarItem: React.FC<SidebarItemProps> = (item) => {
  const { pathname } = useLocation()
  const isActive = pathname.toLowerCase().includes(item.name.toLowerCase())

  return (
    <Popover placement="right" strategy="absolute" trigger="hover">
      <PopoverTrigger>
        <Link as={ReactLink} _hover={{ color: !isActive && "brand.500" }} color={isActive ? "white" : TEXT_GRAY} to={item.link}>
          <Center w={"44px"} rounded={"sm"} h={"44px"} _hover={{ bg: !isActive && LIGHT_GREEN }} bg={isActive ? "linear-gradient(180deg, #26D9A3 0%, #1B9393 100%)" : ""}>
            <Icon as={isActive ? item.activeIcon : item.icon} color={"inherit"} fontSize={"24"} />
          </Center>
        </Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent display={["none", "none", "block"]} borderWidth={2} w={"fit-content"} borderColor={"brand.500"} bg={"white"}>
          <PopoverBody textTransform={"capitalize"} color={TEXT_GRAY}  rounded={"sm"}>
            { item.name }
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default SidebarItem