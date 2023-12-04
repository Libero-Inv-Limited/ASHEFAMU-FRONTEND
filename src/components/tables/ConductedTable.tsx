/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Icon, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomTable from "./CustomTable";
import usePaginatedTableData from "../../hooks/usePaginatedTableData";
import { useAppContext } from "../../contexts/AppContext";
import { useAppSelector } from "../../store/hook";
import { executeGetConduted } from "../../apis/user";
import InspectionResultModal from "../modals/InspectionResultModal";
import { LuFileBarChart2 } from "react-icons/lu";

interface ConductedTableProps {}

const ConductedTable: React.FC<ConductedTableProps> = () => {
  const { currentFacility } = useAppContext();
  const token = useAppSelector((state) => state.accountStore.tokenStore!.token);
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

  return (
    <>
      <CustomTable
        columns={columns as any}
        data={fakeData}
        progressPending={loadingData}
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
export default ConductedTable;
