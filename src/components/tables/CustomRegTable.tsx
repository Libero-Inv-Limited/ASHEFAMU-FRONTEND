/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Center, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, Spacer, Text } from "@chakra-ui/react";
import React from "react"
import { AiOutlineSearch } from "react-icons/ai";
import { RED, TEXT_GRAY, YELLOW } from "../../utils/color";
import CustomButton from "../common/CustomButton";
import { BsPlus } from "react-icons/bs";
import CustomTable from "./CustomTable";
import { facilities } from "../../utils/data";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../utils/routeNames";


const colorMap = {
  pending: "#FCBB4D",
  awaiting: "#62C28D",
  payment: "#146BD1"
}


const registrationData = {
  data: facilities.map(item => ({ name: item.name, date: item.date, category: item.category, status: item.status })),
  columns: [
    {
      name: "Name",
      selector: "name",
      sortable: false,
    },
    {
      name: "Date Started",
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
      cell: (data: any) => {
        const status = data.status.toLowerCase()
        const isActive = status.includes("pending") ? "pending" :
          status.includes("awaiting") ? "awaiting" : "payment"

        return (
          <HStack>
            <Box w={2} h={2} rounded={"full"} bg={colorMap[isActive]} />
            <Text>{data.status}</Text>
          </HStack>
        )
      },
      sortable: true,
    },
    {
      name: "Actions",
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


interface CustomRegTableProps {}

const CustomRegTable: React.FC<CustomRegTableProps> = () => {
  const { data, columns } = registrationData
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


// TABLE HEADER 
interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
}
const FilterComponent: React.FC<FilterComponentProp> = ({ onFilter, filterText }) => {
  const navigate = useNavigate()
  return (
    <HStack flexWrap={"wrap"} flexDir={['column-reverse', 'column-reverse', 'row']} spacing={2} alignItems={["flex-start", "flex-start", "center"]} w={"full"}>
      <InputGroup flex={1} maxW={['full', 'full', 435]}>
        <InputLeftElement as={Center}>
          <Icon as={AiOutlineSearch} fontSize={"24px"} color={TEXT_GRAY} />
        </InputLeftElement>
        <Input fontSize={"sm"} onChange={onFilter} value={filterText} placeholder="Search" />
      </InputGroup>

      <Spacer />
      <CustomButton onClick={() => navigate(ROUTES.CREATE_FACILITY_ROUTE)} alignSelf={['flex-end', 'flex-end', 'unset']} leftIcon={<Icon fontSize={"24px"} as={BsPlus} />}>Register facility</CustomButton>
    </HStack>
  )
}

export default CustomRegTable