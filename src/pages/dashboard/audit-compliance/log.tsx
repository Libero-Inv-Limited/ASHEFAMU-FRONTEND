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
} from "@chakra-ui/react";
import useFetchLogs from "./hooks/useFetchLogs";
import CustomTable from "./../../../components/tables/CustomTable";
import { InputGroup } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { TEXT_GRAY } from "../../../utils/color";

interface FacilitiesProps {}
const Log: React.FC<FacilitiesProps> = () => {
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [filterText, setFilterText] = React.useState("");

  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
    // handleReloadData,
  } = useFetchLogs();

  console.log({ data });

  const columns = [
    {
      name: "log type",
      selector: "log_type",
      sortable: false,
      cell: (data: LogData) => {
        return <Text>{data.log_type}</Text>;
      },
    },
    {
      name: "Timestamp",
      selector: "timestamp",
      cell: (data: any) => {
        const date = new Date(data.timestamp);
        const options: {
          year: "numeric" | "2-digit";
          month: "numeric" | "2-digit" | "short" | "long";
          day: "numeric" | "2-digit";
        } = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };

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
          columns={columns}
          data={data}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeaderComponent={subHeaderComponentMemo}
          progressPending={loadingData}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
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

export default Log;
