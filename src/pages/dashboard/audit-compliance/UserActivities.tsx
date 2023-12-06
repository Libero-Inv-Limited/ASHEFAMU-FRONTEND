/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {
  Icon,
  Box,
  Center,
  HStack,
  Input,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CustomTable from "./../../../components/tables/CustomTable";
import { InputGroup } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_GRAY } from "../../../utils/color";
import ModalComponent from "../../../components/modals/CustomModal";
import { SimpleGrid } from '@chakra-ui/react';
import useFetchHistory from "./hooks/useFetchHistory";

interface FacilitiesProps {}
const UserActivities: React.FC<FacilitiesProps> = () => {
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [filterText, setFilterText] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [log, setLog] = React.useState(null);

  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
  } = useFetchHistory();

  const filteredItems = data.filter(
    (item) =>
      item.log_type &&
      item.log_type.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleOpenModal = (data) => {
    setLog(data);
    onOpen();
  };

  const options: {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "short" | "long";
    day: "numeric" | "2-digit";
  } = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const columns = [
    {
      name: "log type",
      selector: "log_type",
      sortable: false,
      cell: (data: LogData) => {
        return (
          <Text onClick={() => handleOpenModal(data)} cursor="pointer">
            {data.log_type}
          </Text>
        );
      },
    },
    {
      name: "Timestamp",
      selector: "timestamp",
      cell: (data: any) => {
        const date = new Date(data.timestamp);
        return <Text>{date.toLocaleDateString("en-US", options)}</Text>;
      },
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      cell: (data: any) => {
        return <Text>{data.description}</Text>;
      },
      sortable: false,
    },
  ] as const;

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DashboardLayout>
      <Box p={4} bg={"white"} rounded={"md"}>
        <CustomTable
          columns={columns as any}
          data={filteredItems}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeaderComponent={subHeaderComponentMemo}
          progressPending={loadingData}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
        <ModalComponent isOpen={isOpen} onClose={onClose}>
          <SimpleGrid  gap={4}>
            <Text
              fontSize={"20px"}
              textTransform="uppercase"
              fontWeight={"600"}
            >
              {log?.log_type}
            </Text>
            <Text fontSize="14px">
              {new Date(log?.timestamp).toLocaleDateString("en-US", options)}
            </Text>
            <Text fontSize="14px">{log?.description}</Text>
          </SimpleGrid>
        </ModalComponent>
      </Box>
    </DashboardLayout>
  );
};

interface FilterComponentProp {
  onFilter: (e: any) => void;
  onClear: () => void;
  filterText: string;
}
const FilterComponent: React.FC<FilterComponentProp> = ({
  onFilter,
  filterText,
}) => {
  return (
    <HStack
      flexWrap={"wrap"}
      flexDir={["column-reverse", "column-reverse", "row"]}
      spacing={2}
      alignItems={["flex-start", "flex-start", "center"]}
      w={"full"}
    >
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
    </HStack>
  );
};

export default UserActivities;
