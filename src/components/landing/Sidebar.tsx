import { Drawer, DrawerBody, Link as ChakraLink, DrawerContent, DrawerOverlay, HStack, Icon, IconButton, VStack, Stack } from "@chakra-ui/react"
import React from "react"
import { RxCross1 } from "react-icons/rx"
import { headerLinks } from "../../utils/data";
import { Link } from "react-router-dom"
import CustomButton from "../common/CustomButton";
import ROUTES from "../../utils/routeNames";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody flex={1} as={Stack}>
          <HStack justifyContent={"flex-end"}>
            <IconButton
              variant={"ghost"}
              aria-label="close-menu"
              onClick={onClose}
              icon={<Icon as={RxCross1} fontSize={"xl"} />}
            />
          </HStack>

          <VStack flex={1} justifyContent={"center"} alignItems={"center"}>
            {headerLinks.map(link => (
              <ChakraLink _hover={{ color: "brand.600" }} p={2} textAlign={"center"} fontWeight={"600"} as={Link} to={link.link}>
                {link.name}
              </ChakraLink>
            ))}
            <CustomButton mt={2} as={Link} to={ROUTES.REGISTER_ROUTE} w={150} variant={"outline"} rounded={"full"} fontSize={"md"} fontWeight={"600"}>Register</CustomButton>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar