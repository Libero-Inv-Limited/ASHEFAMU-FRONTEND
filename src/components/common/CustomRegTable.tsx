/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, HStack, Icon, Input, InputGroup, InputLeftElement, Spacer } from "@chakra-ui/react";
import React from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_GRAY } from "../../utils/color";
import CustomButton from "./CustomButton";
import { BsPlus } from "react-icons/bs";
import CustomTable from "./CustomTable";



interface CustomRegTableProps {
  data: any[],
  columns: any[]
}
const CustomRegTable: React.FC<CustomRegTableProps> = ({ data, columns }) => {
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <CustomTable
      columns={columns}
      data={filteredItems}
      paginationResetDefaultPage={resetPaginationToggle}
      subHeaderComponent={subHeaderComponentMemo}
    />
  )
}


// TABLE HEADER 
interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
}
const FilterComponent: React.FC<FilterComponentProp> = ({ onFilter, filterText }) => {
  return (
    <HStack flexWrap={"wrap"} flexDir={['column-reverse', 'column-reverse', 'row']} spacing={2} alignItems={["flex-start", "flex-start", "center"]} w={"full"}>
      <InputGroup flex={1} maxW={['full', 'full', 435]}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input fontSize={"sm"} onChange={onFilter} value={filterText} placeholder="Search" />
      </InputGroup>

      <Spacer />
      <CustomButton alignSelf={['flex-end', 'flex-end', 'unset']} leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}>Register facility</CustomButton>
    </HStack>
  )
}

export default CustomRegTable