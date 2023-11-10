import React from "react";
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
import CustomButton from "./../components/common/CustomButton";
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_GRAY } from "../utils/color";

const useFilterComponent = () => {
  interface FilterComponentProp {
    onFilter: (e: React.FormEvent) => void;
    onClear: () => void;
    filterText: string;
    isFilterable?: boolean;
    user?: string;
    onOpen: () => void;
    title:string;
    cta: string;
  }
  const FilterComponent: React.FC<FilterComponentProp> = ({
    onFilter,
    filterText,
    onOpen,
    isFilterable,
    user,
    title,
    cta,
  }) => {
    console.log({ onFilter, user });
    return (
      <HStack
        flexWrap={"wrap"}
        flexDir={["column-reverse", "column-reverse", "row"]}
        spacing={2}
        alignItems={["flex-start", "flex-start", "center"]}
        w={"full"}
      >
        {!isFilterable ? (
          <Heading fontFamily={"rubik"} fontWeight={"600"} fontSize={"md"}>
            {title}
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
          {cta}
        </CustomButton>
      </HStack>
    );
  };
  return {
    FilterComponent,
  };
};

export default useFilterComponent;
