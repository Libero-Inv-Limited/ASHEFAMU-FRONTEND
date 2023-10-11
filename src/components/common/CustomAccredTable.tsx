/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, HStack, Icon, Input, InputGroup, InputLeftElement, Select, Spacer } from "@chakra-ui/react";
import React from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_DARK, TEXT_GRAY } from "../../utils/color";
import CustomTable from "./CustomTable";

interface CustomAccredTableProps {
  data: any[],
  columns: any[]
}
const CustomAccredTable: React.FC<CustomAccredTableProps> = ({ data, columns }) => {
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

interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
}
const FilterComponent: React.FC<FilterComponentProp> = ({ onFilter, filterText }) => {
  return (
    <HStack spacing={0} alignItems={"center"} w={"full"}>
      <InputGroup maxW={300}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input fontSize={"sm"} onChange={onFilter} value={filterText} placeholder="Search" />
      </InputGroup>

      <Spacer />
      <Select maxW={150} fontSize={"sm"} color={TEXT_DARK}>
        <option value="">Filter</option>
      </Select>
    </HStack>
  )
}

export default CustomAccredTable