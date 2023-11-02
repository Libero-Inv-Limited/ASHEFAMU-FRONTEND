/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, HStack, Icon, Input, InputGroup, InputLeftElement, InputProps, Select, Spacer } from "@chakra-ui/react";
import React, { ReactNode } from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_DARK, TEXT_GRAY } from "../../utils/color";



interface FilterComponentProp extends InputProps {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
  customRightElement?: ReactNode
}
const FilterComponent: React.FC<FilterComponentProp> = ({ onFilter, customRightElement, filterText, ...rest }) => {
  return (
    <HStack spacing={2} alignItems={"center"} w={"full"}>
      <InputGroup maxW={300}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input fontSize={"sm"} onChange={onFilter} value={filterText} placeholder="Search" {...rest} />
      </InputGroup>

      <Spacer />
      { customRightElement || <Select maxW={150} fontSize={"sm"} color={TEXT_DARK}>
        <option value="">Filter</option>
      </Select>}
    </HStack>
  )
}


export default FilterComponent