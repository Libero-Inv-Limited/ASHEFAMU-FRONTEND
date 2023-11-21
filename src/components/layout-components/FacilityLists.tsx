import {
  Center,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DARK, LIGHT_GRAY, TEXT_DARK_GRAY, TEXT_GRAY } from "../../utils/color";
// import { facilities } from "../../utils/data"
import useIsFacility from "../../hooks/useIsFacility";
import { AiOutlineSearch } from "react-icons/ai";
import FacilityListItem from "./FacilityListItem";
import SidebarToggleIcon from "../common/SidebarToggleIcon";
import { useAppSelector } from "../../store/hook";
import { useAppContext } from "../../contexts/AppContext";
import FileSkeleton from "../common/FileSkeleton";

interface FacilityListsProps {
  isOpen?: boolean;
  onToggle: () => void;
}
const FacilityLists: React.FC<FacilityListsProps> = ({ isOpen, onToggle }) => {
  const { isFacility } = useIsFacility();
  const { isLoadingData } = useAppContext();
  const { facilities } = useAppSelector((state) => state.dataStore);

  const [changingFacilities, setChangingFacilities] =
    useState<FacilityData[]>(facilities);
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    const data = facilities.filter((item) =>
      item.name?.toLowerCase().includes(search.toLocaleLowerCase())
    );
    setChangingFacilities(data);
  };

  useEffect(() => {
    setChangingFacilities(facilities);
  }, [facilities]);

  useEffect(() => {
    if (!search.trim().length) return setChangingFacilities(facilities);
    handleSearch();
  }, [search]);

  return (
    <Collapse in={isFacility && isOpen}>
      <Stack
        h={"full"}
        w={"250px"}
        px={3}
        pos={"relative"}
        borderRight={"1px solid " + LIGHT_GRAY}
      >
        <Flex
          alignItems={"center"}
          fontFamily={"rubik"}
          color={DARK}
          fontWeight={600}
          borderBottom={"1px solid " + LIGHT_GRAY}
          justifyContent={"center"}
          minH={"90px"}
        >
          <InputGroup>
            <InputRightElement as={Center}>
              <Icon fontSize={"xl"} color={TEXT_GRAY} as={AiOutlineSearch} />
            </InputRightElement>
            <Input
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              fontSize={"sm"}
              color={TEXT_DARK_GRAY}
            />
          </InputGroup>
        </Flex>
        {isOpen && (
          <VStack pos={"absolute"} zIndex={40} right={0} bottom={10}>
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
          </VStack>
        )}
        <Stack mt={2}>
          {isLoadingData ? (
            new Array(8)
              .fill("-")
              .map((_, index) => (
                <FileSkeleton isSingle key={`facilities-skeleton-${index}`} />
              ))
          ) : changingFacilities.length ? (
            changingFacilities.map((sidebarContents, index) => (
              <FacilityListItem
                key={`facility-${sidebarContents.name}-${index}`}
                {...sidebarContents}
              />
            ))
          ) : (
            <Text fontSize={"sm"} color={TEXT_DARK_GRAY}>
              No facility found
            </Text>
          )}
        </Stack>
      </Stack>
    </Collapse>
  );
};

export default FacilityLists;
