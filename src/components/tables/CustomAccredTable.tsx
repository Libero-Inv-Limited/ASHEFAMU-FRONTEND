/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Icon, IconButton } from "@chakra-ui/react";
import React from "react"
import { RED, YELLOW } from "../../utils/color";
import CustomTable from "./CustomTable";
import { facilities } from "../../utils/data";
import { BiEdit, BiTrash } from "react-icons/bi";
import FilterComponent from "../common/FilterComponent";


const accreditedData = {
  data: facilities.map(item => ({ name: item.name, date: item.date, category: item.category, status: item.status })),
  columns: [
    {
      name: "Name",
      selector: "name",
      sortable: false,
    },
    {
      name: "Accreditation Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Category",
      selector: "category",
      sortable: false,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Actions",
      selector: "",
      sortable: false,
      cell: () => {
        return (
          <HStack>
            <IconButton
              _hover={{ bg: "#FFEBC9" }}
              rounded={"full"}
              bg={"#FFEBC9"}
              aria-label="edit"
              icon={<Icon fontSize={"xl"} as={BiEdit} color={YELLOW} />}
            />
            <IconButton
              bg={"#FEE2E2"}
              _hover={{ bg: "#FEE2E2" }}
              rounded={"full"}
              colorScheme="red"
              aria-label="delete"
              icon={<Icon fontSize={"xl"} as={BiTrash} color={RED} />}
            />
          </HStack>
        )
      },
    },
  ]
}


interface CustomAccredTableProps { }
const CustomAccredTable: React.FC<CustomAccredTableProps> = () => {
  const { data, columns } = accreditedData

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
      columns={columns as any}
      data={filteredItems}
      paginationResetDefaultPage={resetPaginationToggle}
      subHeaderComponent={subHeaderComponentMemo}
    />
  )
}

export default CustomAccredTable