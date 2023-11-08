import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import {
  HStack,
  InputGroup,
  InputLeftElement,
  Icon,
  Spacer,
  Input,
  Center,
  Heading,
} from "@chakra-ui/react";
import CustomButton from "./../../../components/common/CustomButton";
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_GRAY } from "./../../../utils/color";
import ROUTES from "./../../../utils/routeNames";

const useFilterComponent = () => {
  interface FilterComponentProp {
    onFilter: (e: any) => void;
    onClear: () => void;
    filterText: string;
    isUserFacilitiesTable?: boolean;
    user?: string;
  }
  const FilterComponent: React.FC<FilterComponentProp> = ({
    onFilter,
    filterText,
    onOpen,
    isUserFacilitiesTable,
    user,
  }) => {
    return (
      <HStack
        flexWrap={"wrap"}
        flexDir={["column-reverse", "column-reverse", "row"]}
        spacing={2}
        alignItems={["flex-start", "flex-start", "center"]}
        w={"full"}
      >
        {isUserFacilitiesTable ? (
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            {user.toUpperCase()}'S FACILITIES
          </Heading>
        ) : (
          <InputGroup flex={1} maxW={["full", "full", 435]}>
            <InputLeftElement as={Center}>
              <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
            </InputLeftElement>
            <Input
              fontSize={"sm"}
              onChange={onFilter}
              value={filterText}
              placeholder="Search"
            />
          </InputGroup>
        )}

        <Spacer />
        <CustomButton
          onClick={onOpen}
          alignSelf={["flex-end", "flex-end", "unset"]}
          leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}
        >
          {isUserFacilitiesTable ? "Assign a facility" : "Create user"}
        </CustomButton>
      </HStack>
    );
  };
  return {
    FilterComponent,
  };
};

export default useFilterComponent;
