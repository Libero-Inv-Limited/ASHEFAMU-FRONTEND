import {
  Center,
  Circle,
  CloseButton,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { sidebarContents } from "../../utils/data";
import SidebarItem from "./SidebarItem";
import { PiBookOpenTextLight } from "react-icons/pi";
import { LIGHT_GRAY, TEXT_DARK_GRAY, TEXT_GRAY } from "../../utils/color";
import { Link } from "react-router-dom";
import SidebarToggleIcon from "../common/SidebarToggleIcon";
import { useAppSelector } from "../../store/hook";

interface SidebarProps {
  onClose?: () => void;
  toggleSecondaryBar: () => void;
  isSecondaryBarOpen: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({
  onClose,
  toggleSecondaryBar,
  isSecondaryBarOpen,
}) => {
  const user = useAppSelector((state) => state.accountStore.user);
  const filteredPaths = sidebarContents.filter((item) => {
    return (
      user.user.userRole.roleDetails.name === "Super Admin" ||
      ![
        "users",
        "roles",
        "permissions",
        "analytics",
        "audits and compliance",
        "payments",
      ].includes(item.name)
    );
  });

  const userPermissions = useAppSelector(
    (state) => state.accountStore.user.permissions
  );

  console.log({ userPermissions, sidebarContents });

  const filteredPathss = sidebarContents.filter((item) => {
    // Check if the item belongs to a category that corresponds to user permissions
    if (
      item.name === "dashboard" ||
      item.name === "facilities" ||
      item.name === "payments" ||
      item.name === "analytics" ||
      item.name === "notifications" ||
      item.name === "users" ||
      item.name === "roles" ||
      item.name === "permissions" ||
      item.name === "settings"
    ) {
      // Loop through permissions to find any permission related to this category
      return userPermissions.some((permission) =>
        permission.toLowerCase().includes(item.name.toLowerCase())
      );
    }
    // If the item is not related to user management, include it in the filteredPaths
    return true;
  });

  console.log({ filteredPaths });

  return (
    <Stack
      h={"full"}
      px={2}
      bg={"white"}
      borderRight={"1px solid " + LIGHT_GRAY}
    >
      <Center pt={4} display={["flex", "flex", "none"]}>
        <CloseButton size={"lg"} onClick={onClose} />
      </Center>
      <Stack mt={[10, 10, "93px"]} flex={1} spacing={2} mx={1}>
        {filteredPaths.map((item, index) => (
          <SidebarItem key={`sidebar-${item.name}-${index}`} {...item} />
        ))}
      </Stack>
      {!isSecondaryBarOpen && (
        <VStack mb={4}>
          <Tooltip label="Open Secondary Nav">
            <IconButton
              onClick={toggleSecondaryBar}
              aria-label="toggle"
              variant={"unstyled"}
              p={0}
              px={2}
              width={"fit-content"}
              shadow={"lg"}
              size={"xs"}
              rounded={"full"}
              icon={<SidebarToggleIcon color={"primary.500"} />}
            />
          </Tooltip>
        </VStack>
      )}
      <VStack as={Link} to={""} mb={10} spacing={"1"}>
        <Center
          as={Circle}
          w={"44px"}
          borderWidth={1}
          borderColor={LIGHT_GRAY}
          h={"44px"}
        >
          <Icon as={PiBookOpenTextLight} fontSize={"24px"} color={TEXT_GRAY} />
        </Center>
        <Text fontSize={"xs"} fontWeight={"medium"} color={TEXT_DARK_GRAY}>
          Resources
        </Text>
      </VStack>
    </Stack>
  );
};

export default Sidebar;
