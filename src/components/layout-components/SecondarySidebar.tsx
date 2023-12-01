/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Collapse,
  Flex,
  IconButton,
  Stack,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { DARK, LIGHT_GRAY } from "../../utils/color";
import { secondarySidebarContents } from "../../utils/data";
import SecondarySidebarItem from "./SecondarySidebarItem";
import { useParams } from "react-router-dom";
import { decodeSlug } from "../../utils/helpers";
import SidebarToggleIcon from "../common/SidebarToggleIcon";
import { useNavigation } from "../../contexts/NavContexts";

interface SecondarySidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}
const SecSidebar: React.FC<SecondarySidebarProps> = ({ isOpen, onToggle }) => {
  const param = useParams();
  const { secondaryLinks } = useNavigation();

  return (
    //    <Collapse in={isFacility && isOpen}>
    <Collapse in={secondaryLinks.length && isOpen}>
      <Stack
        h={"full"}
        w={"250px"}
        px={3}
        pos={"relative"}
        borderRight={"1px solid " + LIGHT_GRAY}
      >
        <Flex
          textTransform={"capitalize"}
          alignItems={"center"}
          fontSize={"md"}
          fontFamily={"rubik"}
          color={DARK}
          fontWeight={600}
          borderBottom={"1px solid " + LIGHT_GRAY}
          justifyContent={"center"}
          minH={"90px"}
        >
          {decodeSlug((param as any).name!)}
        </Flex>
        <Stack mt={2}>
          {secondarySidebarContents(secondaryLinks).map(
            (sidebarContents, index) => (
              <SecondarySidebarItem
                key={`secondary-sidebar-${sidebarContents.name}-${index}`}
                {...sidebarContents}
              />
            )
          )}
        </Stack>

        {isOpen && (
          <VStack pos={"absolute"} zIndex={40} right={0} bottom={10}>
            <Tooltip label="Close Secondary Nav">
              <IconButton
                onClick={onToggle}
                aria-label="toggle"
                variant={"unstyled"}
                px={0}
                py={4}
                display={"flex"}
                alignItems={"center"}
                width={"fit-content"}
                shadow={"lg"}
                size={"xs"}
                rounded={"full"}
                icon={<SidebarToggleIcon vertical color={"primary.500"} />}
              />
            </Tooltip>
          </VStack>
        )}
      </Stack>
    </Collapse>
  );
};

export default SecSidebar;
