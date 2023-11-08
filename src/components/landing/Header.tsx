import { HStack, Image, Link as ChakraLink, Box, Container, IconButton, useDisclosure } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import CustomButton from "../common/CustomButton"
import MenuIcon from "../common/MenuIcon"
import { headerLinks } from "../../utils/data"
import Sidebar from "./Sidebar"
import ROUTES from "../../utils/routeNames"
// import ROUTES from "../../utils/routeNames"

interface HeaderProps { }
const Header: React.FC<HeaderProps> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Box as={"header"} py={4} zIndex={10} pos={"sticky"} top={0} left={0} bg={`rgba(255, 255, 255, .95)`} backdropBlur={"sm"}>
      <HStack as={Container} justifyContent={"space-between"} maxW={"container.xl"} alignItems={"center"}>
        <Link to={"/"}>
          <Image src={logo} alt="logo" maxW={150} />
        </Link>

        <HStack spacing={6} display={['none', 'none', 'flex']}>
          {headerLinks.map((link, index) => (
            <ChakraLink key={index} _hover={{ color: "brand.600" }} p={2} textAlign={"center"} fontWeight={"600"} as={Link} to={link.link}>
              {link.name}
            </ChakraLink>
          ))}
        </HStack>

        <HStack spacing={4}>
          <CustomButton as={Link} to={ROUTES.LOGIN_ROUTE} variant={"outline"} w={150} rounded={"full"} fontSize={"md"} fontWeight={"600"} display={['none', 'none', 'flex']}>Login</CustomButton>
          <CustomButton as={Link} to={ROUTES.REGISTER_ROUTE} w={150} variant={"solid"} rounded={"full"} fontSize={"md"} fontWeight={"600"} display={['none', 'none', 'flex']}>Register</CustomButton>
          <IconButton
            display={['block', 'block', 'none']}
            onClick={onOpen}
            aria-label="menu"
            variant={"ghost"}
            icon={<MenuIcon fontSize={"xl"} />}
          />
        </HStack>
      </HStack>

      <Sidebar isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Header