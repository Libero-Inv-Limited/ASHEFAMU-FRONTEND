/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Select, Spacer } from "@chakra-ui/react";
import React, { useEffect } from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { RED, TEXT_DARK, TEXT_GRAY, YELLOW } from "../../utils/color";
import CustomTable from "./CustomTable";
import { BiEdit, BiTrash } from "react-icons/bi";


interface CustomFacilityMemberTableProps { 
  data: any[];
  deletingMemberId: number | null;
  loadingData: boolean;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
  handlePerRowsChange:(newPerPage: number, page: number) => Promise<void>;
  totalRows: number;
  handleDeleteMember: (id: number) => void;
  handleEditMember: (item: ProffessionalStaffData) => void;
}
const CustomFacilityMemberTable: React.FC<CustomFacilityMemberTableProps> = ({ data: loadedData, handleDeleteMember, handleEditMember, handlePageChange, handlePerRowsChange, loadingData, isLoading, totalRows, deletingMemberId }) => {

  const accreditedData = {
    columns: [
      {
        name: "Name",
        selector: "fullname",
        sortable: false,
      },
      {
        name: "Registration number",
        selector: "registration_number",
        sortable: true,
      },
      {
        name: "Complement",
        selector: "complement",
        sortable: false,
      },
      {
        name: "Work Status",
        selector: "employment_type",
        sortable: true,
      },
      {
        name: "Actions",
        selector: "",
        sortable: false,
        cell: (item: ProffessionalStaffData) => {
          return (
            <HStack>
              <IconButton
                _hover={{ bg: "#FFEBC9" }}
                rounded={"full"}
                bg={"#FFEBC9"}
                aria-label="edit"
                isLoading={isLoading}
                onClick={() => handleEditMember(item)}
                icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
              />

              <IconButton
                bg={"#FEE2E2"}
                _hover={{ bg: "#FEE2E2" }}
                rounded={"full"}
                colorScheme="red"
                aria-label="delete"
                isLoading={(deletingMemberId === item.id) && isLoading}
                onClick={() => handleDeleteMember(item.id)}
                icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
              />
            </HStack>
          )
        },
      },
    ]
  }

  useEffect(() => {
    console.clear()
    console.log("LOADED DATA: ", loadedData)
  }, [loadedData])

  const { columns } = accreditedData

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  // const filteredItems = loadedData.filter((item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  // );


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
      columns={columns as any}
      data={loadedData}
      paginationResetDefaultPage={resetPaginationToggle}
      subHeaderComponent={subHeaderComponentMemo}
			progressPending={loadingData}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
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
    <HStack spacing={1.5} alignItems={"center"} w={"full"}>
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

export default CustomFacilityMemberTable