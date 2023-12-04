/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, HStack, Icon, IconButton, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomTable from "./CustomTable";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { useAppContext } from "../../contexts/AppContext";
import { useAppSelector } from "../../store/hook";
import { executeGetConduted } from "../../apis/user";
import InspectionResultModal from "../modals/InspectionResultModal";
import { LuFileBarChart2 } from "react-icons/lu";
import { AiOutlineSearch } from 'react-icons/ai';
import { TEXT_GRAY } from "../../utils/color";
import { Center } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

interface ConductedTableProps {}

const ConductedTable: React.FC<ConductedTableProps> = () => {
  const { currentFacility } = useAppContext();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const {
    data,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    loadingData,
  } = usePaginatedTableData((page, perPage) =>
    executeGetConduted(currentFacility!.id, token!, page, perPage)
  );
  const facilities = useAppSelector((state) => state.dataStore.facilities);
  const [selectedData, setSelectedData] = useState<InspectionData>();
  const permissions = useAppSelector(
    (state) => state.accountStore.user.permissions
  );
  const canConductInspection = permissions.includes("Conduct Inspections");

  const fakeData = [
    {
      id: 1,
      facility_id: 19,
      inspection_date: "2023-09-29",
      inspector_name: "son obk",
      findings: "Nothing",
      results: "Nothing",
      updated_at: "2023-10-02T15:53:33.000+01:00",
      created_at: "2023-10-02T15:53:33.000+01:00",
    },
  ];

  const filteredItems = fakeData.filter((item) => {
    const facilityName = facilities?.find((fac) => fac.id === item.facility_id)?.name;
    const matchesFacilityName = facilityName && facilityName.toLowerCase().includes(filterText.toLowerCase());
    const matchesFacilityId = item.facility_id.toString().includes(filterText.toLowerCase());
    
    return matchesFacilityName || matchesFacilityId;
  });
  

  const columns = [
    {
      name: "Facility",
      selector: "id",
      cell: (data: InspectionData) => {
        return (
          <Text>
            {facilities?.find((fac) => fac.id === data.facility_id)?.name}
          </Text>
        );
      },
      sortable: false,
    },
    {
      name: "Inspector",
      selector: "inspector_name",
      sortable: true,
    },
    {
      name: "Date Conducted",
      cell: (data: InspectionData) => {
        const date = new Date(data.inspection_date);
        return <Text>{date.toDateString()}</Text>;
      },
      sortable: true,
    },
    canConductInspection && {
      name: "Findings",
      cell: (item: FacilityData) => {
        return (
          <>
            <>
              <Button
                bg="#DBE8FE"
                color="#3B82F6"
                borderRadius="50px"
                fontSize="14px"
                fontWeight="500"
                w={"86px"}
              >
                View
              </Button>
            </>
          </>
        );
      },
    },
    canConductInspection && {
      name: "Results",
      cell: (item: FacilityData) => {
        return (
          <>
            <Button
              bg="#DBE8FE"
              color="#3B82F6"
              borderRadius="50px"
              fontSize="14px"
              fontWeight="500"
              w={"86px"}
            >
              View
            </Button>
          </>
        );
      },
    },
    {
      name: "",
      cell: (data: InspectionData) => {
        return (
          <IconButton
            aria-label="result-btn"
            icon={<Icon as={LuFileBarChart2} color={"primary.500"} />}
            w={"40px"}
            h={"40px"}
            bg={"#DBE8FE"}
            rounded={"full"}
            onClick={() => setSelectedData(data)}
            _hover={{ bg: "#DBE8FE" }}
          />
        );
      },
    },
  ];


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
    <>
      <CustomTable
        columns={columns as any}
        data={filteredItems}
        progressPending={loadingData}
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />

      <InspectionResultModal
        isOpen={Boolean(selectedData)}
        onClose={() => setSelectedData(undefined)}
        result={selectedData!}
      />
    </>
  );
};

// TABLE HEADER
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
export default ConductedTable;
