/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Container,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import BreadCrumbs from "./BreadCrumbs";
import {
  DARK,
  LIGHT_GRAY,
  LIGHT_GREEN,
  TEXT_DARK_GRAY,
  TEXT_GRAY,
} from "../../utils/color";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { decodeSlug } from "../../utils/helpers";
import { useAppSelector } from "../../store/hook";
import { useAppContext } from "../../contexts/AppContext";
import LogoutModal from "../modals/LogoutModal";
import ROUTES from "../../utils/routeNames";
import { BsArrowLeft } from "react-icons/bs";

interface DashboardHeaderProps {
  onOpen: () => void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpen }) => {
  const { pathname } = useLocation();
  const isFacility = useParams()?.["name"];
  const isEditing = useParams()?.["facility"];
  const name = pathname.split("/").reverse()[0] || "Dashboard";
  const user = useAppSelector((state) => state.accountStore.user);
  const { logoutAccount, setCurrentFacility } = useAppContext();
  const { isOpen, onClose, onOpen: openLogoutModal } = useDisclosure();
  const navigate = useNavigate();
  const isUserManagement = !!useParams()?.["user"];
  console.log({ isUserManagement });

  if (!user || !Object.keys(user).length) {
    logoutAccount();
    return <Navigate to={ROUTES.LOGIN_ROUTE} replace />;
  }

  const fullname = user!.user.firstname + " " + user!.user.lastname;
  console.log("USER:", user);

  const cancelEditing = () => {
    setCurrentFacility(null);
    navigate(ROUTES.FACILITY_ROUTE, { replace: true });
  };

  return (
    <Box
      py={3}
      bg={"white"}
      minH={"90px"}
      borderBottom={"1px solid " + LIGHT_GRAY}
    >
      <HStack
        as={Container}
        alignItems={"center"}
        maxW={"container.xl"}
        spacing={3}
      >
        <IconButton
          display={["block", "block", "block", "none"]}
          variant={"ghost"}
          onClick={onOpen}
          aria-label="Menu"
          icon={<Icon fontSize={"24px"} as={HiOutlineMenuAlt1} />}
        />
        <Stack spacing={[1, 1, 2]}>
          {isFacility ? (
            <Box h={"4px"} bgColor={DARK} mt={3} w={"25px"} />
          ) : isEditing ? (
            <HStack>
              <IconButton
                aria-label="back"
                size={"sm"}
                variant={"ghost"}
                onClick={cancelEditing}
                icon={
                  <Icon
                    as={BsArrowLeft}
                    fontSize={"xl"}
                    color={TEXT_DARK_GRAY}
                  />
                }
              />
              <Heading
                noOfLines={1}
                fontSize={["xl", "xl", "2xl"]}
                color={DARK}
                textTransform={"uppercase"}
              >
                Editing{" "}
                <span style={{ color: TEXT_GRAY }}>
                  {" "}
                  {decodeSlug(isEditing)}
                </span>{" "}
              </Heading>
            </HStack>
          ) : (
            <Heading
              noOfLines={1}
              fontSize={["xl", "xl", "2xl"]}
              color={DARK}
              textTransform={"uppercase"}
            >
              {isUserManagement ? "USER MANAGEMENT" : decodeSlug(name)}
            </Heading>
          )}
          <BreadCrumbs />
        </Stack>

        <Spacer />
        <Menu>
          <MenuButton>
            <HStack alignItems={"center"}>
              <Stack
                spacing={0}
                textAlign={"right"}
                display={["none", "none", "flex", "flex"]}
              >
                <Heading size="sm" color={DARK} fontFamily={"heading"}>
                  {fullname}
                </Heading>
                <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>
                  {user?.user.email}
                </Text>
              </Stack>
              <Avatar h={"60px"} w={"60px"} name={fullname} />
            </HStack>
          </MenuButton>

          <MenuList pt={0}>
            <Stack spacing={0} bg={LIGHT_GRAY} p={3}>
              <Text
                fontSize={".7rem"}
                textTransform={"uppercase"}
                fontWeight={"500"}
                color={TEXT_GRAY}
                fontFamily={"rubik"}
              >
                User Role:
              </Text>
              <Text fontSize={"sm"} fontFamily={"rubik"} color={"primary.600"}>
                {user.user.userRole?.roleDetails?.name}
              </Text>
            </Stack>
            <MenuItem
              _hover={{ bg: LIGHT_GREEN }}
              onClick={() => navigate(ROUTES.EDIT_PROFILE)}
              py={3}
            >
              <Text fontSize={"sm"} color={DARK}>
                Edit profile
              </Text>
            </MenuItem>

            <MenuItem
              _hover={{ bg: LIGHT_GREEN }}
              onClick={openLogoutModal}
              py={3}
            >
              <Text fontSize={"sm"} color={DARK}>
                Logout
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* LOGOUT MODAL */}
      <LogoutModal
        isOpen={isOpen}
        onClose={onClose}
        handleAction={logoutAccount}
      />
    </Box>
  );
};

export default DashboardHeader;
