/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { LIGHT_BLUE, TEXT_DARK_GRAY } from "../../utils/color";
import {
  CardIcon,
  DashIcon,
  FileIcon,
  MemberIcon,
  NotificationIcon,
  UserIcon,
} from "../../components/icons";

interface SecondarySidebarItemProps {
  name: string;
  link: string;
  icon: any;
  hasStroke?: boolean;
  isElementIcon?: boolean;
}
const SecondarySidebarItem: React.FC<SecondarySidebarItemProps> = ({
  isElementIcon,
  hasStroke,
  ...prop
}) => {
  const { pathname } = useLocation();
  const param = useParams();

  const isActive =
    (prop.name.toLowerCase() === "dashboard" &&
      pathname.endsWith(param.name!)) ||
    prop.link.toLowerCase() === pathname.toLowerCase() ||
    (prop.name.toLowerCase() !== "dashboard" &&
      pathname.toLowerCase().endsWith(prop.link.toLowerCase()));

  console.log(prop.icon);

  const nameToIconMap = {
    DashIcon: (
      <DashIcon w={"25px"} h={"25px"} fill={"none"} stroke={"inherit"} />
    ),
    FileIcon: (
      <FileIcon
        w={"25px"}
        h={"25px"}
        color={"inherit"}
        fill={"inherit"}
        stroke={"inherit"}
      />
    ),
    MemberIcon: (
      <MemberIcon w={"23px"} h={"15px"} color={"inherit"} fill={"inherit"} />
    ),
    UserIcon: (
      <UserIcon w={"26px"} h={"26px"} color={"inherit"} fill={"inherit"} />
    ),
    NotificationIcon: (
      <NotificationIcon
        w={"25px"}
        h={"25px"}
        color={"inherit"}
        fill={"inherit"}
      />
    ),
    CardIcon: (
      <CardIcon w={"25px"} h={"25px"} color={"inherit"} fill={"inherit"} />
    ),
  };

  return (
    <HStack
      bg={isActive ? LIGHT_BLUE : ""}
      rounded={"sm"}
      to={prop.link.replace(":name", param.name!)}
      _hover={{ bg: !isActive && "gray.100" }}
      color={isActive ? "primary.500" : TEXT_DARK_GRAY}
      fill={isActive ? "primary.500" : TEXT_DARK_GRAY}
      stroke={
        hasStroke ? (isActive ? "primary.500" : TEXT_DARK_GRAY) : undefined
      }
      spacing={2}
      as={Link}
      alignItems={"center"}
      p={3}
      h={"40px"}
    >
      {isElementIcon ? (
        nameToIconMap[prop.icon]
      ) : (
        <Icon as={prop.icon} color={"inherit"} fontSize={"24px"} />
      )}
      <Text
        textTransform={"capitalize"}
        color={"inherit"}
        fontWeight={isActive ? "700" : "500"}
        fontSize={"sm"}
      >
        {prop.name}
      </Text>
    </HStack>
  );
};

export default SecondarySidebarItem;
